package service

import "backend/model"

type LotteryService interface {
	CreateLottery(lotteryAddress string, name string, protocolId uint, tokenAddress string, endDate uint, minAmountToDeposit uint)
	DepositToLottery(lotteryAddress string, userAddress string, updatedUserBalance uint, updatedTokens uint)
	WithdrawFromLottery(lotteryAddress string, userAddress string, updatedTokens uint)
	EndLottery(lotteryAddress string, winnerAddress string, totalYield uint)
	GetAllEndedLotteries() []model.Lottery
}
