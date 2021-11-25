import React from 'react';

import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import MainLayout from '@/ui/layouts/main/MainLayout';

const AdminLayout: React.FC = ({ children }) => {
  const { status, data: session } = useSession();
  const router = useRouter();

  if (typeof window === 'undefined' || status === 'loading') {
    return <div />;
  }

  if (status === 'unauthenticated' || session.user.role !== 'Admin') {
    router.push('/');
    return <div />;
  }
  
  return (
    <MainLayout>{children}</MainLayout>
  );
};

export default AdminLayout;
