'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

// 로그인 처리
export async function login(formData: FormData) {
  const id = formData.get('adminId') as string;
  const password = formData.get('password') as string;

  if (
    id === process.env.ADMIN_ID &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // 로그인 성공 시 쿠키 설정 (1일 유지)
    cookies().set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    redirect('/admin/dashboard');
  } else {
    return { error: '아이디 또는 비밀번호가 잘못되었습니다.' };
  }
}

// 로그아웃 처리
export async function logout() {
  cookies().delete('admin_session');
  redirect('/admin/login');
}

// 뮤지컬 추가/수정
export async function saveMusical(formData: FormData) {
  // 관리자 세션 확인
  if (!cookies().has('admin_session')) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const posterUrl = formData.get('posterUrl') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const discountRate = formData.get('discountRate') as string;

  // ID가 없으면 새로 생성
  const id = (formData.get('id') as string) || crypto.randomUUID();

  const musicalData = {
    id,
    title,
    posterUrl,
    startDate,
    endDate,
    discountRate: discountRate ? parseInt(discountRate) : null,
  };

  // Supabase KV Store에 저장 (Key: musical:{id})
  const { error } = await supabaseAdmin
    .from('kv_store_2b6147e6')
    .upsert({
      key: `musical:${id}`,
      value: musicalData
    });

  if (error) {
    console.error('Save Error:', error);
    return { error: '저장에 실패했습니다.' };
  }

  // 데이터 갱신을 위해 캐시 초기화
  revalidatePath('/musicals');
  revalidatePath('/admin/dashboard');

  return { success: true };
}

// 뮤지컬 삭제
export async function deleteMusical(id: string) {
  if (!cookies().has('admin_session')) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabaseAdmin
    .from('kv_store_2b6147e6')
    .delete()
    .eq('key', `musical:${id}`);

  if (error) {
    return { error: '삭제에 실패했습니다.' };
  }

  revalidatePath('/musicals');
  revalidatePath('/admin/dashboard');
  return { success: true };
}
