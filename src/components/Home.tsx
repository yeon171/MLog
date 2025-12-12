import React from 'react';
import { User, NavigationSection } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Film, Users, Calendar, Eye, MessageSquare, ShoppingBag, Sparkles, MapPin, Newspaper, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  user: User | null;
  onNavigate: (section: NavigationSection) => void;
}

export function Home({ user, onNavigate }: HomeProps) {
  const quickLinks = [
    {
      id: 'musicals' as NavigationSection,
      title: '뮤지컬 아카이브',
      description: '작품 정보, 캐스팅, OST를 한번에',
      icon: Film,
    },
    {
      id: 'actors' as NavigationSection,
      title: '배우 DB',
      description: '프로필, 필모그래피, 출연 일정 확인',
      icon: Users,
    },
    {
      id: 'schedule' as NavigationSection,
      title: '공연 일정',
      description: '달력으로 보는 전체 공연 스케줄',
      icon: Calendar,
    },
    {
      id: 'seatview' as NavigationSection,
      title: '좌석 시야',
      description: '공연장별 실제 시야 정보와 후기',
      icon: Eye,
    },
    {
      id: 'community' as NavigationSection,
      title: '커뮤니티',
      description: '작품/배우 후기, Q&A 등 소통 공간',
      icon: MessageSquare,
    },
    {
      id: 'marketplace' as NavigationSection,
      title: '굿즈 마켓',
      description: '중고 거래 및 상품 시세 정보',
      icon: ShoppingBag,
    },
    {
      id: 'news' as NavigationSection,
      title: '뉴스 & 칼럼',
      description: '최신 티켓 오픈, 캐스팅 소식',
      icon: Newspaper,
    },
  ];

  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-96">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-pink-50" />
        <div className="relative h-full flex flex-col justify-center items-center text-center p-8">
          <h1 className="mb-4 text-gray-800">
            <span className="text-indigo-600">Mlog</span>에서 시작하는
            <br />
            나만의 뮤지컬 라이프
          </h1>
          <p className="text-xl mb-6 text-gray-600 max-w-2xl">
            작품 정보부터 공연장 시야, 커뮤니티까지. 뮤지컬의 모든 것을 한 곳에서 경험하고 기록하세요.
          </p>
          {user ? (
            <p className="text-gray-500">
              환영합니다, {user.name || user.email}님! 👋
            </p>
          ) : (
            <p className="text-gray-500">
              로그인하고 나만의 뮤지컬 기록을 시작해보세요
            </p>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          <h2>주요 서비스</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="cursor-pointer group hover:border-indigo-400 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="mb-1">{item.title}</CardTitle>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
