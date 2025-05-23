"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, Coins } from "lucide-react"

interface AddJokeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isConnected: boolean
  userAddress: string
}

export function AddJokeDialog({ open, onOpenChange, isConnected, userAddress }: AddJokeDialogProps) {
  const [jokeContent, setJokeContent] = useState("")
  const [category, setCategory] = useState("")
  const [storeOnChain, setStoreOnChain] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!jokeContent.trim() || !category) {
      alert("Please fill in all fields")
      return
    }

    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would interact with Sui blockchain
      // Example Sui transaction:
      /*
      const tx = new TransactionBlock()
      tx.moveCall({
        target: `${PACKAGE_ID}::joke_platform::add_joke`,
        arguments: [
          tx.pure(jokeContent),
          tx.pure(category),
          tx.pure(storeOnChain)
        ]
      })
      
      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
        },
      })
      */

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Joke submitted successfully!")
      setJokeContent("")
      setCategory("")
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to submit joke:", error)
      alert("Failed to submit joke. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Joke</DialogTitle>
          <DialogDescription>Share your humor with the SuiLaughs community</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="joke-content">Joke Content</Label>
            <Textarea
              id="joke-content"
              placeholder="Enter your joke here..."
              value={jokeContent}
              onChange={(e) => setJokeContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dad-jokes">Dad Jokes</SelectItem>
                <SelectItem value="puns">Puns</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="store-onchain">Store on Sui Blockchain</Label>
              <p className="text-sm text-muted-foreground">Permanent storage with gas fees</p>
            </div>
            <Switch id="store-onchain" checked={storeOnChain} onCheckedChange={setStoreOnChain} />
          </div>

          {storeOnChain && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Coins className="h-4 w-4" />
                <span>Estimated gas fee: ~0.001 SUI</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !isConnected}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Joke"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
