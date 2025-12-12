import React from 'react';
import { NavigationSection, User } from '../App';
import { Button } from './ui/button';
import { LogIn, User as UserIcon, LogOut } from 'lucide-react';
import { cn } from './ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface NavigationItem {
  id: NavigationSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface HeaderProps {
  navigationItems: NavigationItem[];
  currentSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
  user: User | null;
  onAuthClick: () => void;
  onSignOut: () => void;
}

export function Header({
  navigationItems,
  currentSection,
  onNavigate,
  user,
  onAuthClick,
  onSignOut,
}: HeaderProps) {
  const mainNavItems = navigationItems.filter(item => item.id !== 'home' && item.id !== 'profile');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-indigo-600">Mlog</h1>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  currentSection === item.id ? 'bg-gray-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-white">
                    {user.name?.[0] || user.email[0].toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>내 프로필</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={onAuthClick} variant="ghost">
              <LogIn className="mr-2 h-4 w-4" />
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}