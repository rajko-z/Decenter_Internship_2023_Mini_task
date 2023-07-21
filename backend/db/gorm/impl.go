package dbgorm

import (
	"backend/model"
	"gorm.io/gorm"
)

type DBUserLottery struct {
	gorm.Model
	UserAddress    string `gorm:"primaryKey"`
	LotteryAddress string `gorm:"primaryKey"`
	Deposit        uint
}

type DBLottery struct {
	gorm.Model
	Address       string `gorm:"primaryKey"`
	Name          string
	ProtocolId    uint
	TokenSymbol   string
	TokenAddress  string
	TokenDecimals uint
	TokensInPool  uint
	MinTokens     uint
	Yield         uint
	EndDate       uint
	Active        bool
	Winner        string
}

type UserLotteryGorm struct {
	DB *gorm.DB
}

func (ulg UserLotteryGorm) Exists(userAddress string, lotteryAddress string) (bool, error) {
	res := ulg.DB.First(&DBUserLottery{}, "user_address = ? AND lottery_address = ?", userAddress, lotteryAddress)
	return res.RowsAffected > 0, res.Error
}

func (ulg UserLotteryGorm) CreateEntry(userAddress string, lotteryAddress string, deposit uint) error {
	err := ulg.DB.Create(&DBUserLottery{
		UserAddress:    userAddress,
		LotteryAddress: lotteryAddress,
		Deposit:        deposit,
	}).Error
	return err
}

func (ulg UserLotteryGorm) UpdateEntry(userAddress string, lotteryAddress string, updatedDeposit uint) error {
	var userLottery DBUserLottery
	err := ulg.DB.Model(&userLottery).
		Where("user_address = ? AND lottery_address = ?", userAddress, lotteryAddress).
		Update("deposit", updatedDeposit).Error
	return err
}

func (ulg UserLotteryGorm) DeleteEntry(userAddress string, lotteryAddress string) error {
	err := ulg.DB.Delete(&DBUserLottery{
		UserAddress:    userAddress,
		LotteryAddress: lotteryAddress,
	}).Error
	return err
}

type LotteryGorm struct {
	DB *gorm.DB
}

func (lg LotteryGorm) UpdateFunds(lotteryAddress string, updatedTokens uint) error {
	var lottery DBLottery

	err := lg.DB.First(&lottery, "address = ?", lotteryAddress).Error
	if lottery.Active {
		lottery.TokensInPool = updatedTokens
	}

	lg.DB.Save(&lottery)
	return err
}

func (lg LotteryGorm) EndLottery(lotteryAddress string, winnerAddress string, totalYield uint) error {
	var lottery DBLottery
	err := lg.DB.Model(&lottery).
		Where("address = ?", lotteryAddress).
		Update("winner", winnerAddress).
		Update("active", false).
		Update("yield", totalYield).Error
	return err
}

func (lg LotteryGorm) CreateLottery(lottery model.Lottery) error {
	err := lg.DB.Create(&DBLottery{
		Address:       lottery.Address,
		Name:          lottery.Name,
		ProtocolId:    lottery.ProtocolId,
		TokenSymbol:   lottery.TokenSymbol,
		TokenAddress:  lottery.TokenAddress,
		TokenDecimals: lottery.TokenDecimals,
		TokensInPool:  lottery.TokensInPool,
		MinTokens:     lottery.MinTokens,
		Yield:         lottery.Yield,
		EndDate:       lottery.EndDate,
		Active:        true,
		Winner:        "",
	}).Error
	return err
}

func (lg LotteryGorm) FindAllEnded() ([]model.Lottery, error) {
	var lotteries []DBLottery
	err := lg.DB.Find(&lotteries, "active = ?", false).Error
	if err != nil {
		return nil, err
	}

	var result []model.Lottery
	for _, lottery := range lotteries {
		result = append(result, model.Lottery{
			Address:       lottery.Address,
			Name:          lottery.Name,
			ProtocolId:    lottery.ProtocolId,
			TokenSymbol:   lottery.TokenSymbol,
			TokenDecimals: lottery.TokenDecimals,
			TokensInPool:  lottery.TokensInPool,
			Yield:         lottery.Yield,
			EndDate:       lottery.EndDate,
			Winner:        lottery.Winner,
		})
	}

	if result == nil {
		result = []model.Lottery{}
	}

	return result, nil
}
