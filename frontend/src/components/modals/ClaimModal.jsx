import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getUSDValue } from '../../providers/OracleProvider'; 
import { getUsersMoneyInLottery, getLotteryReward, claimMoney } from '../../providers/LotteryProvider';

const ClaimModal = ({ isOpen, closeModal, wallet, lottery }) => {
  
    const [amount, setAmount] = useState(0)
    const [amountUSD, setAmountUSD] = useState(0)
    const [reward, setReward] = useState(0)
    const [rewardUSD, setRewardUSD] = useState(0)
    const lotteryId = lottery.id
    const tokenName = lottery.tokenName
    const isWinner = lottery.winner === wallet

    const handleClaim = async () => {
        await claimMoney(lotteryId, wallet)
        closeModal()
    }

    // fetch how much money the user can claim (deposit || deposit + reward)
    useEffect(() => {
        const fetchData = async () => {
            const deposit = await getUsersMoneyInLottery(wallet)
            setAmount(deposit)
            const depositUSD = await getUSDValue(deposit, tokenName)
            setAmountUSD(depositUSD)

            //get yield amount (reward for the winner)
            let reward = await getLotteryReward(lotteryId)
            setReward(reward)
            let rewardUSD = await getUSDValue(reward, tokenName)
            setRewardUSD(rewardUSD)
        }

        fetchData()
    }, [])

    return (
        <Modal className='lotteryModal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Claim Modal">
        <h1 className='modalName'>Claim Money</h1>
        <div>
            <div className='modalState'>
                <label className='modalLabel'> You are {!isWinner && 'not'} the winner </label>
                <label className='modalLabel'> You have deposited {amount} {tokenName}, which is {`${amountUSD.toFixed(4)}$`}</label>
                <label className='modalLabel'> The reward for this lottery was {reward}, which is {`${rewardUSD.toFixed(4)}$`}</label>
            </div>

            <div className='flexRowDiv'>
                <button className='modalButton' onClick={handleClaim}>Claim</button>
                <button className='modalButton' onClick={closeModal}>Cancel</button>
            </div>
        </div>
        </Modal>
    )
}

export default ClaimModal;