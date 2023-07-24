import Modal from 'react-modal';
import { getLotteryByAddress } from '../../providers/LotteryProvider';
import { withdrawMoneyFromLottery } from '../../providers/LotteryProvider';
import React, { useState, useEffect } from 'react';
import './LotteryModal.scss';

const WithdrawModal = ({ isOpen, closeModal, lottery, setIsUserParticipating}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [myAmount, setAmount] = useState(0)
  const [myAmountUSD, setAmountUSD] = useState(0)

  const { contractAddress, tokenSymbol, endDate }  = lottery

  // deposit money and close modal
  const handleWithdrawal = async () => {
    setIsLoading(true)
    const res = await withdrawMoneyFromLottery(window.ethereum.selectedAddress, contractAddress)

    setIsUserParticipating(!res)
    setIsLoading(false)
    closeModal()
  };

  const convertUnixTimestampToDate = () => {
    const date = new Date(endDate * 1000);
    return date.toLocaleString();
  }

  useEffect(() => {
    const fetchData = async () => {
      const lott = await getLotteryByAddress(contractAddress)
      console.log('lott', lott)
      setAmount(lott.myAmount)
      // const result = await tokenToUSD(lott.myAmount, tokenSymbol);
      setAmountUSD(lott.myAmountUSD);

      console.log('amount: ', lott.myAmountUSD)
    }
    fetchData();
  }, [])

  return (
    <Modal className='lotteryModal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Withdraw Modal">
      {isLoading ? 
        <><div className='loading'>Loading...</div> <br></br> <div className='loader'></div></> : (
        <>
        <h1 className='modalName'>Withdraw Money</h1>
        <div className='modal-card'>

          <div className='modalState'>
              <label className='modalLabel'> <h3>You have {myAmount} {tokenSymbol} / {myAmountUSD?.toFixed(2)}$ </h3></label>
              <br></br>
              <label className='modalLabel'> Lottery End Date: {convertUnixTimestampToDate()}</label>
          </div>

          <div className='flexRowDiv'>
              <button className='modalButton' onClick={handleWithdrawal}>Withdraw</button>
              <button className='modalButton' onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </>
      )}
    </Modal>
  );
};

export default WithdrawModal;
