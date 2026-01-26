import { Input } from '@/components/ui/input';
import { Musical } from '@/types/musical';
import Link from 'next/link';
import styles from './musicals.module.css';
import { getMusicalsData } from '@/lib/api/musicals'; // fetch 대신 직접 함수 호출

// getMusicals 함수를 getMusicalsData를 직접 호출하도록 변경
async function getMusicals(): Promise<Musical[]> {
  try {
    return await getMusicalsData();
  } catch (error) {
    console.error('Failed to fetch musicals', error);
    return [];
  }
}

// 뮤지컬 카드를 표시하는 간단한 컴포넌트
const MusicalCard = ({ musical }: { musical: Musical }) => (
  <Link href={`/musicals/${musical.id}`} className={styles.cardLink}>
    <div className={styles.cardImageContainer}>
      <img src={musical.posterUrl} alt={musical.title} className={styles.cardImage} />
    </div>
    <h3 className={styles.cardTitle}>{musical.title}</h3>
    <p className={styles.cardDate}>{`${musical.startDate} ~ ${musical.endDate}`}</p>
    {musical.discountRate && (
      <p className={styles.discountBadge}>{musical.discountRate}% 할인</p>
    )}
  </Link>
);

// 뮤지컬 목록을 가로로 스크롤하여 보여주는 컴포넌트
const MusicalList = ({ musicals }: { musicals: Musical[] }) => {
  if (musicals.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>해당하는 뮤지컬이 없습니다.</p>
      </div>
    );
  }
  return (
    <div className={styles.listContainer}>
      {musicals.map(musical => (
        <MusicalCard key={musical.id} musical={musical} />
      ))}
    </div>
  );
};


const MusicalsPage = async () => {
  const allMusicals = await getMusicals();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // 1. 현재 공연 중인 뮤지컬: 오늘 날짜가 공연 시작일과 종료일 사이
  const nowPlaying = allMusicals.filter(m => m.startDate <= today && m.endDate >= today);

  // 2. 오픈 예정 뮤지컬: 공연 시작일이 오늘보다 미래
  const upcoming = allMusicals.filter(m => m.startDate > today);

  // 3. 할인 중인 뮤지컬: 할인율이 0보다 큼
  const discounted = allMusicals.filter(m => m.discountRate && m.discountRate > 0);

  // 4. 마감 임박 뮤지컬: 공연 종료일이 오늘로부터 30일 이내
  const closingSoon = allMusicals.filter(m => {
    const endDate = new Date(m.endDate);
    const diffTime = endDate.getTime() - new Date(today).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 30;
  });

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>뮤지컬 둘러보기</h1>
        <p className={styles.subtitle}>
          다양한 뮤지컬을 만나보세요.
        </p>
      </header>

      <div className={styles.searchContainer}>
        <Input
          type="search"
          placeholder="찾고 싶은 뮤지컬을 검색해보세요..."
          className={styles.searchInput}
        />
      </div>

      <main className={styles.main}>
        <section>
          <h2 className={styles.sectionTitle}>현재 공연 중</h2>
          <MusicalList musicals={nowPlaying} />
        </section>

        <section>
          <h2 className={styles.sectionTitle}>오픈 예정</h2>
          <MusicalList musicals={upcoming} />
        </section>

        <section>
          <h2 className={styles.sectionTitle}>할인 중</h2>
          <MusicalList musicals={discounted} />
        </section>

        <section>
          <h2 className={styles.sectionTitle}>마감 임박</h2>
          <MusicalList musicals={closingSoon} />
        </section>
      </main>
    </div>
  );
};

export default MusicalsPage;
