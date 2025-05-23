"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Laugh, Plus, TrendingUp } from "lucide-react"
import { WalletConnection } from "@/components/wallet-connection"
import { JokeCard } from "@/components/joke-card"
import { MemeCard } from "@/components/meme-card"
import { AddJokeDialog } from "@/components/add-joke-dialog"

interface Joke {
  id: string
  content: string
  author: string
  likes: number
  category: string
  timestamp: number
  onChain: boolean
}

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

export default function JokePlatform() {
  const [jokes, setJokes] = useState<Joke[]>([])
  const [memes, setMemes] = useState<Meme[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [loading, setLoading] = useState(true)
  const [showAddJoke, setShowAddJoke] = useState(false)

  // Sample data - in a real app, this would come from Sui blockchain
  useEffect(() => {
    const sampleJokes: Joke[] = [
      {
        id: "1",
        content: "Why don't scientists trust atoms? Because they make up everything!",
        author: "0x1234...5678",
        likes: 42,
        category: "Science",
        timestamp: Date.now() - 3600000,
        onChain: true,
      },
      {
        id: "2",
        content: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        author: "0x9876...5432",
        likes: 28,
        category: "Dad Jokes",
        timestamp: Date.now() - 7200000,
        onChain: true,
      },
      {
        id: "3",
        content: "Why did the scarecrow win an award? He was outstanding in his field!",
        author: "0xabcd...efgh",
        likes: 35,
        category: "Puns",
        timestamp: Date.now() - 10800000,
        onChain: false,
      },
      {
        id: "4",
        content: "What do you call a fake noodle? An impasta!",
        author: "0x1111...2222",
        likes: 67,
        category: "Food",
        timestamp: Date.now() - 14400000,
        onChain: true,
      },
    ]

    const sampleMemes: Meme[] = [
      {
        id: "1",
        title: "When you finally understand blockchain",
        imageUrl: "/placeholder.svg?height=300&width=400",
        author: "0x3333...4444",
        likes: 89,
        category: "Tech",
        timestamp: Date.now() - 1800000,
        onChain: true,
      },
      {
        id: "2",
        title: "Me explaining crypto to my parents",
        imageUrl: "/placeholder.svg?height=300&width=400",
        author: "0x5555...6666",
        likes: 156,
        category: "Crypto",
        timestamp: Date.now() - 5400000,
        onChain: true,
      },
      {
        id: "3",
        title: "When gas fees are higher than your transaction",
        imageUrl: "/placeholder.svg?height=300&width=400",
        author: "0x7777...8888",
        likes: 203,
        category: "Crypto",
        timestamp: Date.now() - 9000000,
        onChain: false,
      },
    ]

    setJokes(sampleJokes)
    setMemes(sampleMemes)
    setLoading(false)
  }, [])

  const handleLike = async (id: string, type: "joke" | "meme") => {
    if (!isConnected) {
      alert("Please connect your wallet to like content!")
      return
    }

    // In a real app, this would interact with Sui blockchain
    if (type === "joke") {
      setJokes((prev) => prev.map((joke) => (joke.id === id ? { ...joke, likes: joke.likes + 1 } : joke)))
    } else {
      setMemes((prev) => prev.map((meme) => (meme.id === id ? { ...meme, likes: meme.likes + 1 } : meme)))
    }
  }

  const handleShare = (content: string) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this joke!",
        text: content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(content)
      alert("Copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jokes from Sui blockchain...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Laugh className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SuiLaughs
                </h1>
                <p className="text-sm text-gray-600">Decentralized Comedy Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowAddJoke(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={!isConnected}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Joke
              </Button>
              <WalletConnection
                isConnected={isConnected}
                userAddress={userAddress}
                onConnect={setIsConnected}
                onAddressChange={setUserAddress}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jokes</CardTitle>
              <Laugh className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jokes.length}</div>
              <p className="text-xs text-muted-foreground">{jokes.filter((j) => j.onChain).length} on-chain</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Memes</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{memes.length}</div>
              <p className="text-xs text-muted-foreground">{memes.filter((m) => m.onChain).length} on-chain</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jokes.reduce((sum, joke) => sum + joke.likes, 0) + memes.reduce((sum, meme) => sum + meme.likes, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Community engagement</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="jokes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="jokes" className="flex items-center gap-2">
              <Laugh className="h-4 w-4" />
              Jokes ({jokes.length})
            </TabsTrigger>
            <TabsTrigger value="memes" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Memes ({memes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jokes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jokes.map((joke) => (
                <JokeCard
                  key={joke.id}
                  joke={joke}
                  onLike={() => handleLike(joke.id, "joke")}
                  onShare={() => handleShare(joke.content)}
                  isConnected={isConnected}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="memes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memes.map((meme) => (
                <MemeCard
                  key={meme.id}
                  meme={meme}
                  onLike={() => handleLike(meme.id, "meme")}
                  onShare={() => handleShare(meme.title)}
                  isConnected={isConnected}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Joke Dialog */}
      <AddJokeDialog
        open={showAddJoke}
        onOpenChange={setShowAddJoke}
        isConnected={isConnected}
        userAddress={userAddress}
      />
    </div>
  )
}
