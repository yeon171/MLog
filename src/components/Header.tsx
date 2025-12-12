import React, { useState } from 'react';
import { NavigationSection, User } from '../App';
import { Button } from './ui/button';
import { LogIn, User as UserIcon, LogOut, ChevronDown, Menu, Search } from 'lucide-react';
import { cn } from './ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Input } from './ui/input';

interface NavigationItem {
  id: NavigationSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SubNavigationItem {
  id: string;
  label: string;
  children: NavigationItem[];
}

interface HeaderProps {
  navigationItems: (NavigationItem | SubNavigationItem)[];
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainNavItems = navigationItems.filter(
    (item) => item.id !== 'home' && item.id !== 'profile'
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-indigo-600">Mlog</h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {mainNavItems.flatMap((item) => {
              if ('children' in item) {
                return item.children.map((child) => {
                  const isActive = child.id === currentSection;
                  return (
                    <Button
                      key={child.id}
                      variant="ghost"
                      onClick={() => onNavigate(child.id)}
                      className={cn(
                        'text-sm font-medium',
                        isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                      )}
                    >
                      {child.label}
                    </Button>
                  );
                });
              }
              // This part is for non-dropdown menu items, if any.
              return (
                <button key={item.id} onClick={() => onNavigate(item.id as NavigationSection)}>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 min-w-0 max-w-md flex-shrink">
          <div className="relative w-full">
            <Input 
              type="text" 
              placeholder="뮤지컬, 배우, 공연장 검색"
              className="h-10 pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>


        {/* Right side: Auth and Mobile Menu */}
        <div className="flex items-center gap-2">
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

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-left text-2xl font-bold text-indigo-600">Mlog</SheetTitle>
                </SheetHeader>
                <div className="px-4 pt-4">
                  <div className="relative w-full">
                    <Input 
                      type="text" 
                      placeholder="검색"
                      className="h-10 pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <nav className="mt-8 flex flex-col gap-4">
                  {mainNavItems.map((item) => {
                    if ('children' in item) {
                      return (
                        <div key={item.id}>
                          <h3 className="mb-2 px-2 text-sm font-semibold text-gray-500">{item.label}</h3>
                          <div className="flex flex-col gap-1">
                            {item.children.map((child) => (
                              <Button
                                key={child.id}
                                variant="ghost"
                                className="justify-start gap-2"
                                onClick={() => {
                                  onNavigate(child.id);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                <child.icon className="h-5 w-5" />
                                {child.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}