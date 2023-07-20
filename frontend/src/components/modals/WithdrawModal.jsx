import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getUSDValue } from '../../providers/OracleProvider'; 
import { getUsersMoneyInLottery, withdrawMoney } from '../../providers/LotteryProvider';
import { Backdrop } from '@mui/material';

import './LotteryModal.scss';

const WithdrawModal = ({ isOpen, closeModal, wallet, lottery }) => {

  const [amount, setAmount] = useState(0);
  const [amountUSD, setAmountUSD] = useState(0);
  const lotteryId = lottery.id
  const tokenName = lottery.tokenName
  const endDate = lottery.endDate

  // deposit money and close modal
  const handleWithdrawal = async () => {
    await withdrawMoney(wallet);
    closeModal();
  };

  //get the amount of money user has in lottery
  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsersMoneyInLottery(wallet);
      setAmount(result);
      const resultUSD = await getUSDValue(result, tokenName);
      setAmountUSD(resultUSD);
    }

    fetchData(lotteryId, wallet)
  }, [])

  return (
    <Modal className='lotteryModal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Withdraw Modal">
      <h1 className='modalName'>Withdraw Money</h1>
      <div className='modal-card'>

        <div className='modalState'>
            <label className='modalLabel'> <h3>You have {amount} {tokenName} / {amountUSD.toFixed(4)}$ </h3></label>
            <br></br>
            <label className='modalLabel'> Lottery End Date: {endDate}</label>
        </div>

        <div className='flexRowDiv'>
            <button className='modalButton' onClick={handleWithdrawal}>Withdraw</button>
            <button className='modalButton' onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
