'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const EditorDashboard = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user || user.role !== 'editor') {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Editor Dashboard</h1>
      <p>Welcome, {user?.fullName}</p>
      {/* Add editor-specific content here */}
    </div>
  );
};

export default EditorDashboard;
