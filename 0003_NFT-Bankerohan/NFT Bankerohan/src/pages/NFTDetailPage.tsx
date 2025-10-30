import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Share2, Copy, Clock, User, Tag } from 'lucide-react'
import { NFT } from '../components/NFTCard'
import { useNFT } from '../contexts/NFTContext'

const NFTDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { getNFTById, toggleLike } = useNFT()
  const [nft, setNft] = useState<NFT | null>(null)
  const [bidAmount, setBidAmount] = useState('')
  const [currentBid, setCurrentBid] = useState(0.3)
  const [timeLeft, setTimeLeft] = useState('2d 14h 23m')

  useEffect(() => {
    if (id) {
      const foundNFT = getNFTById(id)
      setNft(foundNFT || null)
    }
  }, [id, getNFTById])

  const handleLike = () => {
    if (nft) {
      const updatedNFT = toggleLike(nft.id)
      if (updatedNFT) {
        setNft(updatedNFT)
      }
    }
  }

  const handleBid = () => {
    const bid = parseFloat(bidAmount)
    if (bid > currentBid) {
      setCurrentBid(bid)
      setBidAmount('')
      // In a real app, this would submit the bid to the blockchain
    }
  }

  const handleBuy = () => {
    // In a real app, this would initiate the purchase transaction
    alert('Purchase initiated! Please confirm in your wallet.')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: nft?.title,
        text: nft?.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (!nft) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">NFT Not Found</h2>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-accent-600 hover:text-accent-700"
          >
            <ArrowLeft size={20} />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-900 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Marketplace</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NFT Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-white border border-primary-200">
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  nft.isLiked
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-white text-primary-600 border border-primary-200 hover:bg-primary-50'
                }`}
              >
                <Heart size={18} fill={nft.isLiked ? 'currentColor' : 'none'} />
                <span>{nft.likes}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                <Share2 size={18} />
                <span>Share</span>
              </motion.button>
            </div>
          </motion.div>

          {/* NFT Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Creator */}
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                {nft.title}
              </h1>
              <div className="flex items-center space-x-2 text-primary-600 mb-4">
                <User size={18} />
                <span>Created by {nft.creator}</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-600">
                <Tag size={18} />
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">
                  {nft.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Description</h3>
              <p className="text-primary-600 leading-relaxed">{nft.description}</p>
            </div>

            {/* Price and Stats */}
            <div className="bg-white rounded-xl border border-primary-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-primary-600 mb-1">Current Price</div>
                  <div className="text-3xl font-bold text-primary-900">{nft.price} ETH</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-primary-600 mb-1">Time Left</div>
                  <div className="flex items-center space-x-1 text-primary-900">
                    <Clock size={16} />
                    <span className="font-semibold">{timeLeft}</span>
                  </div>
                </div>
              </div>

              {/* Current Bid */}
              <div className="mb-6">
                <div className="text-sm text-primary-600 mb-2">Current Highest Bid</div>
                <div className="text-xl font-semibold text-primary-900">{currentBid} ETH</div>
              </div>

              {/* Bid Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Place a Bid
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      step="0.01"
                      min={currentBid + 0.01}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Min: ${(currentBid + 0.01).toFixed(2)} ETH`}
                      className="flex-1 px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                    <span className="px-3 py-2 bg-primary-100 text-primary-700 rounded-lg">ETH</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBid}
                    disabled={!bidAmount || parseFloat(bidAmount) <= currentBid}
                    className="flex-1 py-3 px-4 bg-primary-900 text-white rounded-lg hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Place Bid
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuy}
                    className="flex-1 py-3 px-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors duration-200"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl border border-primary-200 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary-600">Contract Address</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-primary-900 font-mono text-sm">
                      0x1234...5678
                    </span>
                    <button className="text-primary-400 hover:text-primary-600">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Token ID</span>
                  <span className="text-primary-900 font-mono text-sm">{nft.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Token Standard</span>
                  <span className="text-primary-900 text-sm">ERC-721</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Created</span>
                  <span className="text-primary-900 text-sm">{nft.createdAt}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NFTDetailPage
