import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { NFT } from '../components/NFTCard'
import nftDatabase from '../services/database'

interface NFTContextType {
  nfts: NFT[]
  loading: boolean
  addNFT: (nftData: Omit<NFT, 'id' | 'likes' | 'isLiked' | 'createdAt'>) => Promise<NFT>
  updateNFT: (id: string, updates: Partial<NFT>) => Promise<NFT | null>
  deleteNFT: (id: string) => Promise<boolean>
  toggleLike: (id: string) => Promise<NFT | null>
  searchNFTs: (query: string) => Promise<NFT[]>
  filterByCategory: (category: string) => Promise<NFT[]>
  sortNFTs: (sortBy: string) => Promise<NFT[]>
  getCategories: () => Promise<string[]>
  getStats: () => Promise<{ totalNFTs: number; totalLikes: number; totalCreators: number; categories: number }>
  refreshNFTs: () => Promise<void>
  loadNFTs: (params?: any) => Promise<void>
  getNFTById: (id: string) => Promise<NFT | null>
}

const NFTContext = createContext<NFTContextType | undefined>(undefined)

interface NFTProviderProps {
  children: ReactNode
}

export const NFTProvider: React.FC<NFTProviderProps> = ({ children }) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)

  // Load NFTs on mount
  useEffect(() => {
    loadNFTs()
  }, [])

  const loadNFTs = async (params: any = {}) => {
    setLoading(true)
    try {
      // Ignore params for local database for now; could be applied client-side
      const all = nftDatabase.getAllNFTs()
      setNfts(all)
    } catch (error) {
      console.error('Error loading NFTs:', error)
    } finally {
      setLoading(false)
    }
  }

  const addNFT = async (nftData: Omit<NFT, 'id' | 'likes' | 'isLiked' | 'createdAt'>): Promise<NFT> => {
    try {
      const created = nftDatabase.addNFT(nftData)
      setNfts(prev => [created, ...prev])
      return created
    } catch (error) {
      console.error('Error creating NFT:', error)
      throw error
    }
  }

  const updateNFT = async (id: string, updates: Partial<NFT>): Promise<NFT | null> => {
    try {
      // This would need to be implemented in the backend
      // For now, we'll update locally
      const updatedNFT = { ...nfts.find(nft => nft.id === id), ...updates } as NFT
      if (updatedNFT) {
        setNfts(prev => prev.map(nft => nft.id === id ? updatedNFT : nft))
      }
      return updatedNFT
    } catch (error) {
      console.error('Error updating NFT:', error)
      return null
    }
  }

  const deleteNFT = async (id: string): Promise<boolean> => {
    try {
      // This would need to be implemented in the backend
      setNfts(prev => prev.filter(nft => nft.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting NFT:', error)
      return false
    }
  }

  const toggleLike = async (id: string): Promise<NFT | null> => {
    try {
      const updated = nftDatabase.toggleLike(id)
      if (updated) {
        setNfts(prev => prev.map(nft => nft.id === id ? updated : nft))
      }
      return updated
    } catch (error) {
      console.error('Error toggling like:', error)
      return null
    }
  }

  const searchNFTs = async (query: string): Promise<NFT[]> => {
    try {
      return nftDatabase.searchNFTs(query)
    } catch (error) {
      console.error('Error searching NFTs:', error)
      return []
    }
  }

  const filterByCategory = async (category: string): Promise<NFT[]> => {
    try {
      return nftDatabase.filterByCategory(category)
    } catch (error) {
      console.error('Error filtering NFTs:', error)
      return []
    }
  }

  const sortNFTs = async (sortBy: string): Promise<NFT[]> => {
    try {
      return nftDatabase.sortNFTs(sortBy)
    } catch (error) {
      console.error('Error sorting NFTs:', error)
      return []
    }
  }

  const getCategories = async (): Promise<string[]> => {
    try {
      return nftDatabase.getCategories()
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  const getStats = async () => {
    try {
      const stats = nftDatabase.getStats()
      return {
        totalNFTs: stats.totalNFTs,
        totalLikes: stats.totalLikes,
        totalCreators: stats.totalCreators,
        categories: stats.categories
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      return {
        totalNFTs: 0,
        totalLikes: 0,
        totalCreators: 0,
        categories: 0
      }
    }
  }

  const refreshNFTs = async () => {
    await loadNFTs()
  }

  const value: NFTContextType = {
    nfts,
    loading,
    addNFT,
    updateNFT,
    deleteNFT,
    toggleLike,
    searchNFTs,
    filterByCategory,
    sortNFTs,
    getCategories,
    getStats,
    refreshNFTs,
    loadNFTs,
    getNFTById: async (id: string) => {
      try {
        const local = nfts.find(n => (n as any).id === id || (n as any)._id === id)
        if (local) return local
        const fetched = nftDatabase.getNFTById(id)
        return fetched || null
      } catch (e) {
        return null
      }
    }
  }

  return (
    <NFTContext.Provider value={value}>
      {children}
    </NFTContext.Provider>
  )
}

export const useNFT = (): NFTContextType => {
  const context = useContext(NFTContext)
  if (context === undefined) {
    throw new Error('useNFT must be used within an NFTProvider')
  }
  return context
}
