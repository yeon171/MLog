import { Card, CardContent } from '@/components/ui/card'
import { Heart } from 'lucide-react'

export default function MusicalCard() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gray-200" />
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">뮤지컬 제목</h3>
            <p className="text-sm text-gray-500">예술의전당</p>
          </div>
          <Heart className="w-5 h-5 cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  )
}
