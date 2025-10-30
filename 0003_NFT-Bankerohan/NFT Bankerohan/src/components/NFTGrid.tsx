import React from 'react'
import { motion } from 'framer-motion'
import NFTCard, { NFT } from './NFTCard'

interface NFTGridProps {
  nfts: NFT[]
  onLike?: (id: string) => void
  loading?: boolean
}

const NFTGrid: React.FC<NFTGridProps> = ({ nfts, onLike, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-primary-200 overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-primary-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-primary-200 rounded w-3/4"></div>
              <div className="h-3 bg-primary-200 rounded w-1/2"></div>
              <div className="h-6 bg-primary-200 rounded w-1/3"></div>
              <div className="flex space-x-2">
                <div className="h-8 bg-primary-200 rounded flex-1"></div>
                <div className="h-8 bg-primary-200 rounded flex-1"></div>
                <div className="h-8 bg-primary-200 rounded flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (nfts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-primary-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-primary-900 mb-2">
          No NFTs found
        </h3>
        <p className="text-primary-600">
          Try adjusting your search or browse all available NFTs.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {nfts.map((nft, index) => (
        <motion.div
          key={nft.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <NFTCard nft={nft} onLike={onLike} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default NFTGrid
