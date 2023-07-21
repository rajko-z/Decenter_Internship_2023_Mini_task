package controller

import (
	"backend/listener"
	"backend/service"
	"backend/transactions"
	"github.com/labstack/echo/v4"
	"net/http"
)

type LotteryController struct {
	LotServ service.LotteryService
	Lis     listener.Listener
}

func (lotCon LotteryController) GetAllFinishedLotteries(context echo.Context) error {
	lotteries := lotCon.LotServ.GetAllEndedLotteries()
	return context.JSON(http.StatusOK, lotteries)
}

func (lotCon LotteryController) ManuallyEndLottery(context echo.Context) error {
	lotteryAddress := context.Param("address")
	go lotCon.Lis.ListenWinnerChosen(lotteryAddress)
	transactions.TransactEndLottery(lotteryAddress)
	return context.JSON(http.StatusOK, "Lottery lotteryAddress: "+lotteryAddress+" ended")
}
