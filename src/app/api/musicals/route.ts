import { getMusicalsData } from '@/lib/api/musicals';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const musicals = await getMusicalsData();
    return NextResponse.json({ musicals });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch musicals' }, { status: 500 });
  }
}
