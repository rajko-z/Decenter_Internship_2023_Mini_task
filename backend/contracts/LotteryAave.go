// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package contracts

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// LotteryAaveMetaData contains all meta data concerning the LotteryAave contract.
var LotteryAaveMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"updatedTvl\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"updatedUserBalance\",\"type\":\"uint256\"}],\"name\":\"DepositEvent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"winner\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"totalYield\",\"type\":\"uint256\"}],\"name\":\"EndedEvent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"updatedTvl\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"isWinner\",\"type\":\"bool\"}],\"name\":\"WithdrawEvent\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_address\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"deposit\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"end\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"freezeTimeInDaysBeforeWinnerReveal\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getCurrentYield\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getEndDate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getMinAmountToDeposit\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getName\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getProtocolId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getTokenAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getTotalYield\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getTvl\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getWinner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_name\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"_tokenAddress\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_aTokenAddress\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_minAmountToDeposit\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_durationInDays\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_admin\",\"type\":\"address\"}],\"name\":\"init\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isFinished\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"roll\",\"type\":\"uint256\"}],\"name\":\"treeGetWinnerIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"treeSum\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdrawAdmin\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// LotteryAaveABI is the input ABI used to generate the binding from.
// Deprecated: Use LotteryAaveMetaData.ABI instead.
var LotteryAaveABI = LotteryAaveMetaData.ABI

// LotteryAave is an auto generated Go binding around an Ethereum contract.
type LotteryAave struct {
	LotteryAaveCaller     // Read-only binding to the contract
	LotteryAaveTransactor // Write-only binding to the contract
	LotteryAaveFilterer   // Log filterer for contract events
}

// LotteryAaveCaller is an auto generated read-only Go binding around an Ethereum contract.
type LotteryAaveCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LotteryAaveTransactor is an auto generated write-only Go binding around an Ethereum contract.
type LotteryAaveTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LotteryAaveFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type LotteryAaveFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LotteryAaveSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type LotteryAaveSession struct {
	Contract     *LotteryAave      // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// LotteryAaveCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type LotteryAaveCallerSession struct {
	Contract *LotteryAaveCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts      // Call options to use throughout this session
}

// LotteryAaveTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type LotteryAaveTransactorSession struct {
	Contract     *LotteryAaveTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts      // Transaction auth options to use throughout this session
}

// LotteryAaveRaw is an auto generated low-level Go binding around an Ethereum contract.
type LotteryAaveRaw struct {
	Contract *LotteryAave // Generic contract binding to access the raw methods on
}

// LotteryAaveCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type LotteryAaveCallerRaw struct {
	Contract *LotteryAaveCaller // Generic read-only contract binding to access the raw methods on
}

// LotteryAaveTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type LotteryAaveTransactorRaw struct {
	Contract *LotteryAaveTransactor // Generic write-only contract binding to access the raw methods on
}

// NewLotteryAave creates a new instance of LotteryAave, bound to a specific deployed contract.
func NewLotteryAave(address common.Address, backend bind.ContractBackend) (*LotteryAave, error) {
	contract, err := bindLotteryAave(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &LotteryAave{LotteryAaveCaller: LotteryAaveCaller{contract: contract}, LotteryAaveTransactor: LotteryAaveTransactor{contract: contract}, LotteryAaveFilterer: LotteryAaveFilterer{contract: contract}}, nil
}

// NewLotteryAaveCaller creates a new read-only instance of LotteryAave, bound to a specific deployed contract.
func NewLotteryAaveCaller(address common.Address, caller bind.ContractCaller) (*LotteryAaveCaller, error) {
	contract, err := bindLotteryAave(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &LotteryAaveCaller{contract: contract}, nil
}

// NewLotteryAaveTransactor creates a new write-only instance of LotteryAave, bound to a specific deployed contract.
func NewLotteryAaveTransactor(address common.Address, transactor bind.ContractTransactor) (*LotteryAaveTransactor, error) {
	contract, err := bindLotteryAave(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &LotteryAaveTransactor{contract: contract}, nil
}

// NewLotteryAaveFilterer creates a new log filterer instance of LotteryAave, bound to a specific deployed contract.
func NewLotteryAaveFilterer(address common.Address, filterer bind.ContractFilterer) (*LotteryAaveFilterer, error) {
	contract, err := bindLotteryAave(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &LotteryAaveFilterer{contract: contract}, nil
}

// bindLotteryAave binds a generic wrapper to an already deployed contract.
func bindLotteryAave(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := LotteryAaveMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_LotteryAave *LotteryAaveRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _LotteryAave.Contract.LotteryAaveCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_LotteryAave *LotteryAaveRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _LotteryAave.Contract.LotteryAaveTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_LotteryAave *LotteryAaveRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _LotteryAave.Contract.LotteryAaveTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_LotteryAave *LotteryAaveCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _LotteryAave.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_LotteryAave *LotteryAaveTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _LotteryAave.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_LotteryAave *LotteryAaveTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _LotteryAave.Contract.contract.Transact(opts, method, params...)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address _address) view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) BalanceOf(opts *bind.CallOpts, _address common.Address) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "balanceOf", _address)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address _address) view returns(uint256)
func (_LotteryAave *LotteryAaveSession) BalanceOf(_address common.Address) (*big.Int, error) {
	return _LotteryAave.Contract.BalanceOf(&_LotteryAave.CallOpts, _address)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address _address) view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) BalanceOf(_address common.Address) (*big.Int, error) {
	return _LotteryAave.Contract.BalanceOf(&_LotteryAave.CallOpts, _address)
}

// FreezeTimeInDaysBeforeWinnerReveal is a free data retrieval call binding the contract method 0x9f516d50.
//
// Solidity: function freezeTimeInDaysBeforeWinnerReveal() view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) FreezeTimeInDaysBeforeWinnerReveal(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "freezeTimeInDaysBeforeWinnerReveal")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// FreezeTimeInDaysBeforeWinnerReveal is a free data retrieval call binding the contract method 0x9f516d50.
//
// Solidity: function freezeTimeInDaysBeforeWinnerReveal() view returns(uint256)
func (_LotteryAave *LotteryAaveSession) FreezeTimeInDaysBeforeWinnerReveal() (*big.Int, error) {
	return _LotteryAave.Contract.FreezeTimeInDaysBeforeWinnerReveal(&_LotteryAave.CallOpts)
}

// FreezeTimeInDaysBeforeWinnerReveal is a free data retrieval call binding the contract method 0x9f516d50.
//
// Solidity: function freezeTimeInDaysBeforeWinnerReveal() view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) FreezeTimeInDaysBeforeWinnerReveal() (*big.Int, error) {
	return _LotteryAave.Contract.FreezeTimeInDaysBeforeWinnerReveal(&_LotteryAave.CallOpts)
}

// GetCurrentYield is a free data retrieval call binding the contract method 0xb91503a6.
//
// Solidity: function getCurrentYield() view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) GetCurrentYield(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getCurrentYield")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetCurrentYield is a free data retrieval call binding the contract method 0xb91503a6.
//
// Solidity: function getCurrentYield() view returns(uint256)
func (_LotteryAave *LotteryAaveSession) GetCurrentYield() (*big.Int, error) {
	return _LotteryAave.Contract.GetCurrentYield(&_LotteryAave.CallOpts)
}

// GetCurrentYield is a free data retrieval call binding the contract method 0xb91503a6.
//
// Solidity: function getCurrentYield() view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) GetCurrentYield() (*big.Int, error) {
	return _LotteryAave.Contract.GetCurrentYield(&_LotteryAave.CallOpts)
}

// GetEndDate is a free data retrieval call binding the contract method 0xb1356488.
//
// Solidity: function getEndDate() view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) GetEndDate(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getEndDate")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetEndDate is a free data retrieval call binding the contract method 0xb1356488.
//
// Solidity: function getEndDate() view returns(uint256)
func (_LotteryAave *LotteryAaveSession) GetEndDate() (*big.Int, error) {
	return _LotteryAave.Contract.GetEndDate(&_LotteryAave.CallOpts)
}

// GetEndDate is a free data retrieval call binding the contract method 0xb1356488.
//
// Solidity: function getEndDate() view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) GetEndDate() (*big.Int, error) {
	return _LotteryAave.Contract.GetEndDate(&_LotteryAave.CallOpts)
}

// GetMinAmountToDeposit is a free data retrieval call binding the contract method 0x361f1ad3.
//
// Solidity: function getMinAmountToDeposit() view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) GetMinAmountToDeposit(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getMinAmountToDeposit")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetMinAmountToDeposit is a free data retrieval call binding the contract method 0x361f1ad3.
//
// Solidity: function getMinAmountToDeposit() view returns(uint256)
func (_LotteryAave *LotteryAaveSession) GetMinAmountToDeposit() (*big.Int, error) {
	return _LotteryAave.Contract.GetMinAmountToDeposit(&_LotteryAave.CallOpts)
}

// GetMinAmountToDeposit is a free data retrieval call binding the contract method 0x361f1ad3.
//
// Solidity: function getMinAmountToDeposit() view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) GetMinAmountToDeposit() (*big.Int, error) {
	return _LotteryAave.Contract.GetMinAmountToDeposit(&_LotteryAave.CallOpts)
}

// GetName is a free data retrieval call binding the contract method 0x17d7de7c.
//
// Solidity: function getName() view returns(string)
func (_LotteryAave *LotteryAaveCaller) GetName(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getName")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetName is a free data retrieval call binding the contract method 0x17d7de7c.
//
// Solidity: function getName() view returns(string)
func (_LotteryAave *LotteryAaveSession) GetName() (string, error) {
	return _LotteryAave.Contract.GetName(&_LotteryAave.CallOpts)
}

// GetName is a free data retrieval call binding the contract method 0x17d7de7c.
//
// Solidity: function getName() view returns(string)
func (_LotteryAave *LotteryAaveCallerSession) GetName() (string, error) {
	return _LotteryAave.Contract.GetName(&_LotteryAave.CallOpts)
}

// GetProtocolId is a free data retrieval call binding the contract method 0xdfb5eabd.
//
// Solidity: function getProtocolId() pure returns(uint256)
func (_LotteryAave *LotteryAaveCaller) GetProtocolId(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getProtocolId")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetProtocolId is a free data retrieval call binding the contract method 0xdfb5eabd.
//
// Solidity: function getProtocolId() pure returns(uint256)
func (_LotteryAave *LotteryAaveSession) GetProtocolId() (*big.Int, error) {
	return _LotteryAave.Contract.GetProtocolId(&_LotteryAave.CallOpts)
}

// GetProtocolId is a free data retrieval call binding the contract method 0xdfb5eabd.
//
// Solidity: function getProtocolId() pure returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) GetProtocolId() (*big.Int, error) {
	return _LotteryAave.Contract.GetProtocolId(&_LotteryAave.CallOpts)
}

// GetTokenAddress is a free data retrieval call binding the contract method 0x10fe9ae8.
//
// Solidity: function getTokenAddress() view returns(address)
func (_LotteryAave *LotteryAaveCaller) GetTokenAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getTokenAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetTokenAddress is a free data retrieval call binding the contract method 0x10fe9ae8.
//
// Solidity: function getTokenAddress() view returns(address)
func (_LotteryAave *LotteryAaveSession) GetTokenAddress() (common.Address, error) {
	return _LotteryAave.Contract.GetTokenAddress(&_LotteryAave.CallOpts)
}

// GetTokenAddress is a free data retrieval call binding the contract method 0x10fe9ae8.
//
// Solidity: function getTokenAddress() view returns(address)
func (_LotteryAave *LotteryAaveCallerSession) GetTokenAddress() (common.Address, error) {
	return _LotteryAave.Contract.GetTokenAddress(&_LotteryAave.CallOpts)
}

// GetTotalYield is a free data retrieval call binding the contract method 0x7aec978d.
//
// Solidity: function getTotalYield() view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) GetTotalYield(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getTotalYield")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetTotalYield is a free data retrieval call binding the contract method 0x7aec978d.
//
// Solidity: function getTotalYield() view returns(uint256)
func (_LotteryAave *LotteryAaveSession) GetTotalYield() (*big.Int, error) {
	return _LotteryAave.Contract.GetTotalYield(&_LotteryAave.CallOpts)
}

// GetTotalYield is a free data retrieval call binding the contract method 0x7aec978d.
//
// Solidity: function getTotalYield() view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) GetTotalYield() (*big.Int, error) {
	return _LotteryAave.Contract.GetTotalYield(&_LotteryAave.CallOpts)
}

// GetTvl is a free data retrieval call binding the contract method 0xd075dd42.
//
// Solidity: function getTvl() view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) GetTvl(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getTvl")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetTvl is a free data retrieval call binding the contract method 0xd075dd42.
//
// Solidity: function getTvl() view returns(uint256)
func (_LotteryAave *LotteryAaveSession) GetTvl() (*big.Int, error) {
	return _LotteryAave.Contract.GetTvl(&_LotteryAave.CallOpts)
}

// GetTvl is a free data retrieval call binding the contract method 0xd075dd42.
//
// Solidity: function getTvl() view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) GetTvl() (*big.Int, error) {
	return _LotteryAave.Contract.GetTvl(&_LotteryAave.CallOpts)
}

// GetWinner is a free data retrieval call binding the contract method 0x8e7ea5b2.
//
// Solidity: function getWinner() view returns(address)
func (_LotteryAave *LotteryAaveCaller) GetWinner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "getWinner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetWinner is a free data retrieval call binding the contract method 0x8e7ea5b2.
//
// Solidity: function getWinner() view returns(address)
func (_LotteryAave *LotteryAaveSession) GetWinner() (common.Address, error) {
	return _LotteryAave.Contract.GetWinner(&_LotteryAave.CallOpts)
}

// GetWinner is a free data retrieval call binding the contract method 0x8e7ea5b2.
//
// Solidity: function getWinner() view returns(address)
func (_LotteryAave *LotteryAaveCallerSession) GetWinner() (common.Address, error) {
	return _LotteryAave.Contract.GetWinner(&_LotteryAave.CallOpts)
}

// IsFinished is a free data retrieval call binding the contract method 0x7b352962.
//
// Solidity: function isFinished() view returns(bool)
func (_LotteryAave *LotteryAaveCaller) IsFinished(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "isFinished")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsFinished is a free data retrieval call binding the contract method 0x7b352962.
//
// Solidity: function isFinished() view returns(bool)
func (_LotteryAave *LotteryAaveSession) IsFinished() (bool, error) {
	return _LotteryAave.Contract.IsFinished(&_LotteryAave.CallOpts)
}

// IsFinished is a free data retrieval call binding the contract method 0x7b352962.
//
// Solidity: function isFinished() view returns(bool)
func (_LotteryAave *LotteryAaveCallerSession) IsFinished() (bool, error) {
	return _LotteryAave.Contract.IsFinished(&_LotteryAave.CallOpts)
}

// TreeGetWinnerIndex is a free data retrieval call binding the contract method 0xfb9042bc.
//
// Solidity: function treeGetWinnerIndex(uint256 roll) view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) TreeGetWinnerIndex(opts *bind.CallOpts, roll *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "treeGetWinnerIndex", roll)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TreeGetWinnerIndex is a free data retrieval call binding the contract method 0xfb9042bc.
//
// Solidity: function treeGetWinnerIndex(uint256 roll) view returns(uint256)
func (_LotteryAave *LotteryAaveSession) TreeGetWinnerIndex(roll *big.Int) (*big.Int, error) {
	return _LotteryAave.Contract.TreeGetWinnerIndex(&_LotteryAave.CallOpts, roll)
}

// TreeGetWinnerIndex is a free data retrieval call binding the contract method 0xfb9042bc.
//
// Solidity: function treeGetWinnerIndex(uint256 roll) view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) TreeGetWinnerIndex(roll *big.Int) (*big.Int, error) {
	return _LotteryAave.Contract.TreeGetWinnerIndex(&_LotteryAave.CallOpts, roll)
}

// TreeSum is a free data retrieval call binding the contract method 0x241b7ce9.
//
// Solidity: function treeSum() view returns(uint256)
func (_LotteryAave *LotteryAaveCaller) TreeSum(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryAave.contract.Call(opts, &out, "treeSum")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TreeSum is a free data retrieval call binding the contract method 0x241b7ce9.
//
// Solidity: function treeSum() view returns(uint256)
func (_LotteryAave *LotteryAaveSession) TreeSum() (*big.Int, error) {
	return _LotteryAave.Contract.TreeSum(&_LotteryAave.CallOpts)
}

// TreeSum is a free data retrieval call binding the contract method 0x241b7ce9.
//
// Solidity: function treeSum() view returns(uint256)
func (_LotteryAave *LotteryAaveCallerSession) TreeSum() (*big.Int, error) {
	return _LotteryAave.Contract.TreeSum(&_LotteryAave.CallOpts)
}

// Deposit is a paid mutator transaction binding the contract method 0xb6b55f25.
//
// Solidity: function deposit(uint256 _amount) returns()
func (_LotteryAave *LotteryAaveTransactor) Deposit(opts *bind.TransactOpts, _amount *big.Int) (*types.Transaction, error) {
	return _LotteryAave.contract.Transact(opts, "deposit", _amount)
}

// Deposit is a paid mutator transaction binding the contract method 0xb6b55f25.
//
// Solidity: function deposit(uint256 _amount) returns()
func (_LotteryAave *LotteryAaveSession) Deposit(_amount *big.Int) (*types.Transaction, error) {
	return _LotteryAave.Contract.Deposit(&_LotteryAave.TransactOpts, _amount)
}

// Deposit is a paid mutator transaction binding the contract method 0xb6b55f25.
//
// Solidity: function deposit(uint256 _amount) returns()
func (_LotteryAave *LotteryAaveTransactorSession) Deposit(_amount *big.Int) (*types.Transaction, error) {
	return _LotteryAave.Contract.Deposit(&_LotteryAave.TransactOpts, _amount)
}

// End is a paid mutator transaction binding the contract method 0xefbe1c1c.
//
// Solidity: function end() returns()
func (_LotteryAave *LotteryAaveTransactor) End(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _LotteryAave.contract.Transact(opts, "end")
}

// End is a paid mutator transaction binding the contract method 0xefbe1c1c.
//
// Solidity: function end() returns()
func (_LotteryAave *LotteryAaveSession) End() (*types.Transaction, error) {
	return _LotteryAave.Contract.End(&_LotteryAave.TransactOpts)
}

// End is a paid mutator transaction binding the contract method 0xefbe1c1c.
//
// Solidity: function end() returns()
func (_LotteryAave *LotteryAaveTransactorSession) End() (*types.Transaction, error) {
	return _LotteryAave.Contract.End(&_LotteryAave.TransactOpts)
}

// Init is a paid mutator transaction binding the contract method 0xa3088405.
//
// Solidity: function init(string _name, address _tokenAddress, address _aTokenAddress, uint256 _minAmountToDeposit, uint256 _durationInDays, address _admin) returns()
func (_LotteryAave *LotteryAaveTransactor) Init(opts *bind.TransactOpts, _name string, _tokenAddress common.Address, _aTokenAddress common.Address, _minAmountToDeposit *big.Int, _durationInDays *big.Int, _admin common.Address) (*types.Transaction, error) {
	return _LotteryAave.contract.Transact(opts, "init", _name, _tokenAddress, _aTokenAddress, _minAmountToDeposit, _durationInDays, _admin)
}

// Init is a paid mutator transaction binding the contract method 0xa3088405.
//
// Solidity: function init(string _name, address _tokenAddress, address _aTokenAddress, uint256 _minAmountToDeposit, uint256 _durationInDays, address _admin) returns()
func (_LotteryAave *LotteryAaveSession) Init(_name string, _tokenAddress common.Address, _aTokenAddress common.Address, _minAmountToDeposit *big.Int, _durationInDays *big.Int, _admin common.Address) (*types.Transaction, error) {
	return _LotteryAave.Contract.Init(&_LotteryAave.TransactOpts, _name, _tokenAddress, _aTokenAddress, _minAmountToDeposit, _durationInDays, _admin)
}

// Init is a paid mutator transaction binding the contract method 0xa3088405.
//
// Solidity: function init(string _name, address _tokenAddress, address _aTokenAddress, uint256 _minAmountToDeposit, uint256 _durationInDays, address _admin) returns()
func (_LotteryAave *LotteryAaveTransactorSession) Init(_name string, _tokenAddress common.Address, _aTokenAddress common.Address, _minAmountToDeposit *big.Int, _durationInDays *big.Int, _admin common.Address) (*types.Transaction, error) {
	return _LotteryAave.Contract.Init(&_LotteryAave.TransactOpts, _name, _tokenAddress, _aTokenAddress, _minAmountToDeposit, _durationInDays, _admin)
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_LotteryAave *LotteryAaveTransactor) Withdraw(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _LotteryAave.contract.Transact(opts, "withdraw")
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_LotteryAave *LotteryAaveSession) Withdraw() (*types.Transaction, error) {
	return _LotteryAave.Contract.Withdraw(&_LotteryAave.TransactOpts)
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_LotteryAave *LotteryAaveTransactorSession) Withdraw() (*types.Transaction, error) {
	return _LotteryAave.Contract.Withdraw(&_LotteryAave.TransactOpts)
}

// WithdrawAdmin is a paid mutator transaction binding the contract method 0x04c76af0.
//
// Solidity: function withdrawAdmin() returns()
func (_LotteryAave *LotteryAaveTransactor) WithdrawAdmin(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _LotteryAave.contract.Transact(opts, "withdrawAdmin")
}

// WithdrawAdmin is a paid mutator transaction binding the contract method 0x04c76af0.
//
// Solidity: function withdrawAdmin() returns()
func (_LotteryAave *LotteryAaveSession) WithdrawAdmin() (*types.Transaction, error) {
	return _LotteryAave.Contract.WithdrawAdmin(&_LotteryAave.TransactOpts)
}

// WithdrawAdmin is a paid mutator transaction binding the contract method 0x04c76af0.
//
// Solidity: function withdrawAdmin() returns()
func (_LotteryAave *LotteryAaveTransactorSession) WithdrawAdmin() (*types.Transaction, error) {
	return _LotteryAave.Contract.WithdrawAdmin(&_LotteryAave.TransactOpts)
}

// LotteryAaveDepositEventIterator is returned from FilterDepositEvent and is used to iterate over the raw logs and unpacked data for DepositEvent events raised by the LotteryAave contract.
type LotteryAaveDepositEventIterator struct {
	Event *LotteryAaveDepositEvent // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LotteryAaveDepositEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LotteryAaveDepositEvent)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LotteryAaveDepositEvent)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LotteryAaveDepositEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LotteryAaveDepositEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LotteryAaveDepositEvent represents a DepositEvent event raised by the LotteryAave contract.
type LotteryAaveDepositEvent struct {
	User               common.Address
	Amount             *big.Int
	UpdatedTvl         *big.Int
	UpdatedUserBalance *big.Int
	Raw                types.Log // Blockchain specific contextual infos
}

// FilterDepositEvent is a free log retrieval operation binding the contract event 0x62ecb2a394867776d4797065f4c2c678a4d98de37e96d0a89642599b6e0c4f54.
//
// Solidity: event DepositEvent(address user, uint256 amount, uint256 updatedTvl, uint256 updatedUserBalance)
func (_LotteryAave *LotteryAaveFilterer) FilterDepositEvent(opts *bind.FilterOpts) (*LotteryAaveDepositEventIterator, error) {

	logs, sub, err := _LotteryAave.contract.FilterLogs(opts, "DepositEvent")
	if err != nil {
		return nil, err
	}
	return &LotteryAaveDepositEventIterator{contract: _LotteryAave.contract, event: "DepositEvent", logs: logs, sub: sub}, nil
}

// WatchDepositEvent is a free log subscription operation binding the contract event 0x62ecb2a394867776d4797065f4c2c678a4d98de37e96d0a89642599b6e0c4f54.
//
// Solidity: event DepositEvent(address user, uint256 amount, uint256 updatedTvl, uint256 updatedUserBalance)
func (_LotteryAave *LotteryAaveFilterer) WatchDepositEvent(opts *bind.WatchOpts, sink chan<- *LotteryAaveDepositEvent) (event.Subscription, error) {

	logs, sub, err := _LotteryAave.contract.WatchLogs(opts, "DepositEvent")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LotteryAaveDepositEvent)
				if err := _LotteryAave.contract.UnpackLog(event, "DepositEvent", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseDepositEvent is a log parse operation binding the contract event 0x62ecb2a394867776d4797065f4c2c678a4d98de37e96d0a89642599b6e0c4f54.
//
// Solidity: event DepositEvent(address user, uint256 amount, uint256 updatedTvl, uint256 updatedUserBalance)
func (_LotteryAave *LotteryAaveFilterer) ParseDepositEvent(log types.Log) (*LotteryAaveDepositEvent, error) {
	event := new(LotteryAaveDepositEvent)
	if err := _LotteryAave.contract.UnpackLog(event, "DepositEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LotteryAaveEndedEventIterator is returned from FilterEndedEvent and is used to iterate over the raw logs and unpacked data for EndedEvent events raised by the LotteryAave contract.
type LotteryAaveEndedEventIterator struct {
	Event *LotteryAaveEndedEvent // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LotteryAaveEndedEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LotteryAaveEndedEvent)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LotteryAaveEndedEvent)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LotteryAaveEndedEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LotteryAaveEndedEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LotteryAaveEndedEvent represents a EndedEvent event raised by the LotteryAave contract.
type LotteryAaveEndedEvent struct {
	Winner     common.Address
	TotalYield *big.Int
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterEndedEvent is a free log retrieval operation binding the contract event 0xf2b8927d32610f47121af3a5f83973621872dbfe4f53aaae38881a5b6a2fa4c6.
//
// Solidity: event EndedEvent(address winner, uint256 totalYield)
func (_LotteryAave *LotteryAaveFilterer) FilterEndedEvent(opts *bind.FilterOpts) (*LotteryAaveEndedEventIterator, error) {

	logs, sub, err := _LotteryAave.contract.FilterLogs(opts, "EndedEvent")
	if err != nil {
		return nil, err
	}
	return &LotteryAaveEndedEventIterator{contract: _LotteryAave.contract, event: "EndedEvent", logs: logs, sub: sub}, nil
}

// WatchEndedEvent is a free log subscription operation binding the contract event 0xf2b8927d32610f47121af3a5f83973621872dbfe4f53aaae38881a5b6a2fa4c6.
//
// Solidity: event EndedEvent(address winner, uint256 totalYield)
func (_LotteryAave *LotteryAaveFilterer) WatchEndedEvent(opts *bind.WatchOpts, sink chan<- *LotteryAaveEndedEvent) (event.Subscription, error) {

	logs, sub, err := _LotteryAave.contract.WatchLogs(opts, "EndedEvent")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LotteryAaveEndedEvent)
				if err := _LotteryAave.contract.UnpackLog(event, "EndedEvent", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseEndedEvent is a log parse operation binding the contract event 0xf2b8927d32610f47121af3a5f83973621872dbfe4f53aaae38881a5b6a2fa4c6.
//
// Solidity: event EndedEvent(address winner, uint256 totalYield)
func (_LotteryAave *LotteryAaveFilterer) ParseEndedEvent(log types.Log) (*LotteryAaveEndedEvent, error) {
	event := new(LotteryAaveEndedEvent)
	if err := _LotteryAave.contract.UnpackLog(event, "EndedEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LotteryAaveWithdrawEventIterator is returned from FilterWithdrawEvent and is used to iterate over the raw logs and unpacked data for WithdrawEvent events raised by the LotteryAave contract.
type LotteryAaveWithdrawEventIterator struct {
	Event *LotteryAaveWithdrawEvent // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LotteryAaveWithdrawEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LotteryAaveWithdrawEvent)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LotteryAaveWithdrawEvent)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LotteryAaveWithdrawEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LotteryAaveWithdrawEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LotteryAaveWithdrawEvent represents a WithdrawEvent event raised by the LotteryAave contract.
type LotteryAaveWithdrawEvent struct {
	User       common.Address
	Amount     *big.Int
	UpdatedTvl *big.Int
	IsWinner   bool
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterWithdrawEvent is a free log retrieval operation binding the contract event 0x4adaba89d3389dde00dd3700ef21eb08b254396e862bed010efc624754b64a32.
//
// Solidity: event WithdrawEvent(address user, uint256 amount, uint256 updatedTvl, bool isWinner)
func (_LotteryAave *LotteryAaveFilterer) FilterWithdrawEvent(opts *bind.FilterOpts) (*LotteryAaveWithdrawEventIterator, error) {

	logs, sub, err := _LotteryAave.contract.FilterLogs(opts, "WithdrawEvent")
	if err != nil {
		return nil, err
	}
	return &LotteryAaveWithdrawEventIterator{contract: _LotteryAave.contract, event: "WithdrawEvent", logs: logs, sub: sub}, nil
}

// WatchWithdrawEvent is a free log subscription operation binding the contract event 0x4adaba89d3389dde00dd3700ef21eb08b254396e862bed010efc624754b64a32.
//
// Solidity: event WithdrawEvent(address user, uint256 amount, uint256 updatedTvl, bool isWinner)
func (_LotteryAave *LotteryAaveFilterer) WatchWithdrawEvent(opts *bind.WatchOpts, sink chan<- *LotteryAaveWithdrawEvent) (event.Subscription, error) {

	logs, sub, err := _LotteryAave.contract.WatchLogs(opts, "WithdrawEvent")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LotteryAaveWithdrawEvent)
				if err := _LotteryAave.contract.UnpackLog(event, "WithdrawEvent", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseWithdrawEvent is a log parse operation binding the contract event 0x4adaba89d3389dde00dd3700ef21eb08b254396e862bed010efc624754b64a32.
//
// Solidity: event WithdrawEvent(address user, uint256 amount, uint256 updatedTvl, bool isWinner)
func (_LotteryAave *LotteryAaveFilterer) ParseWithdrawEvent(log types.Log) (*LotteryAaveWithdrawEvent, error) {
	event := new(LotteryAaveWithdrawEvent)
	if err := _LotteryAave.contract.UnpackLog(event, "WithdrawEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
