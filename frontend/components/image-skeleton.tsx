import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ImageSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="flex-grow p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-gray-50">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  )
}