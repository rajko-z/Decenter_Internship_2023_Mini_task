package controller

import (
	"backend/config"
	"backend/model"
	"github.com/labstack/echo/v4"
	"net/http"
)

func CreateLottery(context echo.Context) error {
	db := config.DB()

	l := new(model.Lottery)
	if err := context.Bind(l); err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}

		return context.JSON(http.StatusInternalServerError, data)
	}

	lottery := &model.Lottery{
		Name:         l.Name,
		Token:        l.Token,
		Protocol:     "Aave",
		TokensInPool: 0,
		Decimals:     l.Decimals,
		Apy:          l.Apy,
		EndTime:      l.EndTime,
		Active:       true,
	}

	if err := db.Debug().Create(&lottery).Error; err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}

		return context.JSON(http.StatusInternalServerError, data)
	}

	return context.JSON(http.StatusCreated, lottery)
}

func GetAllActiveLotteries(context echo.Context) error {
	db := config.DB()

	var lotteries []model.Lottery
	db.Debug().Find(&lotteries, "active = ?", true)

	return context.JSON(http.StatusOK, lotteries)
}

func GetAllLotteriesForUser(context echo.Context) error {
	db := config.DB()
	address := context.Param("address")

	var lotteries []model.Lottery
	db.Debug().
		Model(&model.Lottery{}).
		Joins("JOIN user_lotteries on user_lotteries.lottery_id = lotteries.id").
		Find(&lotteries, "user_address = ?", address)

	return context.JSON(http.StatusOK, lotteries)
}

func DepositToLottery(context echo.Context) error {
	db := config.DB()

	ul := new(model.UserLottery)
	if err := context.Bind(ul); err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}

		return context.JSON(http.StatusInternalServerError, data)
	}

	var lottery model.Lottery
	db.Debug().First(&lottery, "id = ?", ul.LotteryID)
	lottery.TokensInPool += ul.Deposit
	db.Save(&lottery)

	var existingUserLottery model.UserLottery
	exists := db.Debug().
		First(&existingUserLottery, "user_address = ? AND lottery_id = ?", ul.UserAddress, ul.LotteryID).
		RowsAffected == 1
	if exists {
		existingUserLottery.Deposit += ul.Deposit
		db.Save(&existingUserLottery)
		return context.JSON(http.StatusOK, existingUserLottery)
	}

	userLottery := &model.UserLottery{
		UserAddress: ul.UserAddress,
		LotteryID:   ul.LotteryID,
		Deposit:     ul.Deposit,
	}

	if err := db.Debug().Create(&userLottery).Error; err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}

		return context.JSON(http.StatusInternalServerError, data)
	}

	return context.JSON(http.StatusOK, userLottery)
}

func WithdrawFromLottery(context echo.Context) error {
	db := config.DB()
	address := context.Param("address")
	id := context.Param("id")

	var userLottery model.UserLottery
	db.Debug().First(&userLottery, "user_address = ? AND lottery_id = ?", address, id)

	var lottery model.Lottery
	db.Debug().First(&lottery, "id = ?", id)
	lottery.TokensInPool -= userLottery.Deposit
	db.Save(&lottery)

	db.Debug().Delete(&userLottery)

	return context.JSON(http.StatusOK, lottery)
}
