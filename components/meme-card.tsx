"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Clock, Shield } from "lucide-react"
import Image from "next/image"

interface Meme {
  id: string
  title: string
  imageUrl: string
  author: string
  likes: number
  category: string
  timestamp: number
  onChain: boolean
}

interface MemeCardProps {
  meme: Meme
  onLike: () => void
  onShare: () => void
  isConnected: boolean
}

export function MemeCard({ meme, onLike, onShare, isConnected }: MemeCardProps) {
  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {meme.category}
          </Badge>
          <div className="flex items-center gap-2">
            {meme.onChain && (
              <Badge variant="outline" className="text-xs border-green-500 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                On-Chain
              </Badge>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatTimeAgo(meme.timestamp)}
            </div>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">
          {meme.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={meme.imageUrl || "/placeholder.svg"}
            alt={meme.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          by {meme.author.slice(0, 6)}...{meme.author.slice(-4)}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            disabled={!isConnected}
            className="flex items-center gap-2 hover:text-red-500 transition-colors"
          >
            <Heart className={`h-4 w-4 ${meme.likes > 0 ? "fill-red-500 text-red-500" : ""}`} />
            {meme.likes}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="flex items-center gap-2 hover:text-blue-500 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
