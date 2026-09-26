import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, isSuperAdminEmail } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateLocalProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const cachedProfile = localStorage.getItem('userProfile');
    return cachedProfile ? JSON.parse(cachedProfile) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: () => void;

    // Safety fallback: Never keep the app completely unmounted/blocked for more than 2.5 seconds
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 2500);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      clearTimeout(safetyTimeout);
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        unsubscribeProfile = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            if (data.banned) {
              signOut(auth);
              setUserProfile(null);
              setCurrentUser(null);
              localStorage.removeItem('userProfile');
            } else {
              setUserProfile(data);
              localStorage.setItem('userProfile', JSON.stringify(data));
            }
          } else {
            // Auto-provision user profile in Firestore if missing so user is never orphaned in Auth
            const cleanName = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
            const cleanEmail = user.email || '';
            const initialProfile: UserProfile = {
              uid: user.uid,
              name: cleanName,
              email: cleanEmail,
              photoURL: user.photoURL || '',
              role: isSuperAdminEmail(cleanEmail) ? 'admin' : 'user',
              banned: false,
              createdAt: Date.now() as any,
              lastLogin: Date.now() as any,
              updatedAt: Date.now(),
            };

            setDoc(docRef, {
              ...initialProfile,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
            }, { merge: true }).catch((err) => {
              console.warn("Notice: auto-provisioning profile notice:", err);
            });

            setUserProfile(initialProfile);
            localStorage.setItem('userProfile', JSON.stringify(initialProfile));
          }
          setLoading(false);
        }, (error) => {
          console.warn("Notice: user profile sync in offline/delayed mode:", error);
          setLoading(false);
        });
      } else {
        setUserProfile(null);
        localStorage.removeItem('userProfile');
        setLoading(false);
        if (unsubscribeProfile) {
          unsubscribeProfile();
        }
      }
    });

    return () => {
      clearTimeout(safetyTimeout);
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  const updateLocalProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = prev ? { ...prev, ...updates } : (updates as UserProfile);
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, logout, updateLocalProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
