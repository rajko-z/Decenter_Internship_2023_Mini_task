import React, { useState } from 'react';
import Modal from 'react-modal';
import { depositMoney } from '../../providers/LotteryProvider';

const DepositModal = ({ isOpen, closeModal, wallet }) => {
  const [amount, setAmount] = useState('');

  // deposit money and close modal
  const handleDeposit = async () => {
    await depositMoney(amount, wallet);
    closeModal();
  };


  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Deposit Modal">
      <h1>Deposit Money</h1>
      <div className='deposit-modal-card'>

        <label className='deposit-modal-lamount'> Amount </label>
        <div className='flexRowDiv'>
          <input className='input value' type="number" step="any" placeholder="0.0"
              onChange={e => setAmount(e.target.value)} required/>
        </div>

        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DepositModal;
