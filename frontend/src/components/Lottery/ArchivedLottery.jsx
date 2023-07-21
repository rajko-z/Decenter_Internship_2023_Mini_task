import { useEffect } from "react"
import "./Lottery.scss"

const ArchivedLottery = ({ archivedLottery }) => {

    const { contractAddress, protocol, tokenSymbol, lastTVL, lastTVLUSD, yieldUSD, endDate, winner } = archivedLottery
    const achievedYield = archivedLottery.yield?.toFixed(2)

    useEffect(() => {
        console.log("ola")
        console.log("archivedLottery", archivedLottery)
    }, [])

    const protocolImage = (protocol) => {
        if (protocol === "Aave V3") {
            return "/aave-logo.png"
        }
    }
    const tokenImage = (tokenSymbol) => {
        return "/" + tokenSymbol + ".png";
    }

    const convertUnixTimestampToDate = () => {
        const date = new Date(endDate * 1000);
        return date.toLocaleString();
    }

    return (
        <div className="one-lottery">
            <div className="oneLotteryName">
                <img className='imageLogo' src={protocolImage(protocol)} alt={protocol}/> 
                {contractAddress}
                <img className='imageLogo' src={tokenImage(tokenSymbol)} alt={tokenSymbol}/> 
            </div>
            <div className="oneLotteryLine">
                <div className="last-tvl">{`Last TVL: ${lastTVL} ${tokenSymbol} (${lastTVLUSD?.toFixed(2)} $)`}</div>
            </div>
            <div className="oneLotteryLine">
                <div className="yield">{`Yield: ${achievedYield} ${tokenSymbol} (${yieldUSD?.toFixed(2)} $)`}</div>
            </div>
            <div className="oneLotteryLine">
                <div className="winner">{`Winner: ${winner}`}</div>
            </div>
            <div className="oneLotteryLine">
                <div className="end-date">{`Ended on: ${convertUnixTimestampToDate()}`}</div>
            </div>
        </div>
    )
}

export default ArchivedLottery;