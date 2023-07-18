import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider'
import { getTokenPrice } from './providers/OracleProvider.js'

import './App.css';
import LotteryCollection from './components/LotteryCollection/LotteryCollection.js';

function App() {

  const [provider, setProvider] = useState(null)
  const [loadingProvider, setLoadingProvider] = useState(true);
  const [wallet, setWallet] = useState(null)

  useEffect(() => {
    const getProvider = async () => {
      const result = await detectEthereumProvider()
      setProvider(result)
      setLoadingProvider(false)
    }
    getProvider()
  }, [])

  useEffect(() => { 
  }, [wallet])

  if (loadingProvider) {
    return <div>Loading provider...</div>;
  }

  const handleConnectWallet = async () => {
    if (provider) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setWallet(accounts[0])
      console.log("setWallet: ", accounts[0])

      const broj = await getTokenPrice("DAI")
      console.log("broj: ", broj)
    }
  }

  const handleAccountsChanged = async (account) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setWallet(accounts[0])
  }

  window.ethereum.on('accountsChanged', handleAccountsChanged);

  return (
    <Router>
    <div className="root">
      <div className="sidebar">
        <div className="sidebar-content">
          <Typography variant="h6" className="sidebar-title">
            Lottery
          </Typography>
          <List>
            <ListItem button component={Link} to="/active-lotteries" className="sidebar-button">
              <ListItemText primary="Active Lotteries" />
            </ListItem>
            <ListItem button component={Link} to="/previous-lotteries" className="sidebar-button">
              <ListItemText primary="Previous Lotteries" />
            </ListItem>
          </List>
        </div>
      </div>
      <div className="right-side">
        <div className="header">
          { provider && <button onClick={handleConnectWallet} className="connect-wallet"> Connect MetaMask </button> }
          {/* { wallet && wallet.accounts.length > 0 && <div>Wallet Accounts: { wallet.accounts[0] } </div> } */}
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<LotteryCollection provider={provider} />} />
            <Route path="/active-lotteries" element={<LotteryCollection provider={provider} />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;
