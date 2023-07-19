package main

import (
	"backend/config"
	"backend/listener"
	"github.com/labstack/echo/v4"
)

func main() {
	config.DatabaseInit()
	e := echo.New()

	//lotteryRoute := e.Group("/lottery")
	//lotteryRoute.POST("", service.CreateLottery)
	//lotteryRoute.PUT("", service.DepositToLottery)
	//lotteryRoute.GET("", service.GetAllActiveLotteries)
	//lotteryRoute.GET("/:address", service.GetAllLotteriesForUser)
	//lotteryRoute.DELETE("/:address/:id", service.WithdrawFromLottery)

	go listener.ListenFundsDeposited()
	go listener.ListenFundsWithDrawn()
	go listener.ListenLotteryCreated()

	e.Logger.Fatal(e.Start(":8080"))
}
