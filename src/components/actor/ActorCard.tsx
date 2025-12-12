import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ActorCard() {
  return (
    <Card className="text-center">
      <CardContent className="p-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
        <h3 className="font-medium">배우 이름</h3>
        <Button size="sm" variant="outline" className="mt-2">
          찜하기
        </Button>
      </CardContent>
    </Card>
  )
}
