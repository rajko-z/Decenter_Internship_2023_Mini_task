package transactions

import (
	"backend/contracts"
	"context"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
	"log"
	"math/big"
	"os"
)

func TransactEndLottery(lotteryAddress string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	RPC := os.Getenv("RPC")
	DeployerAddress := os.Getenv("DEPLOYER_ADDRESS")
	DeployerPK := os.Getenv("DEPLOYER_PK")

	client, err := ethclient.Dial(RPC)
	if err != nil {
		log.Fatal(err)
	}

	myAddress := common.HexToAddress(DeployerAddress)
	contractAddress := common.HexToAddress(lotteryAddress)

	privateKey, err := crypto.HexToECDSA(DeployerPK)
	if err != nil {
		log.Fatal(err)
	}

	nonce, err := client.PendingNonceAt(context.Background(), myAddress)
	if err != nil {
		log.Fatal(err)
	}

	chainID, err := client.NetworkID(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		log.Fatal(err)
	}

	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	lotteries, err := contracts.NewLotteryAave(contractAddress, client)
	if err != nil {
		log.Fatal(err)
	}

	auth.Nonce = big.NewInt(int64(nonce))
	auth.GasLimit = uint64(300000)
	auth.GasPrice = gasPrice

	_, err = lotteries.End(auth)
	if err != nil {
		log.Fatal(err)
	}

}
