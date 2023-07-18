package config

import (
	"backend/model"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var database *gorm.DB
var err error

func DatabaseInit() {
	host := "localhost"
	user := "root"
	password := "root"
	dbName := "no_loss_lottery"
	port := 3306
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, port, dbName)

	database, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = database.AutoMigrate(&model.Lottery{}, &model.UserLottery{})
	if err != nil {
		panic(err)
	}
}

func DB() *gorm.DB {
	return database
}
