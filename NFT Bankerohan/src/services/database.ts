import { NFT } from '../components/NFTCard'

const STORAGE_KEY = 'nft-marketplace-data'

interface DatabaseData {
  nfts: NFT[]
  nextId: number
}

class NFTDatabase {
  private data: DatabaseData

  constructor() {
    this.data = this.loadFromStorage()
  }

  private loadFromStorage(): DatabaseData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
    }
    
    // Return default data with some sample NFTs
    return {
      nfts: [
        {
          id: '1',
          title: 'Digital Dreams #001',
          creator: 'ArtistOne',
          price: 0.5,
          image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop',
          description: 'A mesmerizing digital artwork exploring the intersection of technology and creativity.',
          likes: 42,
          isLiked: false,
          category: 'Digital Art',
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          title: 'Abstract Universe',
          creator: 'CreatorTwo',
          price: 1.2,
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
          description: 'An abstract representation of cosmic energy and universal harmony.',
          likes: 89,
          isLiked: true,
          category: 'Abstract',
          createdAt: '2024-01-14',
        },
        {
          id: '3',
          title: 'Neon Cityscape',
          creator: 'UrbanArtist',
          price: 0.8,
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
          description: 'A vibrant cyberpunk cityscape illuminated by neon lights.',
          likes: 156,
          isLiked: false,
          category: 'Cyberpunk',
          createdAt: '2024-01-13',
        },
        {
          id: '4',
          title: 'Nature\'s Symphony',
          creator: 'NatureLover',
          price: 0.3,
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
          description: 'A peaceful landscape capturing the essence of natural beauty.',
          likes: 67,
          isLiked: false,
          category: 'Nature',
          createdAt: '2024-01-12',
        },
        {
          id: '5',
          title: 'Geometric Harmony',
          creator: 'GeometricArtist',
          price: 0.7,
          image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop',
          description: 'Perfect geometric shapes creating visual harmony and balance.',
          likes: 34,
          isLiked: true,
          category: 'Geometric',
          createdAt: '2024-01-11',
        },
        {
          id: '6',
          title: 'Space Odyssey',
          creator: 'SpaceExplorer',
          price: 1.5,
          image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop',
          description: 'A journey through the cosmos with stunning space imagery.',
          likes: 203,
          isLiked: false,
          category: 'Space',
          createdAt: '2024-01-10',
        },
      ],
      nextId: 7
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data))
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }

  getAllNFTs(): NFT[] {
    return [...this.data.nfts]
  }

  getNFTById(id: string): NFT | undefined {
    return this.data.nfts.find(nft => nft.id === id)
  }

  addNFT(nftData: Omit<NFT, 'id' | 'likes' | 'isLiked' | 'createdAt'>): NFT {
    const newNFT: NFT = {
      ...nftData,
      id: this.data.nextId.toString(),
      likes: 0,
      isLiked: false,
      createdAt: new Date().toISOString().split('T')[0]
    }

    this.data.nfts.unshift(newNFT) // Add to beginning of array
    this.data.nextId++
    this.saveToStorage()
    
    return newNFT
  }

  updateNFT(id: string, updates: Partial<NFT>): NFT | null {
    const index = this.data.nfts.findIndex(nft => nft.id === id)
    if (index === -1) return null

    this.data.nfts[index] = { ...this.data.nfts[index], ...updates }
    this.saveToStorage()
    
    return this.data.nfts[index]
  }

  deleteNFT(id: string): boolean {
    const index = this.data.nfts.findIndex(nft => nft.id === id)
    if (index === -1) return false

    this.data.nfts.splice(index, 1)
    this.saveToStorage()
    
    return true
  }

  toggleLike(id: string): NFT | null {
    const nft = this.getNFTById(id)
    if (!nft) return null

    const updatedNFT = {
      ...nft,
      isLiked: !nft.isLiked,
      likes: nft.isLiked ? nft.likes - 1 : nft.likes + 1
    }

    return this.updateNFT(id, updatedNFT)
  }

  searchNFTs(query: string): NFT[] {
    if (!query.trim()) return this.getAllNFTs()

    const lowercaseQuery = query.toLowerCase()
    return this.data.nfts.filter(nft =>
      nft.title.toLowerCase().includes(lowercaseQuery) ||
      nft.creator.toLowerCase().includes(lowercaseQuery) ||
      nft.description.toLowerCase().includes(lowercaseQuery) ||
      nft.category.toLowerCase().includes(lowercaseQuery)
    )
  }

  filterByCategory(category: string): NFT[] {
    if (category === 'all') return this.getAllNFTs()
    return this.data.nfts.filter(nft => nft.category === category)
  }

  sortNFTs(sortBy: string): NFT[] {
    const nfts = [...this.data.nfts]
    
    switch (sortBy) {
      case 'newest':
        return nfts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case 'oldest':
        return nfts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      case 'price-low':
        return nfts.sort((a, b) => a.price - b.price)
      case 'price-high':
        return nfts.sort((a, b) => b.price - a.price)
      case 'popular':
        return nfts.sort((a, b) => b.likes - a.likes)
      default:
        return nfts
    }
  }

  getCategories(): string[] {
    const categories = new Set(this.data.nfts.map(nft => nft.category))
    return Array.from(categories).sort()
  }

  getStats() {
    return {
      totalNFTs: this.data.nfts.length,
      totalLikes: this.data.nfts.reduce((sum, nft) => sum + nft.likes, 0),
      totalCreators: new Set(this.data.nfts.map(nft => nft.creator)).size,
      categories: this.getCategories().length
    }
  }
}

// Create a singleton instance
export const nftDatabase = new NFTDatabase()
export default nftDatabase
