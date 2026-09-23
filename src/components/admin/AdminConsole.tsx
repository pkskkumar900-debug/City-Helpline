import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  collection, query, getDocs, doc, updateDoc, deleteDoc, orderBy 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Listing, UserProfile, MarketplaceItem, Role, isSuperAdminEmail } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

// Child components
import { AdminHeader } from './AdminHeader';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminMobileNav } from './AdminMobileNav';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminListingsTab } from './AdminListingsTab';
import { AdminUsersTab } from './AdminUsersTab';
import { AdminMarketplaceTab } from './AdminMarketplaceTab';
import { AdminHubsTab } from './AdminHubsTab';
import { AdminBroadcastTab } from './AdminBroadcastTab';
import { AdminAuditTab, AuditLogEntry } from './AdminAuditTab';
import { ListingInspectModal } from './ListingInspectModal';

interface AdminConsoleProps {
  onSwitchToStudentView: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ onSwitchToStudentView }) => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Data state
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = sessionStorage.getItem('adminAuditLogs');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [loading, setLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState('');
  const [inspectListing, setInspectListing] = useState<Listing | null>(null);

  const addAuditLog = (action: AuditLogEntry['action'], details: string) => {
    const entry: AuditLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      action,
      details,
      actor: userProfile?.name || currentUser?.email || 'Admin',
      timestamp: Date.now(),
    };
    setAuditLogs(prev => {
      const updated = [entry, ...prev].slice(0, 50);
      sessionStorage.setItem('adminAuditLogs', JSON.stringify(updated));
      return updated;
    });
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Listings
      const listingsQuery = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
      const listingsSnap = await getDocs(listingsQuery);
      setListings(listingsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Listing[]);

      // 2. Fetch Users
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const usersSnap = await getDocs(usersQuery);
      setUsers(usersSnap.docs.map(d => ({ uid: d.id, ...d.data() })) as UserProfile[]);

      // 3. Fetch Marketplace Items
      try {
        const marketQuery = query(collection(db, 'marketplace_items'), orderBy('createdAt', 'desc'));
        const marketSnap = await getDocs(marketQuery);
        setMarketplaceItems(marketSnap.docs.map(d => ({ id: d.id, ...d.data() })) as MarketplaceItem[]);
      } catch (mErr) {
        console.warn("Marketplace fetch skipped or empty:", mErr);
      }
    } catch (error) {
      console.error("Error fetching admin telemetry data:", error);
      toast.error("Failed to sync some admin data from Cloud Firestore");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handlers for Listings
  const handleApproveListing = async (id: string) => {
    try {
      await updateDoc(doc(db, 'listings', id), { status: 'approved' });
      setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'approved' } : l));
      const target = listings.find(l => l.id === id);
      addAuditLog('approve_listing', `Approved listing "${target?.title || id}"`);
      toast.success("Listing approved and published to student directory");
    } catch (error) {
      console.error("Error approving listing:", error);
      toast.error("Failed to approve listing");
    }
  };

  const handleRejectListing = async (id: string) => {
    try {
      await updateDoc(doc(db, 'listings', id), { status: 'rejected' });
      setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
      const target = listings.find(l => l.id === id);
      addAuditLog('reject_listing', `Rejected listing "${target?.title || id}"`);
      toast.info("Listing status marked as rejected");
    } catch (error) {
      console.error("Error rejecting listing:", error);
      toast.error("Failed to reject listing");
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await updateDoc(doc(db, 'listings', id), { featured: !currentFeatured });
      setListings(prev => prev.map(l => l.id === id ? { ...l, featured: !currentFeatured } : l));
      const target = listings.find(l => l.id === id);
      addAuditLog('toggle_featured', `${!currentFeatured ? 'Featured' : 'Unfeatured'} "${target?.title || id}"`);
      toast.success(`Listing ${!currentFeatured ? 'marked as Featured' : 'unfeatured'}`);
    } catch (error) {
      console.error("Error toggling featured:", error);
      toast.error("Failed to update featured status");
    }
  };

  const handleDeleteListing = async (id: string) => {
    const target = listings.find(l => l.id === id);
    if (!window.confirm(`Are you sure you want to permanently delete "${target?.title || 'this listing'}"?`)) return;

    try {
      await deleteDoc(doc(db, 'listings', id));
      setListings(prev => prev.filter(l => l.id !== id));
      addAuditLog('delete_listing', `Deleted listing "${target?.title || id}"`);
      toast.success("Listing deleted successfully");
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing");
    }
  };

  // Handlers for Users
  const handleRoleChange = async (uid: string, newRole: Role) => {
    try {
      await updateDoc(doc(db, 'users', uid), { role: newRole });
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, role: newRole } : u));
      const target = users.find(u => u.uid === uid);
      addAuditLog('change_role', `Changed role of ${target?.name || uid} to "${newRole}"`);
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const handleBanToggle = async (uid: string, currentBanned: boolean) => {
    try {
      await updateDoc(doc(db, 'users', uid), { banned: !currentBanned });
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, banned: !currentBanned } : u));
      const target = users.find(u => u.uid === uid);
      addAuditLog(!currentBanned ? 'ban_user' : 'unban_user', `${!currentBanned ? 'Banned' : 'Unbanned'} user "${target?.name || uid}"`);
      toast.success(`User account ${!currentBanned ? 'banned' : 'unbanned'}`);
    } catch (error) {
      console.error("Error toggling ban:", error);
      toast.error("Failed to change ban status");
    }
  };

  const handleDeleteUser = async (uid: string) => {
    const target = users.find(u => u.uid === uid);
    if (!window.confirm(`Are you sure you want to permanently remove user "${target?.name || uid}"?`)) return;

    try {
      await deleteDoc(doc(db, 'users', uid));
      setUsers(prev => prev.filter(u => u.uid !== uid));
      toast.success("User account deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  // Handlers for Marketplace
  const handleToggleMarketStatus = async (id: string, current: 'available' | 'sold') => {
    const nextStatus = current === 'available' ? 'sold' : 'available';
    try {
      await updateDoc(doc(db, 'marketplace_items', id), { status: nextStatus });
      setMarketplaceItems(prev => prev.map(i => i.id === id ? { ...i, status: nextStatus } : i));
      toast.success(`Marketplace item marked as ${nextStatus}`);
    } catch (error) {
      console.error("Error updating item status:", error);
      toast.error("Failed to update marketplace status");
    }
  };

  const handleToggleMarketFeatured = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'marketplace_items', id), { featured: !current });
      setMarketplaceItems(prev => prev.map(i => i.id === id ? { ...i, featured: !current } : i));
      toast.success(`Marketplace item ${!current ? 'featured' : 'unfeatured'}`);
    } catch (error) {
      console.error("Error toggling marketplace featured:", error);
      toast.error("Failed to toggle featured status");
    }
  };

  const handleDeleteMarketItem = async (id: string) => {
    if (!window.confirm('Delete this marketplace item?')) return;
    try {
      await deleteDoc(doc(db, 'marketplace_items', id));
      setMarketplaceItems(prev => prev.filter(i => i.id !== id));
      toast.success("Marketplace item removed");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const pendingListingsCount = listings.filter(l => l.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col selection:bg-[#00E5FF] selection:text-black">
      
      {/* 1. Executive Top Header */}
      <AdminHeader
        userProfile={userProfile}
        pendingCount={pendingListingsCount}
        totalListings={listings.length}
        totalUsers={users.length}
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
        onRefresh={fetchAdminData}
        onSwitchToStudentView={onSwitchToStudentView}
        onOpenCreateListing={() => navigate('/add-listing')}
        onLogout={handleLogout}
        loading={loading}
      />

      {/* 2. Main Admin Workspace (Sidebar + Content Canvas) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          pendingCount={pendingListingsCount}
          totalListingsCount={listings.length}
          totalUsersCount={users.length}
          totalMarketplaceCount={marketplaceItems.length}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Dynamic Content Canvas */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12 custom-scrollbar">
          <div className="max-w-[1920px] mx-auto">
            
            {activeTab === 'overview' && (
              <AdminOverviewTab
                listings={listings}
                users={users}
                marketplaceItems={marketplaceItems}
                onNavigateTab={setActiveTab}
                onInspectListing={(l) => setInspectListing(l)}
                onApproveListing={handleApproveListing}
                onRejectListing={handleRejectListing}
              />
            )}

            {activeTab === 'listings' && (
              <AdminListingsTab
                listings={listings}
                onApprove={handleApproveListing}
                onReject={handleRejectListing}
                onToggleFeatured={handleToggleFeatured}
                onDelete={handleDeleteListing}
                onEdit={(id) => navigate(`/edit-listing/${id}`)}
                onInspect={(l) => setInspectListing(l)}
                onCreateNew={() => navigate('/add-listing')}
              />
            )}

            {activeTab === 'users' && (
              <AdminUsersTab
                users={users}
                onRoleChange={handleRoleChange}
                onBanToggle={handleBanToggle}
                onDeleteUser={handleDeleteUser}
              />
            )}

            {activeTab === 'marketplace' && (
              <AdminMarketplaceTab
                items={marketplaceItems}
                onToggleStatus={handleToggleMarketStatus}
                onToggleFeatured={handleToggleMarketFeatured}
                onDeleteItem={handleDeleteMarketItem}
              />
            )}

            {activeTab === 'hubs' && (
              <AdminHubsTab
                listings={listings}
                onFilterByCity={(city) => {
                  setActiveTab('listings');
                }}
              />
            )}

            {activeTab === 'broadcast' && (
              <AdminBroadcastTab />
            )}

            {activeTab === 'audit' && (
              <AdminAuditTab
                logs={auditLogs}
                onClearLogs={() => {
                  setAuditLogs([]);
                  sessionStorage.removeItem('adminAuditLogs');
                }}
              />
            )}

          </div>
        </main>
      </div>

      {/* 3. Mobile Navigation Bar for Admin */}
      <AdminMobileNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingCount={pendingListingsCount}
      />

      {/* 4. Inspection Modal Drawer */}
      <ListingInspectModal
        listing={inspectListing}
        onClose={() => setInspectListing(null)}
        onApprove={handleApproveListing}
        onReject={handleRejectListing}
        onToggleFeatured={handleToggleFeatured}
        onEdit={(id) => {
          setInspectListing(null);
          navigate(`/edit-listing/${id}`);
        }}
      />

    </div>
  );
};
