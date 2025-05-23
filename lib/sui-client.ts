import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client"
import { TransactionBlock } from "@mysten/sui.js/transactions"

// Sui client configuration
export const suiClient = new SuiClient({
  url: getFullnodeUrl("testnet"), // Use 'mainnet' for production
})

// Package ID for the joke platform smart contract
export const PACKAGE_ID = "0x..." // Replace with actual package ID after deployment

// Object types
export interface JokeObject {
  id: string
  content: string
  author: string
  category: string
  likes: number
  timestamp: number
}

export interface MemeObject {
  id: string
  title: string
  imageUrl: string
  author: string
  category: string
  likes: number
  timestamp: number
}

// Smart contract interaction functions
export class SuiJokePlatform {
  static async addJoke(content: string, category: string, signAndExecute: any) {
    const tx = new TransactionBlock()

    tx.moveCall({
      target: `${PACKAGE_ID}::joke_platform::add_joke`,
      arguments: [tx.pure(content), tx.pure(category)],
    })

    return await signAndExecute({
      transactionBlock: tx,
      options: {
        showEffects: true,
      },
    })
  }

  static async likeJoke(jokeId: string, signAndExecute: any) {
    const tx = new TransactionBlock()

    tx.moveCall({
      target: `${PACKAGE_ID}::joke_platform::like_joke`,
      arguments: [tx.object(jokeId)],
    })

    return await signAndExecute({
      transactionBlock: tx,
      options: {
        showEffects: true,
      },
    })
  }

  static async getAllJokes() {
    try {
      // Query all joke objects
      const response = await suiClient.getOwnedObjects({
        owner: PACKAGE_ID,
        filter: {
          StructType: `${PACKAGE_ID}::joke_platform::Joke`,
        },
        options: {
          showContent: true,
          showType: true,
        },
      })

      return response.data.map((obj) => {
        const fields = (obj.data?.content as any)?.fields
        return {
          id: obj.data?.objectId || "",
          content: fields?.content || "",
          author: fields?.author || "",
          category: fields?.category || "",
          likes: Number.parseInt(fields?.likes || "0"),
          timestamp: Number.parseInt(fields?.timestamp || "0"),
        }
      })
    } catch (error) {
      console.error("Error fetching jokes:", error)
      return []
    }
  }

  static async addMeme(title: string, imageUrl: string, category: string, signAndExecute: any) {
    const tx = new TransactionBlock()

    tx.moveCall({
      target: `${PACKAGE_ID}::joke_platform::add_meme`,
      arguments: [tx.pure(title), tx.pure(imageUrl), tx.pure(category)],
    })

    return await signAndExecute({
      transactionBlock: tx,
      options: {
        showEffects: true,
      },
    })
  }
}
