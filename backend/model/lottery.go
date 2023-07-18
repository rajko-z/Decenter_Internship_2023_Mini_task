package model

import "time"

type UserLottery struct {
	UserAddress string `gorm:"primaryKey"`
	LotteryID   uint   `gorm:"primaryKey"`
	Deposit     uint
}

type Lottery struct {
	ID           uint
	Name         string
	Token        string
	Protocol     string
	TokensInPool uint
	Decimals     uint
	Apy          float64
	EndTime      time.Time
	Active       bool
}
