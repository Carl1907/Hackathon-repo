import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NFTGrid from '../components/NFTGrid'
import SearchFilter from '../components/SearchFilter'
import { NFT } from '../components/NFTCard'
import { useNFT } from '../contexts/NFTContext'

const HomePage: React.FC = () => {
  const { nfts, loading, toggleLike, searchNFTs, filterByCategory, sortNFTs, getCategories, getStats } = useNFT()
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [categories, setCategories] = useState<string[]>([])
  const [stats, setStats] = useState({ totalNFTs: 0, totalLikes: 0, totalCreators: 0, categories: 0 })

  // Load categories and stats once
  useEffect(() => {
    (async () => {
      const [cats, st] = await Promise.all([getCategories(), getStats()])
      setCategories(cats)
      setStats(st)
    })()
  }, [getCategories, getStats])

  // Update filtered NFTs when nfts, search, category, or sort changes
  useEffect(() => {
    (async () => {
      let filtered = nfts

      if (searchQuery.trim()) {
        filtered = await searchNFTs(searchQuery)
      }

      if (selectedCategory !== 'all') {
        filtered = await filterByCategory(selectedCategory)
      }

      filtered = await sortNFTs(sortBy)

      setFilteredNFTs(filtered)
    })()
  }, [nfts, searchQuery, selectedCategory, sortBy, searchNFTs, filterByCategory, sortNFTs])

  const handleLike = (id: string) => {
    toggleLike(id)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSort = (sort: string) => {
    setSortBy(sort)
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Discover Unique NFTs
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Explore, collect, and trade extraordinary digital art from talented creators around the world.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <SearchFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          categories={categories}
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl border border-primary-200 p-6 text-center">
            <div className="text-2xl font-bold text-primary-900 mb-2">
              {stats.totalNFTs}
            </div>
            <div className="text-primary-600">Total NFTs</div>
          </div>
          <div className="bg-white rounded-xl border border-primary-200 p-6 text-center">
            <div className="text-2xl font-bold text-primary-900 mb-2">
              {stats.totalLikes}
            </div>
            <div className="text-primary-600">Total Likes</div>
          </div>
          <div className="bg-white rounded-xl border border-primary-200 p-6 text-center">
            <div className="text-2xl font-bold text-primary-900 mb-2">
              {stats.totalCreators}
            </div>
            <div className="text-primary-600">Active Creators</div>
          </div>
          <div className="bg-white rounded-xl border border-primary-200 p-6 text-center">
            <div className="text-2xl font-bold text-primary-900 mb-2">
              {stats.categories}
            </div>
            <div className="text-primary-600">Categories</div>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <NFTGrid nfts={filteredNFTs} onLike={handleLike} loading={loading} />
      </div>
    </div>
  )
}

export default HomePage
