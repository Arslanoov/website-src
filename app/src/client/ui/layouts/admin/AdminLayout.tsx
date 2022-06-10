import React from 'react';

import { useSession } from 'next-auth/react';

import { AuthStatus, SessionUserInterface } from '@/domain/user/auth';

import MainLayout from '@/ui/layouts/main/MainLayout';

const AdminLayout: React.FC = ({ children }) => {
  const { status, data: session } = useSession();

  if (typeof window === 'undefined' || status === 'loading') {
    return <div>403</div>;
  }

  const isAdmin = (session?.user as SessionUserInterface)?.role === 'Admin';

  if (
    status === AuthStatus.guest ||
    !isAdmin
  ) {
    return <div>403</div>;
  }

  return (
    <MainLayout isAdmin={isAdmin} title="Admin Panel">{children}</MainLayout>
  );
};

export default AdminLayout;
