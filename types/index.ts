export interface Musical {
  id: number;
  title: string;
  genre: string;
  summary: string;
}

export interface Log {
  id: number;
  userId: number;
  musicalId: number;
  rating: number;
  review: string;
  watchedAt: string;
}