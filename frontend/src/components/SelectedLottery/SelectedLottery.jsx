import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DepositModal from '../modals/DepositModal';
import WithdrawModal from '../modals/WithdrawModal';
import './SelectedLottery.scss';

import './SelectedLottery.scss';

const SelectedLottery = ({}) => {

  const location = useLocation();
  const { lottery, currPage, wallet } = location.state || {}                    // Access the lottery prop from location.state
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);    
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);     // State to control the deposit modal

  const { id, name, protocol, tokenName, currentAmount, expectedYield, APY, endDate, completed, currentAmountUSD } = lottery;
  
  const openDepositModal = () => {
    setIsDepositModalOpen(true);
  }

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
  }

  const openWithdrawModal = () => {setIsWithdrawModalOpen(true);}
  const closeWithdrawModal = () => {setIsWithdrawModalOpen(false);}

  if (!lottery) {
    return <div> Loading selected lottery.. .</div>;
  } 


  return (
    <div className="selected-lottery">
      <div className="selectedLotteryName">{name}</div>
        <div className="selectedLotteryLine">
            <div className="protocol">{protocol}</div>
            <div className="token-name">{tokenName}</div>
        </div>
        <div className="selectedLotteryLine">
            <div className="selectedLottery current-amount">{`In lottery: ${currentAmount}  `}</div>
            <div className="current-amount-usd">{`($${currentAmountUSD.toFixed(2)})`}</div>
        </div>
        <div className="selectedLotteryLine">
            <div className="apy">{`APY: ${APY}%`}</div>
        </div>
        <div className="selectedLotteryLine">
            <div className="expected-yield">{`Expected Yield: ${expectedYield}`}</div>
        </div>
        <div>
            <div className="end-date">{endDate}</div>
        </div>
        <div>
          {wallet? 
            <>
            <div className='flexRowDiv'>
              <button className='modalButton' onClick={openDepositModal}>Deposit</button>
              <DepositModal isOpen={isDepositModalOpen} 
                            closeModal={closeDepositModal} 
                            lottery={lottery} 
                            wallet={wallet}/>

              <button className='modalButton' onClick={openWithdrawModal}>Withdraw</button>
              <WithdrawModal isOpen={isWithdrawModalOpen} closeModal={closeWithdrawModal} wallet={wallet} lottery={lottery} />
            </div>
            </>: 
            <label className="conncet-wallet-msg"> Wallet is not connected </label>}
        </div>
    </div>
  );
}

export default SelectedLottery;