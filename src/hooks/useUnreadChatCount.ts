import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Conversation } from '../types';

// Shared singleton state so all instances of Navbar/buttons share ONE single listener
let currentSubscribedUid: string | null = null;
let activeFirestoreUnsubscribe: (() => void) | null = null;
let globalUnreadCount = 0;
const subscribers = new Set<(count: number) => void>();

function notifySubscribers(count: number) {
  globalUnreadCount = count;
  subscribers.forEach((cb) => cb(count));
}

function ensureListener(uid: string) {
  if (currentSubscribedUid === uid && activeFirestoreUnsubscribe) {
    return;
  }

  // Teardown previous listener if UID changed
  if (activeFirestoreUnsubscribe) {
    try {
      activeFirestoreUnsubscribe();
    } catch {
      // ignore
    }
    activeFirestoreUnsubscribe = null;
  }

  currentSubscribedUid = uid;

  try {
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', uid)
    );

    activeFirestoreUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let count = 0;
        snapshot.docs.forEach((doc) => {
          const data = doc.data() as Conversation;
          const userUnread = data.unreadCount?.[uid] || 0;
          count += userUnread;
        });
        notifySubscribers(count);
      },
      (error) => {
        console.warn("Unread messages listener notice:", error);
      }
    );
  } catch (e) {
    console.warn("Error setting up unread messages listener:", e);
  }
}

function releaseListener() {
  if (subscribers.size === 0 && activeFirestoreUnsubscribe) {
    try {
      activeFirestoreUnsubscribe();
    } catch {
      // ignore
    }
    activeFirestoreUnsubscribe = null;
    currentSubscribedUid = null;
    globalUnreadCount = 0;
  }
}

export function useUnreadChatCount() {
  const { currentUser } = useAuth();
  const [totalUnread, setTotalUnread] = useState(globalUnreadCount);

  useEffect(() => {
    if (!currentUser?.uid) {
      setTotalUnread(0);
      return;
    }

    const handler = (count: number) => {
      setTotalUnread(count);
    };

    subscribers.add(handler);
    ensureListener(currentUser.uid);

    // Initial state sync
    setTotalUnread(globalUnreadCount);

    return () => {
      subscribers.delete(handler);
      if (subscribers.size === 0) {
        releaseListener();
      }
    };
  }, [currentUser?.uid]);

  return totalUnread;
}
