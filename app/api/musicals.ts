import { NextResponse } from 'next/server';
import musicalsData from '@/data/musicals.json';

export async function GET() {
  return NextResponse.json(musicalsData);
}