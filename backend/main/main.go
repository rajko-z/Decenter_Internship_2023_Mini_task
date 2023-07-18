package main

import (
	"backend/config"
	"backend/controller"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	lotteryRoute := e.Group("/lottery")
	lotteryRoute.POST("", controller.CreateLottery)
	lotteryRoute.PUT("", controller.DepositToLottery)
	lotteryRoute.GET("", controller.GetAllActiveLotteries)
	lotteryRoute.GET("/:address", controller.GetAllLotteriesForUser)
	lotteryRoute.DELETE("/:address/:id", controller.WithdrawFromLottery)

	config.DatabaseInit()

	e.Logger.Fatal(e.Start(":8080"))
}
