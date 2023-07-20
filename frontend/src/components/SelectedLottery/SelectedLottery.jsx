import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DepositModal from '../modals/DepositModal';
import WithdrawModal from '../modals/WithdrawModal';
import ClaimModal from '../modals/ClaimModal';
import { checkLotteryStatus, getUsersMoneyInLottery} from '../../providers/LotteryProvider';

import './SelectedLottery.scss';


const SelectedLottery = ({}) => {
  const location = useLocation();
  const { lottery, currPage, wallet } = location.state || {}                    // Access the lottery prop from location.state
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);          // State to control the deposit modal
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);        // State to control the withdraw modal
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);              // State to control the claim modal
  const [isUserParticipating, setIsUserParticipating] = useState(false);
  const [lotteryStatus, setLotteryStatus] = useState(false);
  const [isUserWinner, setIsUserWinner] = useState(false);

  const { id, name, protocol, tokenName, currentAmount, expectedYield, APY, endDate, winner, currentAmountUSD } = lottery;
  
  const openDepositModal = () => {setIsDepositModalOpen(true)}
  const closeDepositModal = () => {setIsDepositModalOpen(false)}
  const openWithdrawModal = () => {setIsWithdrawModalOpen(true)}
  const closeWithdrawModal = () => {setIsWithdrawModalOpen(false)}
  const openClaimModal = () => {setIsClaimModalOpen(true)}
  const closeClaimModal = () => {setIsClaimModalOpen(false)}


  useEffect(() => {
    const fetchData = async (id, wallet) => {
      const lotteryStatus = await checkLotteryStatus(id);
      const userAmount = await getUsersMoneyInLottery(wallet, id);
      
      setLotteryStatus(lotteryStatus);
      setIsUserParticipating(userAmount > 0);

      if (winner !== null) {setIsUserWinner(wallet.toLowerCase() === winner.toLowerCase());}
      else {setIsUserWinner(false);}
      console.log(wallet, winner, wallet===winner, userAmount, isUserParticipating);
    }

    fetchData(id, wallet)
  }, [])

  if (!lottery) {
    return <div> Loading selected lottery.. .</div>;
  } 


  return (
    <div className="selected-lottery">
      <div className="selectedLotteryName"><h3>{name}</h3></div>
        <div className="selectedLotteryLine">
            <div className="protocol">Protocol: {protocol}</div>
            <div className="token-name">Token: {tokenName}</div>
        </div>
        <div className="selectedLotteryLine">
            <div className="selectedLottery current-amount">{`In lottery: ${currentAmount} ${tokenName} (${currentAmountUSD.toFixed(2)}$)`}</div>
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
              {lotteryStatus && !winner &&
                <>
                <button className='modalButton' onClick={openDepositModal}>Deposit</button>
                <DepositModal isOpen={isDepositModalOpen} 
                              closeModal={closeDepositModal} 
                              lottery={lottery} 
                              wallet={wallet}/>
                </>
              }
              {((isUserParticipating && !winner) || (winner && !isUserWinner)) &&
                <>
                <button className='modalButton' onClick={openWithdrawModal}>Withdraw</button>
                <WithdrawModal isOpen={isWithdrawModalOpen} closeModal={closeWithdrawModal} wallet={wallet} lottery={lottery} />
                </>
              }

              {winner && isUserWinner && 
                <>
                <button className='modalButton' onClick={openClaimModal}>Claim</button>
                <ClaimModal isOpen={isClaimModalOpen} closeModal={closeClaimModal} wallet={wallet} lottery={lottery} />
                </>
              }

            </div>
            </>: 
            <label className="conncet-wallet-msg"> Wallet is not connected </label>}
        </div>
    </div>
  );
}

export default SelectedLottery;