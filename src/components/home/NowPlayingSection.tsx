import MusicalCard from '@/components/musical/MusicalCard'

export default function NowPlayingSection() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-semibold mb-6">
        현재 공연 중인 뮤지컬
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((id) => (
          <MusicalCard key={id} />
        ))}
      </div>
    </section>
  )
}
