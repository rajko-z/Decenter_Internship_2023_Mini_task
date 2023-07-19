import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Lottery.css'

const Lottery = ({lottery}) => {

    const navigate = useNavigate();
    const { id, name, protocol, tokenName, currentAmount, expectedYield, APY, endDate, currentAmountUSD } = lottery

    useEffect(() => {
        console.log(lottery)
    }, [])

    const handleOnClick = () => {
    }

    const protocolImage = (protocol) => {
        if (protocol === "Aave") {
            return "/aave-logo.png"
        }
    }

    return (
        <button className="button-lottery" onClick={handleOnClick}>
            <div className="one-lottery">
                <div className="name">
                    <img className='imageLogo' src={protocolImage(protocol)} alt={protocol}/> 
                    {name}
                    <img className='imageLogo' src={protocolImage(protocol)} alt={tokenName}/> 
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
        </button>
    );
}

export default Lottery;