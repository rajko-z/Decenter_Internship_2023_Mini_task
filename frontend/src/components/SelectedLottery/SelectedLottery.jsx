import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLotteryByAddress } from '../../providers/LotteryProvider';
import { getExpectedPrice } from '../../providers/APYInfoProvider';
import DepositModal from '../modals/DepositModal';
import WithdrawModal from '../modals/WithdrawModal';
import ClaimModal from '../modals/ClaimModal';

import './SelectedLottery.scss';

const SelectedLottery = ({}) => {
  const location = useLocation();
  const { lottery, wallet } = location.state || {}                    // Access the lottery prop from location.state
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);          // State to control the deposit modal
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);        // State to control the withdraw modal
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);              // State to control the claim modal
  const [isUserParticipating, setIsUserParticipating] = useState(false);
  const [lotteryIsAcive, setLotteryIsActive] = useState(false);                 //active if winner has not been chosen yet
  const [isUserWinner, setIsUserWinner] = useState(false);

  // lottery data from the blockchain
  const [name, setName] = useState('');
  const [protocol, setProtocol] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tvl, setTvl] = useState(0);
  const [tvlUSD, setTvlUSD] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [currentYield, setCurrentYield] = useState(0);
  const [currentYieldUSD, setCurrentYieldUSD] = useState(0);
  const [myAmount, setMyAmount] = useState(0);
  const [winner, setWinner] = useState('');
  const [expectedPrize, setExpectedPrize] = useState(0);

  const openDepositModal = () => {setIsDepositModalOpen(true)}
  const closeDepositModal = () => {setIsDepositModalOpen(false)}
  const openWithdrawModal = () => {setIsWithdrawModalOpen(true)}
  const closeWithdrawModal = () => {setIsWithdrawModalOpen(false)}
  const openClaimModal = () => {setIsClaimModalOpen(true)}
  const closeClaimModal = () => {setIsClaimModalOpen(false)}

  const convertUnixTimestampToDate = () => {
      const date = new Date(endDate * 1000);
      return date.toLocaleString();
  }

  useEffect(() => {

    const fetchData = async () => {

      const result = await getLotteryByAddress(lottery.contractAddress)
      console.log("result", result)
      setName(result.name)
      setProtocol(result.protocol)
      setTokenSymbol(result.tokenSymbol)
      setTvl(result.tvl)
      setTvlUSD(result.tvlUSD)
      setEndDate(result.endDate)
      setCurrentYield(result.currentYield)
      setCurrentYieldUSD(result.currentYieldUSD)
      setMyAmount(result.myAmount)
      setWinner(result.winner)
  
      setLotteryIsActive(result.winner.startsWith('0x0000000000000000000000000000000000000000'));
      setIsUserParticipating(result.myAmount > 0.0)
  
      if (result.winner !== null && result.winner !== '0x0'){
        setIsUserWinner(wallet.toLowerCase() === result.winner.toLowerCase())
      }

      const expPrize = await getExpectedPrice(result.protocol, result.tokenSymbol, result.tvlUSD, result.currentYieldUSD, result.endDate)
      console.log("ZASTO?", expPrize)
      setExpectedPrize(expPrize)
    }

    fetchData()
  }, [])

  if (!lottery) {
    return <div> Loading selected lottery.. .</div>;
  } 

  return (
    <div className="selected-lottery">
      <div className="selectedLotteryName"><h3>{name}</h3><h4>Expected prize: {expectedPrize?.toFixed(2)}$</h4></div>
        <div className="selectedLotteryLine">
            <div className="protocol">Protocol: {protocol}</div>
            <div className="token-name">Token: {tokenSymbol}</div>
        </div>
        <div className="selectedLotteryLine">
            <div className="selectedLottery current-amount">{`In lottery: ${tvl} ${tokenSymbol} (${tvlUSD?.toFixed(2)}$)`}</div>
        </div>
        <div className="selectedLotteryLine">
            <div className="expected-yield">{`Current Yield: ${currentYield} (${currentYieldUSD?.toFixed(2)}$)`}</div>
        </div>
        <div>
            <div className="end-date">End Date: {convertUnixTimestampToDate()}</div>
        </div>
        <div>
          {wallet? 
            <>
            <div className='flexRowDiv'>
              {lotteryIsAcive &&
                <>
                <button className='modalButton' onClick={openDepositModal}>Deposit</button>
                <DepositModal isOpen={isDepositModalOpen} 
                              closeModal={closeDepositModal} 
                              lottery={lottery} 
                              wallet={wallet}/>
                </>
              }
              {((lotteryIsAcive && isUserParticipating) || (!lotteryIsAcive && !isUserWinner)) &&
                <>
                <button className='modalButton' onClick={openWithdrawModal}>Withdraw</button>
                <WithdrawModal isOpen={isWithdrawModalOpen} closeModal={closeWithdrawModal} wallet={wallet} lottery={lottery}/>
                </>
              }

              {!lotteryIsAcive && isUserWinner && 
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