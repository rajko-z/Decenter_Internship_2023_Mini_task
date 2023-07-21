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

func (li LotteryImpl) CreateLottery(lotteryAddress string, name string, protocolId uint, tokenAddress string, endDate uint, minAmountToDeposit uint) {
	err := li.LRepo.CreateLottery(model.Lottery{
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

func (li LotteryImpl) DepositToLottery(lotteryAddress string, userAddress string, updatedUserBalance uint, updatedTokens uint) {
	err := li.LRepo.UpdateFunds(lotteryAddress, updatedTokens)
	if err != nil {
		log.Fatal(err)
		return
	}

	exists, err := li.ULRepo.Exists(userAddress, lotteryAddress)
	if err != nil {
		log.Fatal(err)
		return
	}

	if exists {
		err := li.ULRepo.UpdateEntry(userAddress, lotteryAddress, updatedUserBalance)
		if err != nil {
			log.Fatal(err)
			return
		}
	} else {
		err := li.ULRepo.CreateEntry(userAddress, lotteryAddress, updatedUserBalance)
		if err != nil {
			log.Fatal(err)
			return
		}
	}

	log.Println("User " + userAddress + " deposited to lottery " + lotteryAddress)
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
		return
	}

	log.Println("User " + userAddress + " withdrew from lottery " + lotteryAddress)
}

func (li LotteryImpl) EndLottery(lotteryAddress string, winnerAddress string, totalYield uint) {
	err := li.LRepo.EndLottery(lotteryAddress, winnerAddress, totalYield)
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Println("Lottery " + lotteryAddress + " ended")
}

func (li LotteryImpl) GetAllEndedLotteries() []model.Lottery {
	lotteries, _ := li.LRepo.FindAllEnded()
	return lotteries
}
