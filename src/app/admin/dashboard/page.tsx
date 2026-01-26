import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMusicalsData } from '@/lib/api/musicals';
import DashboardClient from './client';

export default async function DashboardPage() {
  // 세션 체크
  if (!cookies().has('admin_session')) {
    redirect('/admin/login');
  }

  // 뮤지컬 데이터 가져오기
  const musicals = await getMusicalsData();

  return <DashboardClient initialMusicals={musicals} />;
}
