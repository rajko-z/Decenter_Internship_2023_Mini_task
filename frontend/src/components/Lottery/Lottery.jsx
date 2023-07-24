import { useNavigate } from 'react-router-dom'
import './Lottery.scss'

const Lottery = ({lottery}) => {

    const navigate = useNavigate();
    const { contractAddress, name, protocol, tokenSymbol, endDate, tvl, tvlUSD, currentYield, currentYieldUSD } = lottery

    const handleOnClick = () => {
        return navigate(`/selected-lottery/${contractAddress}`, {state:{lottery}})
    }

    const protocolImage = (protocol) => {
        if (protocol === "Aave V3") {
            return "/aave-logo.png"
        }
    }
    const tokenImage = (tokenSymbol) => {
        return "/" + tokenSymbol + ".png"
    }

    const convertUnixTimestampToDate = () => {
        const date = new Date(endDate * 1000);
        return date.toLocaleString();
    }

    return (
        <button className="oneLotteryButton" onClick={handleOnClick}>
            <div className="one-lottery">
                <div className="oneLotteryName">
                    <img className='imageLogo' src={protocolImage(protocol)} alt={protocol}/> 
                    {name}
                    <img className='imageLogo' src={tokenImage(tokenSymbol)} alt={tokenSymbol}/> 
                </div>
                <div className="oneLotteryLine">
                    <div className="current-amount">{`TVL: ${tvl} ${tokenSymbol} (${tvlUSD?.toFixed(2)} $)`}</div>
                </div>
                <div className="oneLotteryLine">
                    <div className="expected-yield">{`Current Yield: ${currentYield?.toFixed(2)} ${tokenSymbol}`}</div>
                </div>
                <div className="oneLotteryLine">
                    <div className="expected-yield">{`In USD ${currentYieldUSD?.toFixed(2)} $`}</div>
                </div>
                <div>
                    <div className="end-date">{convertUnixTimestampToDate()}</div>
                </div>
            </div>
        </button>
    );
}

export default Lottery;