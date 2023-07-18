import { useEffect } from 'react'
import { getTokenPrice } from '../../providers/OracleProvider.js'
import './Lottery.css'

const Lottery = ({onClick, lottery}) => {

    const { lotteryName, protocol, tokenName, currentAmount, expectedYield, APY, endDate, currentAmountUSD } = lottery

    useEffect(() => {
        console.log(lottery)

    }, [])

    return (
        <div className="one-lottery">
            <div className="name">{lotteryName}</div>
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
            <button className="view-lottery"> View lottery </button>
        </div>
    );
}

export default Lottery;