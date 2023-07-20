import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { depositMoneyInLottery } from '../../providers/LotteryProvider';
import { tokenToUSD } from '../../providers/OracleProvider'; 

import './LotteryModal.scss';

const DepositModal = ({ isOpen, closeModal, lottery, wallet }) => {

  const [amount, setAmount] = useState(0);
  const [amountUSD, setAmountUSD] = useState(0);
  const tokenSymbol = lottery.tokenSymbol
  const contractAddress = lottery.contractAddress

  // deposit money and close modal
  const handleDeposit = async () => {
    await depositMoneyInLottery(wallet, contractAddress, amount, tokenSymbol);
    closeModal();
  };

  const tokenImage = (tokenSymbol) => {
      if (tokenSymbol === 'DAI')
        return "/DAI.png"
      else if (tokenSymbol === 'USDC')
        return "/USDC.png"
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await tokenToUSD(amount, tokenSymbol);
      setAmountUSD(result);
    }
    fetchData();
  }, [amount, tokenSymbol])

  return (
    <Modal className='lotteryModal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Deposit Modal">
      <h1>Deposit Money</h1>
      <div className='modal-card'>

      <div className='modalState'>
          <label className='modalLabel'> Amount </label>
          <div className='flexRowDivDeposit'>
            <input className='modalInput' type="number" step="any" placeholder="0.0"
                onChange={e => setAmount(e.target.value)} required/>
            <label className='modalLabel'> {tokenSymbol} </label>
            <img className='modalToken' src={tokenImage(tokenSymbol)} alt={tokenSymbol}></img>

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
