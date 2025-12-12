import { Button } from '@/components/ui/button'

export default function UpcomingEventsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">
          다가오는 일정
        </h2>
        <ul className="space-y-4">
          {[1, 2, 3].map((id) => (
            <li
              key={id}
              className="flex justify-between items-center border p-4 rounded-xl"
            >
              <div>
                <p className="font-medium">
                  뮤지컬 제목 – 캐스팅 변경
                </p>
                <p className="text-sm text-gray-500">2025-01-10</p>
              </div>
              <Button size="sm" variant="outline">
                자세히
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
