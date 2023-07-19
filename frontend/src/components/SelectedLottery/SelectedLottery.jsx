import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SelectedLottery = ({}) => {

  const location = useLocation();
  const { lottery } = location.state || {}; // Access the lottery prop from location.state

  if (!lottery) {
    return <div> Loading.. .</div>;
  } 

  const { id, name, protocol, tokenName, currentAmount, expectedYield, APY, endDate, currentAmountUSD } = lottery;

   

    // const buttonText = () => {
    //     let text
    //     switch (currPage) {
    //         case 'all': text = "Deposit"; break;
    //         case 'my-active': text = "Withdraw"; break;
    //         case 'my-past': text = "Claim"; break;
    //         default: text = "Participate";
    //     }
    //     return text
    // }

    // const handleOnClick = () => {
    //     switch (currPage) {
    //         case 'all': break;
    //         case 'my-active': break;
    //         case 'my-past': break;
    //         default: break;
    //     }
    // }

  return (
    <div className="selected-lottery">
      <div className="name">{name}</div>
        <div className="line">
            <div className="protocol">{protocol}</div>
            <div className="token-name">{tokenName}</div>
        </div>
        <div className="line">
            <div className="current-amount">{`In lottery: ${currentAmount}  `}</div>
            <div className="current-amount-usd">{`($${currentAmountUSD.toFixed(2)})`}</div>
        </div>
        <div className="line">
            <div className="apy">{`APY: ${APY}%`}</div>
        </div>
        <div className="line">
            <div className="expected-yield">{`Expected Yield: ${expectedYield}`}</div>
        </div>
        <div>
            <div className="end-date">{endDate}</div>
        </div>
    </div>
  );
}

export default SelectedLottery;