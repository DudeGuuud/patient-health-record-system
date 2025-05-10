"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true)
    setWalletAddress("0x1234...5678")
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  if (!isConnected) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={connectWallet}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md transition-all duration-300 hover:shadow-purple-200"
        >
          <Wallet className="h-4 w-4" />
          连接 Slush 钱包
        </Button>
      </motion.div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-purple-200 bg-white shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md"
          >
            <Wallet className="h-4 w-4 text-purple-500" />
            {walletAddress}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-in fade-in-50 slide-in-from-top-5">
        <DropdownMenuItem className="text-destructive" onClick={disconnectWallet}>
          断开连接
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
