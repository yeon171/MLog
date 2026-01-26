'use client'

import { useState } from 'react';
import { Musical } from '@/types/musical';
import { saveMusical, deleteMusical, logout } from '../actions';
import styles from './dashboard.module.css';

export default function DashboardClient({ initialMusicals }: { initialMusicals: Musical[] }) {
  const [musicals, setMusicals] = useState<Musical[]>(initialMusicals);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await saveMusical(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
      // 성공 시 폼 초기화 및 목록 갱신 (페이지 새로고침으로 간단히 처리)
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const result = await deleteMusical(id);
      if (result.error) {
        alert(result.error);
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>관리자 대시보드</h1>
        <form action={logout}>
          <button type="submit" className={styles.logoutButton}>로그아웃</button>
        </form>
      </header>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2>새 뮤지컬 추가</h2>
          <form onSubmit={handleSave} className={styles.form}>
            <input name="title" placeholder="뮤지컬 제목" required />
            <input name="posterUrl" placeholder="포스터 이미지 URL" required />
            <input name="startDate" type="date" placeholder="시작일" required />
            <input name="endDate" type="date" placeholder="종료일" required />
            <input name="discountRate" type="number" placeholder="할인율 (없으면 비워두세요)" />
            <button type="submit">저장</button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>

        <div className={styles.listContainer}>
          <h2>뮤지컬 목록</h2>
          <ul className={styles.musicalList}>
            {musicals.map(musical => (
              <li key={musical.id} className={styles.musicalItem}>
                <span>{musical.title} ({musical.startDate} ~ {musical.endDate})</span>
                <button onClick={() => handleDelete(musical.id)} className={styles.deleteButton}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
