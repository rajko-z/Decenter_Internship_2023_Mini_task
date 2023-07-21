package db

import (
	dbgorm "backend/db/gorm"
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"os"
)

var database *gorm.DB

func DatabaseInit() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load env file")
	}

	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, port, dbName)

	database, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	err = database.AutoMigrate(&dbgorm.DBLottery{}, &dbgorm.DBUserLottery{})
	if err != nil {
		log.Fatal("Database migration failed")
	}
}

func DB() *gorm.DB {
	return database
}
