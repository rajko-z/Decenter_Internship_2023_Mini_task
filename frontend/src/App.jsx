import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider'

import './App.scss'
import SelectedLottery from './components/SelectedLottery/SelectedLottery'
import LotteryCollection from './components/LotteryCollection/LotteryCollection'
import AddLottery from './components/AddLottery/AddLottery'

function App() {

  const [provider, setProvider] = useState(null)
  const [loadingProvider, setLoadingProvider] = useState(true);
  const [wallet, setWallet] = useState("0x0000000000000000000000000000000000000000")
  
  useEffect(() => {
    console.log('refresh')
    const getProvider = async () => {
      const result = await detectEthereumProvider()
      setProvider(result)
      setLoadingProvider(false)

      if(!result) return

      const accountsRes = await window.ethereum.request({method: 'eth_accounts'});       
      if (accountsRes.length) {
        console.log(`You're connected to: ${accountsRes[0]}`);
        setWallet(accountsRes[0])
        // console.log(accountsRes[0])
      } else {
        setWallet('0x0000000000000000000000000000000000000000')
        console.log("Metamask is not connected");
      }
    }

    getProvider()

    return () => {                                            
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
    }                                                                    
  }, []);

  const handleConnectWallet = async () => {
    if (provider) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWallet(accounts[0])
      console.log(accounts[0])
    }
  }

  const refreshAccounts = async () => {    
    const resAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    if (resAccounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (resAccounts[0] !== wallet) {
      setWallet(resAccounts[0])
    }       
    console.log("refreshAccounts", wallet)                                           
  } 
  
  if (loadingProvider) {
    return <div>Loading provider...</div>;
  }

  return (
    <Router>
    <div className="root">
      <div className="sidebar">
        <div className="sidebar-content">
          <Typography variant="h6" className="sidebar-title">
            <h1 className='title'>Sakura Lottery</h1>
          </Typography>
          <List>
            <ListItemButton component={Link} to="/all-lotteries" className="sidebar-button">
              <ListItemText primary="All Lotteries" />
            </ListItemButton>
            <ListItemButton component={Link} to="/my-lotteries" className="sidebar-button">
              <ListItemText primary="My Lotteries" />
            </ListItemButton>
            <ListItemButton component={Link} to="/history" className="sidebar-button">
              <ListItemText primary="Past lotteries" />
            </ListItemButton>
            <ListItemButton component={Link} to="/add-lottery" className="sidebar-button">
              <ListItemText primary="Add Lottery" />
            </ListItemButton>
          </List>
        </div>
      </div>
      <div className="right-side">
        <div className="header">
          {provider && wallet === "0x0000000000000000000000000000000000000000" 
            && <button onClick={handleConnectWallet} className="connect-wallet"> Connect MetaMask </button>}
          {}
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<LotteryCollection currPage="all" wallet={wallet}/>} />
            <Route path="/all-lotteries" element={<LotteryCollection currPage="all" wallet={wallet}/>} />
            <Route path="/my-lotteries" element={<LotteryCollection currPage="my-lotteries" wallet={wallet}   />} />
            <Route path="/history" element={<LotteryCollection currPage="history" wallet={wallet}/>} />
            <Route path="/add-lottery" element={<AddLottery wallet={wallet}/>} />
            <Route path="/selected-lottery/:lotteryId" element={<SelectedLottery/>} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;
