import React, { useState, useEffect } from 'react';

const SelectedLottery = ({ lottery, unselectLottery }) => {

    const { lotteryName, protocol, tokenName, currentAmount, expectedYield, APY, endDate, currPage } = lottery;
    const tokenImage = require(`../../../public/${tokenName}.png`).default;

    const buttonText = () => {
        let text
        switch (currPage) {
            case 'all': text = "Deposit"; break;
            case 'my-active': text = "Withdraw"; break;
            case 'my-past': text = "Claim"; break;
            default: text = "Participate";
        }
        return text
    }

    const handleOnClick = () => {
        switch (currPage) {
            case 'all': break;
            case 'my-active': break;
            case 'my-past': break;
            default: break;
        }
    }

    return (
        <div className="one-lottery">
            <div className="name">{lotteryName}</div>
            <div className="line">
                <div className="protocol">{protocol}</div>
                <div className="token">
                <div className="token-name">{tokenName}</div>
                <img className="token-image" src={tokenImage} alt="Token" />
                </div>
            </div>
            <div className="line">
                <div className="label">Current Amount:</div>
                <div className="current-amount">{currentAmount}</div>
            </div>
            <div className="line">
                <div className="label">Expected Earnings:</div>
                <div className="expected-earnings">{expectedYield}</div>
            </div>
            <div>
                <div className="end-date">{endDate}</div>
            </div>
            { currPage === 'no-wallet'? <div className="no-wallet"> Please connect your wallet to participate in the lottery </div> :
                                        <button onClick>{buttonText()}</button>}
        </div>
  );
}

export default SelectedLottery;