import { supabaseAdmin } from '@/lib/supabase/admin';

// 이 함수는 서버 측에서만 호출되어야 합니다.
export async function getMusicalsData() {
  const { data, error } = await supabaseAdmin
    .from('kv_store_2b6147e6')
    .select('value')
    .like('key', 'musical:%');

  if (error) {
    console.error('Error fetching musicals from Supabase:', error);
    throw new Error(error.message);
  }

  const originalMusicals = data?.map(item => item.value) || [];

  const musicals = originalMusicals.map((musical: any, index: number) => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - (index * 10));

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 60);

      return {
          ...musical,
          posterUrl: `https://picsum.photos/seed/${musical.id}/400/600`,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          discountRate: index % 3 === 0 ? 15 : null,
      };
  });

  return musicals;
}
