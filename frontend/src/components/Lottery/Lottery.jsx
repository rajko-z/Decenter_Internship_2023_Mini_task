import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Lottery.scss'

const Lottery = ({lottery, currPage, wallet}) => {

    const navigate = useNavigate();
    const { id, name, protocol, tokenName, currentAmount, expectedYield, APY, endDate, winner, currentAmountUSD } = lottery

    const handleOnClick = () => {
        return navigate(`/selected-lottery/${id}`, {state:{lottery, currPage, wallet}})
    }

    const protocolImage = (protocol) => {
        if (protocol === "Aave") {
            return "/aave-logo.png"
        }
    }
    const tokenImage = (tokenName) => {
        return "/" + tokenName + ".png"
    }

    return (
        <button className="oneLotteryButton" onClick={handleOnClick}>
            <div className="one-lottery">
                <div className="oneLotteryName">
                    <img className='imageLogo' src={protocolImage(protocol)} alt={protocol}/> 
                    {name}
                    <img className='imageLogo' src={tokenImage(tokenName)} alt={tokenName}/> 
                </div>
                <div className="oneLotteryLine">
                    <div className="current-amount">{`TVL: ${currentAmount} ${tokenName} (${currentAmountUSD.toFixed(2)} $)`}</div>
                </div>
                <div className="oneLotteryLine">
                    <div className="apy">{`APY: ${APY}%`}</div>
                </div>
                <div className="oneLotteryLine">
                    <div className="expected-yield">{`Expected Yield: ${expectedYield}`}</div>
                </div>
                <div>
                    <div className="end-date">{endDate}</div>
                </div>
            </div>
        </button>
    );
}

export default Lottery;