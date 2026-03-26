import { NextRequest, NextResponse } from 'next/server';
import logsData from '@/data/logs.json';
import { Log } from '@/types';

const logs: Log[] = logsData;

export async function GET() {
  return NextResponse.json(logs);
}

export async function POST(req: NextRequest) {
  const newLog = await req.json() as Log;
  logs.push(newLog);
  return NextResponse.json(newLog);
}