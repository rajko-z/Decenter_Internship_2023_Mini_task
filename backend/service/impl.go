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

func (lotImpl LotteryImpl) CreateLottery(lotteryAddress string, name string, protocolId uint, tokenAddress string, endDate uint, minAmountToDeposit uint) {
	err := lotImpl.LRepo.CreateLottery(model.Lottery{
		Address:      lotteryAddress,
		Name:         name,
		ProtocolId:   protocolId,
		TokenAddress: tokenAddress,
		MinTokens:    minAmountToDeposit,
		EndDate:      endDate,
	})
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Println("Lottery created at address: " + lotteryAddress)
}

func (lotImpl LotteryImpl) DepositToLottery(lotteryAddress string, userAddress string, updatedUserBalance uint, updatedTokens uint) {
	err := lotImpl.LRepo.UpdateFunds(lotteryAddress, updatedTokens)
	if err != nil {
		log.Fatal(err)
		return
	}

	exists, err := lotImpl.ULRepo.Exists(userAddress, lotteryAddress)
	if err != nil {
		log.Fatal(err)
		return
	}

	if exists {
		err := lotImpl.ULRepo.UpdateEntry(userAddress, lotteryAddress, updatedUserBalance)
		if err != nil {
			log.Fatal(err)
			return
		}
	} else {
		err := lotImpl.ULRepo.CreateEntry(userAddress, lotteryAddress, updatedUserBalance)
		if err != nil {
			log.Fatal(err)
			return
		}
	}

	log.Println("User " + userAddress + " deposited to lottery " + lotteryAddress)
}

func (lotImpl LotteryImpl) WithdrawFromLottery(lotteryAddress string, userAddress string, updatedTokens uint) {
	err := lotImpl.ULRepo.DeleteEntry(userAddress, lotteryAddress)
	if err != nil {
		log.Fatal(err)
		return
	}

	err = lotImpl.LRepo.UpdateFunds(lotteryAddress, updatedTokens)
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Println("User " + userAddress + " withdrew from lottery " + lotteryAddress)
}

func (lotImpl LotteryImpl) EndLottery(lotteryAddress string, winnerAddress string, totalYield uint) {
	err := lotImpl.LRepo.EndLottery(lotteryAddress, winnerAddress, totalYield)
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Println("Lottery " + lotteryAddress + " ended")
}

func (lotImpl LotteryImpl) GetAllEndedLotteries() []model.Lottery {
	lotteries, _ := lotImpl.LRepo.FindAllEnded()
	return lotteries
}
