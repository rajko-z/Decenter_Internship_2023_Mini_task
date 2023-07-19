import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { depositMoney } from '../../providers/LotteryProvider';
import { getUSDValue } from '../../providers/OracleProvider'; 

import './LotteryModal.scss';

const DepositModal = ({ isOpen, closeModal, lottery, wallet }) => {

  const [amount, setAmount] = useState(0);
  const [amountUSD, setAmountUSD] = useState(0);
  const token = lottery.tokenName

  // deposit money and close modal
  const handleDeposit = async () => {
    await depositMoney(amount, wallet);
    closeModal();
  };

  const tokenImage = (token) => {
      if (token === 'DAI')
        return "/DAI.png"
      else if (token === 'USDC')
        return "/USDC.png"
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUSDValue(amount, token);
      setAmountUSD(result);
    }
    fetchData();
  }, [amount, token])

  return (
    <Modal className='lotteryModal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Deposit Modal">
      <h1>Deposit Money</h1>
      <div className='modal-card'>

      <div className='modalState'>
          <label className='modalLabel'> Amount </label>
          <div className='flexRowDivDeposit'>
            <input className='modalInput' type="number" step="any" placeholder="0.0"
                onChange={e => setAmount(e.target.value)} required/>
            <label className='modalLabel'> {token} </label>
            <img className='modalToken' src={tokenImage(token)} alt={token}></img>

          </div>
          <div>
              <h3 className='deposit-modal-usd-amount'>{`${amountUSD.toFixed(4)}$`}</h3>
          </div>
        </div>

        <div className='flexRowDiv'>
          <button className='modalButton' onClick={handleDeposit}>Deposit</button>
          <button className='modalButton' onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DepositModal;
