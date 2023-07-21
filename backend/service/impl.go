package service

import (
	"backend/db"
	"backend/model"
	"log"
)

type LotteryImpl struct {
	ULRepo db.UserLotteryRepo
	LRepo  db.LotteryRepo
}

func (li LotteryImpl) CreateLottery(lotteryAddress string, name string, protocolId uint, tokenSymbol string, tokenAddress string, tokenDecimals uint, endDate uint, minAmountToDeposit uint) {
	err := li.LRepo.CreateLottery(model.Lottery{
		Address:       lotteryAddress,
		Name:          name,
		ProtocolId:    protocolId,
		TokenSymbol:   tokenSymbol,
		TokenAddress:  tokenAddress,
		TokenDecimals: tokenDecimals,
		MinTokens:     minAmountToDeposit,
		EndDate:       endDate,
	})
	if err != nil {
		log.Fatal(err)
	}
}

func (li LotteryImpl) DepositToLottery(lotteryAddress string, userAddress string, updatedUserBalance uint, updatedTokens uint) {
	err := li.LRepo.UpdateFunds(lotteryAddress, updatedTokens)
	if err != nil {
		log.Fatal(err)
		return
	}
	exists, _ := li.ULRepo.Exists(userAddress, lotteryAddress)

	if exists {
		err := li.ULRepo.UpdateEntry(userAddress, lotteryAddress, updatedUserBalance)
		if err != nil {
			log.Fatal(err)
		}
	} else {
		err := li.ULRepo.CreateEntry(userAddress, lotteryAddress, updatedUserBalance)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func (li LotteryImpl) WithdrawFromLottery(lotteryAddress string, userAddress string, updatedTokens uint) {
	err := li.ULRepo.DeleteEntry(userAddress, lotteryAddress)
	if err != nil {
		log.Fatal(err)
		return
	}
	err = li.LRepo.UpdateFunds(lotteryAddress, updatedTokens)
	if err != nil {
		log.Fatal(err)
	}
}

func (li LotteryImpl) EndLottery(lotteryAddress string, winnerAddress string, totalYield uint) {
	li.EndLottery(lotteryAddress, winnerAddress, totalYield)
}

func (li LotteryImpl) GetAllEndedLotteries() []model.Lottery {
	lotteries, _ := li.LRepo.FindAllEnded()
	return lotteries
}
