import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { WalletProvider } from './contexts/WalletContext'
import { NFTProvider } from './contexts/NFTContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import NFTDetailPage from './pages/NFTDetailPage'
import SellPage from './pages/SellPage'

function App() {
  return (
    <WalletProvider>
      <NFTProvider>
        <div className="min-h-screen bg-primary-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nft/:id" element={<NFTDetailPage />} />
              <Route path="/sell" element={<SellPage />} />
            </Routes>
          </main>
        </div>
      </NFTProvider>
    </WalletProvider>
  )
}

export default App
