import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Wand2, Image, DollarSign, FileText, CheckCircle, AlertCircle, Shuffle } from 'lucide-react'
import { useNFT } from '../contexts/NFTContext'
import head1 from '../assets/head1.svg'
import head2 from '../assets/head2.svg'
import head3 from '../assets/head3.svg'
import hat1 from '../assets/hat1.svg'
import hat2 from '../assets/hat2.svg'
import hat3 from '../assets/hat3.svg'

const SellPage: React.FC = () => {
  const { addNFT } = useNFT()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    imagePreview: '',
  })

  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState('')

  // Trait assets and selection
  const heads = useMemo(() => [head1, head2, head3], [])
  const hats = useMemo(() => [hat1, hat2, hat3], [])
  const [selectedHead, setSelectedHead] = useState(0)
  const [selectedHat, setSelectedHat] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const categories = [
    'Digital Art',
    'Abstract',
    'Cyberpunk',
    'Nature',
    'Geometric',
    'Space',
    'Portrait',
    'Landscape',
    '3D Art',
    'Photography',
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateComposite = async () => {
    try {
      const size = 1024
      const [headSvg, hatSvg] = await Promise.all([
        fetch(heads[selectedHead]).then(r => r.text()),
        fetch(hats[selectedHat]).then(r => r.text())
      ])

      const headData = `data:image/svg+xml;utf8,${encodeURIComponent(headSvg)}`
      const hatData = `data:image/svg+xml;utf8,${encodeURIComponent(hatSvg)}`

      const combined = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n` +
        `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" height=\"${size}\" viewBox=\"0 0 ${size} ${size}\">\n` +
        `  <rect width=\"100%\" height=\"100%\" fill=\"#ffffff\"/>\n` +
        `  <image href=\"${hatData}\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\"/>\n` +
        `  <image href=\"${headData}\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\"/>\n` +
        `</svg>`

      const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(combined)}`
      setFormData(prev => ({ ...prev, imagePreview: dataUrl }))
    } catch (e) {
      setUploadError('Failed to generate image')
    }
  }

  const randomizeTraits = () => {
    const newHead = Math.floor(Math.random() * heads.length)
    const newHat = Math.floor(Math.random() * hats.length)
    setSelectedHead(newHead)
    setSelectedHat(newHat)
    setTimeout(() => { generateComposite() }, 0)
  }

  // Auto-generate on first render
  useEffect(() => {
    generateComposite()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted!', formData) // Debug log
    
    // Clear previous messages
    setUploadError('')
    setUploadSuccess(false)
    
    // Validate form
    if (!formData.imagePreview) {
      setUploadError('Please generate an image')
      return
    }
    
    if (!formData.title.trim()) {
      setUploadError('Please enter a title')
      return
    }
    
    if (!formData.description.trim()) {
      setUploadError('Please enter a description')
      return
    }
    
    if (!formData.category) {
      setUploadError('Please select a category')
      return
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setUploadError('Please enter a valid price')
      return
    }

    setIsUploading(true)

    try {
      // Create NFT data for local database
      const nftData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.imagePreview,
        creator: 'You'
      }

      const newNFT = await addNFT(nftData as any)
      console.log('NFT created:', newNFT)

      setUploadSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          price: '',
          category: '',
          imagePreview: '',
        })
        setUploadSuccess(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error creating NFT:', error)
      setUploadError('Error creating NFT. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Create & Sell Your NFT
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Upload your digital artwork and list it for sale on our marketplace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generator Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Generator */}
            <div className="bg-white rounded-xl border border-primary-200 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
                <Wand2 className="mr-2" size={20} />
                Generate Your Artwork
              </h3>
              
              {formData.imagePreview ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <div className="aspect-square rounded-lg overflow-hidden border border-primary-200 shadow-sm">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <CheckCircle size={12} />
                      <span>Generated</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-primary-600">Your generated image is ready.</p>
                    <div className="space-x-3">
                      <button
                        type="button"
                        onClick={() => randomizeTraits()}
                        className="text-sm text-primary-700 hover:text-primary-900 font-medium inline-flex items-center"
                      >
                        <Shuffle size={16} className="mr-1" /> Randomize
                      </button>
                      <button
                        type="button"
                        onClick={generateComposite}
                        className="text-sm text-primary-700 hover:text-primary-900 font-medium inline-flex items-center"
                      >
                        Regenerate
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-primary-600">Click below to generate your artwork.</p>
                  <button
                    type="button"
                    onClick={generateComposite}
                    className="py-2 px-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors duration-200 inline-flex items-center"
                  >
                    <Wand2 size={16} className="mr-2" /> Generate Preview
                  </button>
                </div>
              )}
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Generation Tips</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Choose a head and a hat, or click Randomize</li>
                <li>• Click Generate Preview to create the composite image</li>
                <li>• The final image is saved as PNG and listed for sale</li>
              </ul>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-xl border border-primary-200 p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
                  <FileText className="mr-2" size={20} />
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter NFT title"
                      className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Describe your NFT..."
                      className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-xl border border-primary-200 p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
                  <DollarSign className="mr-2" size={20} />
                  Pricing
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Price (ETH) *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      placeholder="0.00"
                      className="flex-1 px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                    <span className="px-3 py-2 bg-primary-100 text-primary-700 rounded-lg">ETH</span>
                  </div>
                  <p className="text-sm text-primary-600 mt-2">
                    You'll receive 95% of the sale price (5% marketplace fee)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isUploading}
                className="w-full py-3 px-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating NFT...</span>
                  </>
                ) : uploadSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    <span>NFT Created Successfully!</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    <span>Generate & List NFT</span>
                  </>
                )}
              </motion.button>

              {/* Error Message */}
              {uploadError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
                >
                  <AlertCircle size={16} />
                  <span className="text-sm">{uploadError}</span>
                </motion.div>
              )}

              {/* Success Message */}
              {uploadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700"
                >
                  <CheckCircle size={16} />
                  <span className="text-sm">NFT successfully listed for sale! Redirecting...</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SellPage
