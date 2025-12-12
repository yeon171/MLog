import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { Toaster, toast } from 'sonner';
import { Home } from './components/Home';
import { MusicalArchive } from './components/MusicalArchive';
import { ActorDatabase } from './components/ActorDatabase';
import { ScheduleCalendar } from './components/ScheduleCalendar';
import { SeatView } from './components/SeatView';
import { Community } from './components/Community';
import { Marketplace } from './components/Marketplace';
import { Recommendations } from './components/Recommendations';
import { VenueInfo } from './components/VenueInfo';
import { NewsColumns } from './components/NewsColumns';
import { UserProfile } from './components/UserProfile';
import { AuthModal } from './components/AuthModal';
import { Header } from './components/Header';
import { 
  Home as HomeIcon, 
  Film, 
  Users, 
  Calendar, 
  Eye, 
  MessageSquare, 
  ShoppingBag, 
  Sparkles, 
  MapPin, 
  Newspaper,
  User
} from 'lucide-react';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export type NavigationSection = 
  | 'home' 
  | 'musicals' 
  | 'actors' 
  | 'schedule' 
  | 'seatview' 
  | 'community' 
  | 'marketplace' 
  | 'recommendations'
  | 'venues'
  | 'news'
  | 'profile';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavigationSection>('home');
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data?.session) {
      setUser({
        id: data.session.user.id,
        email: data.session.user.email!,
        name: data.session.user.user_metadata?.name
      });
      setAccessToken(data.session.access_token);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error('로그인 실패: ' + error.message);
        return;
      }

      if (data.session) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email!,
          name: data.session.user.user_metadata?.name
        });
        setAccessToken(data.session.access_token);
        setShowAuthModal(false);
        toast.success('로그인되었습니다!');
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다.');
      console.error('Sign in error:', error);
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2b6147e6/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password, name })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error('회원가입 실패: ' + (data.error || '알 수 없는 오류'));
        return;
      }

      toast.success('회원가입 성공! 로그인해주세요.');
      
      // Auto sign in after signup
      await handleSignIn(email, password);
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다.');
      console.error('Sign up error:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAccessToken(null);
    setCurrentSection('home');
    toast.success('로그아웃되었습니다.');
  };

  const navigationItems: (NavigationItem | SubNavigationItem)[] = [
    { id: 'home' as NavigationSection, label: '홈', icon: HomeIcon },
    {
      id: 'content',
      label: '콘텐츠',
      children: [
        { id: 'musicals', label: '뮤지컬 아카이브', icon: Film },
        { id: 'actors', label: '배우 DB', icon: Users },
        { id: 'venues', label: '공연장 정보', icon: MapPin },
        { id: 'news', label: '뉴스', icon: Newspaper },
      ],
    },
    {
      id: 'planner',
      label: '플래너',
      children: [
        { id: 'schedule', label: '공연 일정', icon: Calendar },
        { id: 'seatview', label: '좌석뷰', icon: Eye },
        { id: 'recommendations', label: '추천', icon: Sparkles },
      ],
    },
    {
      id: 'community_group',
      label: '커뮤니티',
      children: [
        { id: 'community', label: '커뮤니티', icon: MessageSquare },
        { id: 'marketplace', label: '굿즈 마켓', icon: ShoppingBag },
      ],
    },
    { id: 'profile' as NavigationSection, label: '내 프로필', icon: User },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Home user={user} onNavigate={setCurrentSection} />;
      case 'musicals':
        return <MusicalArchive user={user} accessToken={accessToken} />;
      case 'actors':
        return <ActorDatabase user={user} accessToken={accessToken} />;
      case 'schedule':
        return <ScheduleCalendar user={user} accessToken={accessToken} />;
      case 'seatview':
        return <SeatView user={user} accessToken={accessToken} />;
      case 'community':
        return <Community user={user} accessToken={accessToken} />;
      case 'marketplace':
        return <Marketplace user={user} accessToken={accessToken} />;
      case 'recommendations':
        return <Recommendations user={user} accessToken={accessToken} />;
      case 'venues':
        return <VenueInfo user={user} />;
      case 'news':
        return <NewsColumns user={user} />;
      case 'profile':
        return <UserProfile user={user} accessToken={accessToken} onSignOut={handleSignOut} />;
      default:
        return <Home user={user} onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        navigationItems={navigationItems}
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
        onSignOut={handleSignOut}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />

      <Toaster position="top-right" richColors />
    </div>
  );
}
