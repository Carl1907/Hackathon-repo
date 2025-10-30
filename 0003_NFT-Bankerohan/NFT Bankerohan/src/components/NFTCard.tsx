import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, ShoppingCart, Gavel, Heart } from 'lucide-react'

export interface NFT {
  id: string
  title: string
  creator: string
  price: number
  image: string
  description: string
  likes: number
  isLiked?: boolean
  category: string
  createdAt: string
}

interface NFTCardProps {
  nft: NFT
  onLike?: (id: string) => void
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onLike }) => {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onLike?.(nft.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-primary-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/nft/${nft.id}`} className="block">
        {/* NFT Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={nft.image}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                nft.isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-primary-600 hover:bg-white'
              }`}
            >
              <Heart size={16} fill={nft.isLiked ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-md backdrop-blur-sm">
              {nft.category}
            </span>
          </div>
        </div>

        {/* NFT Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-primary-900 truncate flex-1 mr-2">
              {nft.title}
            </h3>
            <span className="text-sm text-primary-500">{nft.likes}</span>
          </div>
          
          <p className="text-sm text-primary-600 mb-3 line-clamp-2">
            by {nft.creator}
          </p>

          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-lg font-bold text-primary-900">
                {nft.price} ETH
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors duration-200"
            >
              <Eye size={16} />
              <span className="text-sm">View</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors duration-200"
            >
              <ShoppingCart size={16} />
              <span className="text-sm">Buy</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              <Gavel size={16} />
              <span className="text-sm">Bid</span>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default NFTCard
