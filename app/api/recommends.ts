import { NextResponse } from 'next/server';

// 임시: AI 추천 로직 자리
export async function GET() {
  const dummyRecommendation = [
    { id: 2, title: '라이온킹' }
  ];
  return NextResponse.json(dummyRecommendation);
}