import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { depositMoney } from '../../providers/LotteryProvider';
import { getUSDValue } from '../../providers/OracleProvider'; 

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
    <Modal className='deposit-modal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Deposit Modal">
      <h1>Deposit Money</h1>
      <div className='deposit-modal-card'>

        <label className='deposit-modal-lbl-amount'> Amount </label>
        <div className='flexRowDiv'>
          <input className='deposit-modal-input-amount' type="number" step="any" placeholder="0.0"
              onChange={e => setAmount(e.target.value)} required/>
          <label className='deposit-modal-token'> {token} </label>
          <img className='deposit-modal-token-img' src={tokenImage(token)} alt={token}></img>

        </div>
        <div>
            <h3 className='deposit-modal-usd-amount'>{`$${amountUSD.toFixed(4)}`}</h3>
        </div>

        <button className='deposit-modal-btn-submit' onClick={handleDeposit}>Deposit</button>
        <button className='deposit-modal-btn-close' onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DepositModal;
