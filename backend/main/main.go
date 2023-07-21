package main

import (
	"backend/controller"
	"backend/db"
	dbgorm "backend/db/gorm"
	"backend/listener"
	"backend/service"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	lController, lListener := initialize()

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	lotteryRoute := e.Group("/lotteries")
	lotteryRoute.GET("/history", lController.GetAllFinishedLotteries)

	go lListener.ListenLotteryCreated()

	e.Logger.Fatal(e.Start(":8080"))
}

func initialize() (controller.LotteryController, listener.Listener) {
	db.DatabaseInit()
	lRepo := dbgorm.LotteryGorm{DB: db.DB()}
	ulRepo := dbgorm.UserLotteryGorm{DB: db.DB()}
	serv := service.LotteryImpl{
		ULRepo: ulRepo,
		LRepo:  lRepo,
	}
	lis := listener.Listener{
		LotServ: serv,
	}
	ctrl := controller.LotteryController{
		LotServ: serv,
		Lis:     lis,
	}

	return ctrl, lis
}
