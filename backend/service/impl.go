package service

import (
	"backend/db"
	"backend/model"
)

type LotteryImpl struct {
	ULRepo db.UserLotteryRepo
	LRepo  db.LotteryRepo
}

func (li LotteryImpl) CreateLottery(lotteryAddress string, name string, protocolId uint, tokenSymbol string, tokenDecimals uint, endDate uint, minAmountToDeposit uint) {
	li.LRepo.CreateLottery(model.Lottery{
		Address:       lotteryAddress,
		Name:          name,
		ProtocolId:    protocolId,
		TokenSymbol:   tokenSymbol,
		TokenDecimals: tokenDecimals,
		MinTokens:     minAmountToDeposit,
		EndDate:       endDate,
	})
}

func (li LotteryImpl) DepositToLottery(lotteryAddress string, userAddress string, updatedUserBalance uint, updatedTokens uint) {
	li.LRepo.UpdateFunds(lotteryAddress, updatedTokens)
	exists, _ := li.ULRepo.Exists(userAddress, lotteryAddress)

	if exists {
		li.ULRepo.UpdateEntry(userAddress, lotteryAddress, updatedUserBalance)
	} else {
		li.ULRepo.CreateEntry(userAddress, lotteryAddress, updatedUserBalance)
	}
}

func (li LotteryImpl) WithdrawFromLottery(lotteryAddress string, userAddress string, updatedTokens uint) {
	li.ULRepo.DeleteEntry(userAddress, lotteryAddress)
	li.LRepo.UpdateFunds(lotteryAddress, updatedTokens)
}

func (li LotteryImpl) EndLottery(lotteryAddress string, winnerAddress string, totalYield uint) {
	li.EndLottery(lotteryAddress, winnerAddress, totalYield)
}

func (li LotteryImpl) GetAllEndedLotteries() []model.Lottery {
	lotteries, _ := li.LRepo.FindAllEnded()
	return lotteries
}
