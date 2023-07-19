import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider'

import './App.css';
import LotteryCollection from './components/LotteryCollection/LotteryCollection.jsx';
import AddLottery from './components/AddLottery/AddLottery.js';

function App() {

  const [provider, setProvider] = useState(null)
  const [loadingProvider, setLoadingProvider] = useState(true);
  const [wallet, setWallet] = useState(null)

  const handleConnectWallet = async () => {
    if (provider) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWallet(accounts[0]);
      console.log("setWallet: ", accounts[0])
    }
  }

  const handleAccountsChanged = async (account) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== wallet) {
      setWallet(accounts[0])
    }
  }

  window.onload = async (event) => {
    const accounts = await window.ethereum.request({method: 'eth_accounts'});       
    if (accounts.length) {
      console.log(`You're connected to: ${accounts[0]}`);
      setWallet(accounts[0])
    } else {
      console.log("Metamask is not connected");
    }
  }
  
  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    
    const getProvider = async () => {
      const result = await detectEthereumProvider()
      setProvider(result)
      setLoadingProvider(false)
    }
    getProvider()

    return ()  => {                                                                      //unmount -> cleanup
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }                                                                   
  }, []);
  
  if (loadingProvider) {
    return <div>Loading provider...</div>;
  }

  return (
    <Router>
    <div className="root">
      <div className="sidebar">
        <div className="sidebar-content">
          <Typography variant="h6" className="sidebar-title">
            Lottery
          </Typography>
          <List>
            <ListItemButton component={Link} to="/all-lotteries" className="sidebar-button">
              <ListItemText primary="All Lotteries" />
            </ListItemButton>
            <ListItemButton component={Link} to="/my-active-lotteries" className="sidebar-button">
              <ListItemText primary="My Lotteries" />
            </ListItemButton>
            <ListItemButton component={Link} to="/add-lottery" className="sidebar-button">
              <ListItemText primary="Add Lottery" />
            </ListItemButton>
          </List>
        </div>
      </div>
      <div className="right-side">
        <div className="header">
          {provider && !wallet && <button onClick={handleConnectWallet} className="connect-wallet"> Connect MetaMask </button>}
          {}
        </div>
        <div className="content">
          <Routes>
            <Route path="/" key={Date.now()} element={<LotteryCollection currPage="all" wallet={wallet}/>} />
            <Route path="/all-lotteries" key={Date.now()} element={<LotteryCollection currPage="all" wallet={wallet}/>} />
            <Route path="/my-active-lotteries" key={Date.now()} element={<LotteryCollection currPage="my-lotteries" wallet={wallet}   />} />
            <Route path="/add-lottery" key={Date.now()} element={<AddLottery/>} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;
