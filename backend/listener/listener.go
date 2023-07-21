package listener

import (
	"backend/contracts"
	"backend/service"
	"backend/transactions"
	"context"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
	"log"
	"os"
	"time"
)

type Listener struct {
	LS service.LotteryService
}

func (l Listener) ListenFundsWithDrawn(address string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	RPC := os.Getenv("RPC")
	contractAddress := common.HexToAddress(address)

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
			l.LS.WithdrawFromLottery(
				address,
				event.User.Hex(),
				uint(event.UpdatedTvl.Uint64()))
		}
	}
}

func (l Listener) ListenFundsDeposited(address string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	RPC := os.Getenv("RPC")

	contractAddress := common.HexToAddress(address)

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
			l.LS.DepositToLottery(
				address,
				event.User.Hex(),
				uint(event.UpdatedUserBalance.Uint64()),
				uint(event.UpdatedTvl.Uint64()))
		}
	}
}

func (l Listener) ListenWinnerChosen(address string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	RPC := os.Getenv("RPC")

	contractAddress := common.HexToAddress(address)

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
	eventsChannel := make(chan *contracts.LotteriesWinnerChosen)
	subscription, err := lotteries.WatchWinnerChosen(opts, eventsChannel)
	if err != nil {
		log.Fatal(err)
	}

	for {
		select {
		case err := <-subscription.Err():
			log.Fatal(err)
		case event := <-eventsChannel:
			l.LS.EndLottery(address, event.Winner.Hex(), uint(event.TotalYield.Uint64()))
			return
		}
	}
}

func (l Listener) ListenLotteryCreated() {
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
			l.LS.CreateLottery(
				event.ContractAddress.Hex(),
				event.Name,
				uint(event.ProtocolId.Uint64()),
				event.TokenAddress.Hex(),
				uint(event.EndDate.Uint64()),
				uint(event.MinAmountToDeposit.Uint64()))

			go l.ListenFundsDeposited(event.ContractAddress.Hex())
			go l.ListenFundsWithDrawn(event.ContractAddress.Hex())

			executionTime := time.Unix(event.EndDate.Int64(), 0)
			delay := executionTime.Sub(time.Now())

			timer := time.NewTimer(delay)
			go func() {
				<-timer.C
				go l.ListenWinnerChosen(event.ContractAddress.Hex())
				transactions.TransactEndLottery(event.ContractAddress.Hex())
			}()
		}
	}
}
