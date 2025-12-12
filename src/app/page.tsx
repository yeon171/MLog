import HeroSection from '@/components/home/HeroSection'
import NowPlayingSection from '@/components/home/NowPlayingSection'
import DiscountedMusicalsSection from '@/components/home/DiscountedMusicalsSection'
import UpcomingEventsSection from '@/components/home/UpcomingEventsSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <NowPlayingSection />
      <DiscountedMusicalsSection />
      <UpcomingEventsSection />
    </main>
  )
}
