import HeroSection from '@/components/home/HeroSection'
import NowPlayingSection from '@/components/home/NowPlayingSection'
import PopularActorsSection from '@/components/home/PopularActorsSection'
import UpcomingEventsSection from '@/components/home/UpcomingEventsSection'

export default function MainPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <NowPlayingSection />
      <PopularActorsSection />
      <UpcomingEventsSection />
    </main>
  )
}
