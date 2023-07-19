package listener

import (
	"backend/contracts"
	"backend/service"
	"context"
	"fmt"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func ListenFundsWithDrawn() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	RPC := os.Getenv("RPC")
	ContractAddress := os.Getenv("CONTRACT_ADDRESS")

	contractAddress := common.HexToAddress(ContractAddress)

	client, err := ethclient.Dial(RPC)
	if err != nil {
		log.Fatal(err)
	}

	lotteries, err := contracts.NewLotteries(contractAddress, client)
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()
	opts := &bind.WatchOpts{Context: ctx}
	eventsChannel := make(chan *contracts.LotteriesFundsWithdrawn)
	subscription, err := lotteries.WatchFundsWithdrawn(opts, eventsChannel)
	if err != nil {
		log.Fatal(err)
	}

	for {
		select {
		case err := <-subscription.Err():
			log.Fatal(err)
		case event := <-eventsChannel:
			fmt.Println(event)
			service.WithdrawFromLottery()
		}
	}
}

func ListenFundsDeposited() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	RPC := os.Getenv("RPC")
	ContractAddress := os.Getenv("CONTRACT_ADDRESS")

	contractAddress := common.HexToAddress(ContractAddress)

	client, err := ethclient.Dial(RPC)
	if err != nil {
		log.Fatal(err)
	}

	lotteries, err := contracts.NewLotteries(contractAddress, client)
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()
	opts := &bind.WatchOpts{Context: ctx}
	eventsChannel := make(chan *contracts.LotteriesFundsDeposited)
	subscription, err := lotteries.WatchFundsDeposited(opts, eventsChannel)
	if err != nil {
		log.Fatal(err)
	}

	for {
		select {
		case err := <-subscription.Err():
			log.Fatal(err)
		case event := <-eventsChannel:
			fmt.Println(event)
			service.DepositToLottery()
		}
	}
}

func ListenLotteryCreated() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	RPC := os.Getenv("RPC")
	ContractAddress := os.Getenv("CONTRACT_ADDRESS")

	contractAddress := common.HexToAddress(ContractAddress)

	client, err := ethclient.Dial(RPC)
	if err != nil {
		log.Fatal(err)
	}

	lotteries, err := contracts.NewLotteries(contractAddress, client)
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()
	opts := &bind.WatchOpts{Context: ctx}
	eventsChannel := make(chan *contracts.LotteriesLotteryCreated)
	subscription, err := lotteries.WatchLotteryCreated(opts, eventsChannel)
	if err != nil {
		log.Fatal(err)
	}

	for {
		select {
		case err := <-subscription.Err():
			log.Fatal(err)
		case event := <-eventsChannel:
			fmt.Println(event)
			service.CreateLottery()
		}
	}
}
