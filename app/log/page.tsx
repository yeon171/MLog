'use client';
import { useEffect, useState } from 'react';
import { Log } from '@/types';

export default function LogPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    fetch('/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div>
      <h1>내 뮤지컬 기록</h1>
      {logs.map(log => (
        <div key={log.id}>
          <strong>Rating:</strong> {log.rating} / <strong>Review:</strong> {log.review}
        </div>
      ))}
    </div>
  );
}