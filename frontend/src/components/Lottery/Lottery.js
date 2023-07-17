import { getTokenPrice } from '../../providers/OracleProvider.js'

const Lottery = (props) => {

    let lotteryName = props['lotteryName']
    let protocol = props['protocol']
    let tokenName = props['tokenName']
    let currentAmount = props['currentAmount']
    let expectedYield = props['expectedYield']
    let APY = props['APY']
    let endDate = props['endDate']

    const tokenImage = require(`../../../public/${tokenName}.png`).default;
    const currentAmountUSD = convertTokenToUSD(currentAmount, tokenName)

    const convertTokenToUSD = async (currentAmount, tokenName) => {
        let tokenPrice = await getTokenPrice(tokenName)
        return currentAmount * tokenPrice
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
            {/* <button className="button" onClick={onClick}>
                Click Me
            </button> */}
        </div>
  );
}

export default Lottery;