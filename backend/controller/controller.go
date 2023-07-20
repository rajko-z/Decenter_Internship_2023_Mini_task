package controller

import (
	"backend/service"
	"github.com/labstack/echo/v4"
	"net/http"
)

type LotteryController struct {
	LS service.LotteryService
}

func (LC LotteryController) GetAllFinishedLotteries(context echo.Context) error {
	lotteries := LC.LS.GetAllEndedLotteries()
	return context.JSON(http.StatusOK, lotteries)
}
