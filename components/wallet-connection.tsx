"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react"

interface WalletConnectionProps {
  isConnected: boolean
  userAddress: string
  onConnect: (connected: boolean) => void
  onAddressChange: (address: string) => void
}

export function WalletConnection({ isConnected, userAddress, onConnect, onAddressChange }: WalletConnectionProps) {
  const [showWalletDialog, setShowWalletDialog] = useState(false)

  const connectWallet = async (walletType: string) => {
    // In a real app, this would integrate with Sui wallet adapters
    try {
      // Simulate wallet connection
      const mockAddress = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`
      onAddressChange(mockAddress)
      onConnect(true)
      setShowWalletDialog(false)

      // In real implementation, you would use:
      // import { WalletProvider, useWallet } from '@suiet/wallet-kit'
      // const wallet = useWallet()
      // await wallet.connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const disconnectWallet = () => {
    onConnect(false)
    onAddressChange("")
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(userAddress)
    alert("Address copied to clipboard!")
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">
                {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
              </span>
              <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnectWallet}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <LogOut className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect to Sui Wallet</DialogTitle>
          <DialogDescription>Choose a wallet to connect to the SuiLaughs platform</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => connectWallet("suiet")}
            className="flex items-center justify-between p-4 h-auto"
            variant="outline"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">Suiet Wallet</div>
                <div className="text-sm text-muted-foreground">Connect using Suiet</div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => connectWallet("sui")}
            className="flex items-center justify-between p-4 h-auto"
            variant="outline"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">Sui Wallet</div>
                <div className="text-sm text-muted-foreground">Official Sui Wallet</div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => connectWallet("ethos")}
            className="flex items-center justify-between p-4 h-auto"
            variant="outline"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">Ethos Wallet</div>
                <div className="text-sm text-muted-foreground">Connect using Ethos</div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
