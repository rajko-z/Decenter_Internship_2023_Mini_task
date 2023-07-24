import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { tokenToUSD } from '../../providers/OracleProvider'; 
import { getLotteryReward, withdrawMoneyFromLottery } from '../../providers/LotteryProvider';
import { getLotteryByAddress } from '../../providers/LotteryProvider';

const ClaimModal = ({ isOpen, closeModal, lottery }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [reward, setReward] = useState(0)
    const [rewardUSD, setRewardUSD] = useState(0)
    const [moneyToClaim, setMoneyToClaim] = useState(0)
    const [myAmount, setAmount] = useState(0)
    const [myAmountUSD, setAmountUSD] = useState(0)
    const { contractAddress, tokenSymbol } = lottery

    const handleClaim = async () => {
        setIsLoading(true)
        await withdrawMoneyFromLottery(window.ethereum.selectedAddress, contractAddress)
        setIsLoading(false)
        closeModal()
    }

    // fetch how much money the user can claim (deposit || deposit + reward)
    useEffect(() => {
        const fetchData = async () => {
            const lott = await getLotteryByAddress(contractAddress)
            setAmount(lott.myAmount)
            setAmountUSD(lott.myAmountUSD)

            //get yield amount (reward for the winner)
            let reward = await getLotteryReward(contractAddress, tokenSymbol)
            setReward(reward)
            let rewardUSD = await tokenToUSD(reward, tokenSymbol)
            setRewardUSD(rewardUSD)

            setMoneyToClaim(myAmountUSD + rewardUSD)
        }

        fetchData()
    }, [])

    return (
        <Modal className='lotteryModal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Claim Modal">
        {isLoading ? 
        <><div className='loading'>Loading...</div> <div className='loader'></div></> : (
        <>
            <h1 className='modalName'>Claim Money</h1>
            <div>
                <div className='modalState'>
                    <label className='modalLabel'> <p style={{color: 'green'}}>Congratulations! You are the winner </p></label>
                    <label className='modalLabel'> You have deposited {myAmount} {tokenSymbol}, which is {`${myAmountUSD?.toFixed(4)}$`}</label>
                    <label className='modalLabel'> The reward for this lottery was {reward} {tokenSymbol}, which is {`${rewardUSD?.toFixed(4)}$`}</label>
                    <br></br>
                    <label className='modalLabel'> <h2>You can claim {`${moneyToClaim?.toFixed(4)}$`}</h2></label>
                </div>

                <div className='flexRowDiv'>
                    <button className='modalButton' onClick={handleClaim}>Claim</button>
                    <button className='modalButton' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
        )}
        </Modal>
    )
}

export default ClaimModal;