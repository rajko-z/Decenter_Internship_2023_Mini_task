import React, { useState } from 'react';
import Modal from 'react-modal';
import { withdrawMoney } from '../../providers/LotteryProvider';

import './LotteryModal.scss';

const WithdrawModal = ({ isOpen, closeModal, wallet, lottery }) => {
  const [amount, setAmount] = useState('');
  const { id, name, protocol, tokenName, currentAmount, expectedYield, APY, endDate, completed, currentAmountUSD } = lottery;

  // deposit money and close modal
  const handleWithdrawal = async () => {
    await withdrawMoney(wallet);
    closeModal();
  };


  return (
    <Modal className='lotteryModal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Withdraw Modal">
      <h1 className='modalName'>Withdraw Money</h1>
      <div className='modal-card'>

        <div className='modalState'>
            <label className='modalLabel'> You have {currentAmount} {tokenName}</label>
            <label className='modalLabel'> Which equals to {currentAmountUSD}$</label>
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
