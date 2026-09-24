import React from 'react';
import { Settings } from 'lucide-react';
import { PersonalPageHeader } from '../components/layout/PersonalPageHeader';
import AccountSettings from '../components/AccountSettings';

export default function AccountSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-20 md:mb-12">
      <PersonalPageHeader
        title="Account Settings"
        subtitle="Manage your student profile, theme appearance, and security credentials"
        badge="Personal Settings"
        badgeColor="bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30"
        icon={Settings}
        exitUrl="/profile"
        backLabel="Profile"
      />
      <AccountSettings />
    </div>
  );
}
