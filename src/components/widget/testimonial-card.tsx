import { Card, CardContent } from '@/components/ui/card'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Star } from 'lucide-react'
import { Avatar } from '../ui/avatar'

export default function TestimonialCard({
  name,
  quote
}: {
  name: string
  quote: string
  avatarUrl: string
}) {
  return (
    <Card className="border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="mb-4 flex items-center">
          <Avatar className="mr-4 flex h-12 w-12 items-center justify-center bg-slate-100 text-lg dark:bg-slate-300">
            <AvatarFallback className="text-slate-900">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-headline text-lg font-bold">{name}</h4>
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">&#39;{quote}&#39;</p>
      </CardContent>
    </Card>
  )
}
