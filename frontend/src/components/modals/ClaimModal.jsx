import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { claimMoney } from '../../providers/LotteryProvider';

const ClaimModal = ({ isOpen, closeModal, lottery, wallet }) => {

    const [amount, setAmount] = useState(0);
    const [amountUSD, setAmountUSD] = useState(0);
    const lotteryId = lottery.id
    const token = lottery.tokenName

    const handleClaim = async () => {
        await claimMoney(lotteryId, wallet);
        closeModal();
    }

    // fetch how much money the user can claim (deposit || deposit + reward)
    useEffect(() => {

        // const fetchData = async () => {
        //     const result = await 
        // }

        // fetchData()
    }, [])

    return (
        <Modal className='claim-modal' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Claim Modal">
        </Modal>
    )
}