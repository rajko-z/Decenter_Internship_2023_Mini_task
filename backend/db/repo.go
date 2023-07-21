package db

import "backend/model"

type UserLotteryRepo interface {
	Exists(userAddress string, lotteryAddress string) (bool, error)
	CreateEntry(userAddress string, lotteryAddress string, deposit uint) error
	UpdateEntry(userAddress string, lotteryAddress string, updatedDeposit uint) error
	DeleteEntry(userAddress string, lotteryAddress string) error
}

type LotteryRepo interface {
	CreateLottery(lottery model.Lottery) error
	UpdateFunds(lotteryAddress string, updatedTokens uint) error
	EndLottery(lotteryAddress string, winnerAddress string, totalYield uint) error
	FindAllEnded() ([]model.Lottery, error)
}
