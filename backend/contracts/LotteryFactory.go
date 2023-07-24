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

// ILotteryFactoryLotteryData is an auto generated low-level Go binding around an user-defined struct.
type ILotteryFactoryLotteryData struct {
	ContractAddress    common.Address
	Name               string
	ProtocolId         *big.Int
	TokenAddress       common.Address
	TokenSymbol        string
	TokenDecimals      *big.Int
	Tvl                *big.Int
	EndDate            *big.Int
	MinAmountToDeposit *big.Int
	CurrentYield       *big.Int
	Winner             common.Address
	MyAmount           *big.Int
}

// LotteryFactoryMetaData contains all meta data concerning the LotteryFactory contract.
var LotteryFactoryMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_aaveLotteryBaseAddress\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"contractAddress\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"protocolId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"tokenAddress\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"tokenSymbol\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"tokenDecimals\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"endDate\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"minAmountToDeposit\",\"type\":\"uint256\"}],\"name\":\"CreatedEvent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"lotteryBaseAddress\",\"type\":\"address\"}],\"name\":\"addProtocol\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenAddress\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"aTokenAddress\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"minAmount\",\"type\":\"uint256\"}],\"name\":\"addToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenAddress\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"newAmount\",\"type\":\"uint256\"}],\"name\":\"changeTokenMinAmount\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_protocolId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_tokenAddress\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_minAmountToDeposit\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_durationInDays\",\"type\":\"uint256\"}],\"name\":\"createLottery\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"filterByUser\",\"type\":\"bool\"}],\"name\":\"getLotteries\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"contractAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"protocolId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"tokenAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"tokenSymbol\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"tokenDecimals\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"tvl\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"endDate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"minAmountToDeposit\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"currentYield\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"winner\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"myAmount\",\"type\":\"uint256\"}],\"internalType\":\"structILotteryFactory.LotteryData[]\",\"name\":\"\",\"type\":\"tuple[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"getLotteryByAddress\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"contractAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"protocolId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"tokenAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"tokenSymbol\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"tokenDecimals\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"tvl\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"endDate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"minAmountToDeposit\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"currentYield\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"winner\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"myAmount\",\"type\":\"uint256\"}],\"internalType\":\"structILotteryFactory.LotteryData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"lotteries\",\"outputs\":[{\"internalType\":\"contractILottery\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"minDurationInDays\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"protocolSupported\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"removeProtocol\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenAddress\",\"type\":\"address\"}],\"name\":\"removeToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"supportedProtocols\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenAddress\",\"type\":\"address\"}],\"name\":\"tokenMinAmount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenAddress\",\"type\":\"address\"}],\"name\":\"tokenSupported\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"tokenToAtoken\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"tokens\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// LotteryFactoryABI is the input ABI used to generate the binding from.
// Deprecated: Use LotteryFactoryMetaData.ABI instead.
var LotteryFactoryABI = LotteryFactoryMetaData.ABI

// LotteryFactory is an auto generated Go binding around an Ethereum contract.
type LotteryFactory struct {
	LotteryFactoryCaller     // Read-only binding to the contract
	LotteryFactoryTransactor // Write-only binding to the contract
	LotteryFactoryFilterer   // Log filterer for contract events
}

// LotteryFactoryCaller is an auto generated read-only Go binding around an Ethereum contract.
type LotteryFactoryCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LotteryFactoryTransactor is an auto generated write-only Go binding around an Ethereum contract.
type LotteryFactoryTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LotteryFactoryFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type LotteryFactoryFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LotteryFactorySession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type LotteryFactorySession struct {
	Contract     *LotteryFactory   // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// LotteryFactoryCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type LotteryFactoryCallerSession struct {
	Contract *LotteryFactoryCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts         // Call options to use throughout this session
}

// LotteryFactoryTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type LotteryFactoryTransactorSession struct {
	Contract     *LotteryFactoryTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts         // Transaction auth options to use throughout this session
}

// LotteryFactoryRaw is an auto generated low-level Go binding around an Ethereum contract.
type LotteryFactoryRaw struct {
	Contract *LotteryFactory // Generic contract binding to access the raw methods on
}

// LotteryFactoryCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type LotteryFactoryCallerRaw struct {
	Contract *LotteryFactoryCaller // Generic read-only contract binding to access the raw methods on
}

// LotteryFactoryTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type LotteryFactoryTransactorRaw struct {
	Contract *LotteryFactoryTransactor // Generic write-only contract binding to access the raw methods on
}

// NewLotteryFactory creates a new instance of LotteryFactory, bound to a specific deployed contract.
func NewLotteryFactory(address common.Address, backend bind.ContractBackend) (*LotteryFactory, error) {
	contract, err := bindLotteryFactory(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &LotteryFactory{LotteryFactoryCaller: LotteryFactoryCaller{contract: contract}, LotteryFactoryTransactor: LotteryFactoryTransactor{contract: contract}, LotteryFactoryFilterer: LotteryFactoryFilterer{contract: contract}}, nil
}

// NewLotteryFactoryCaller creates a new read-only instance of LotteryFactory, bound to a specific deployed contract.
func NewLotteryFactoryCaller(address common.Address, caller bind.ContractCaller) (*LotteryFactoryCaller, error) {
	contract, err := bindLotteryFactory(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &LotteryFactoryCaller{contract: contract}, nil
}

// NewLotteryFactoryTransactor creates a new write-only instance of LotteryFactory, bound to a specific deployed contract.
func NewLotteryFactoryTransactor(address common.Address, transactor bind.ContractTransactor) (*LotteryFactoryTransactor, error) {
	contract, err := bindLotteryFactory(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &LotteryFactoryTransactor{contract: contract}, nil
}

// NewLotteryFactoryFilterer creates a new log filterer instance of LotteryFactory, bound to a specific deployed contract.
func NewLotteryFactoryFilterer(address common.Address, filterer bind.ContractFilterer) (*LotteryFactoryFilterer, error) {
	contract, err := bindLotteryFactory(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &LotteryFactoryFilterer{contract: contract}, nil
}

// bindLotteryFactory binds a generic wrapper to an already deployed contract.
func bindLotteryFactory(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := LotteryFactoryMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_LotteryFactory *LotteryFactoryRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _LotteryFactory.Contract.LotteryFactoryCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_LotteryFactory *LotteryFactoryRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _LotteryFactory.Contract.LotteryFactoryTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_LotteryFactory *LotteryFactoryRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _LotteryFactory.Contract.LotteryFactoryTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_LotteryFactory *LotteryFactoryCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _LotteryFactory.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_LotteryFactory *LotteryFactoryTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _LotteryFactory.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_LotteryFactory *LotteryFactoryTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _LotteryFactory.Contract.contract.Transact(opts, method, params...)
}

// GetLotteries is a free data retrieval call binding the contract method 0xc0c3d3a5.
//
// Solidity: function getLotteries(bool filterByUser) view returns((address,string,uint256,address,string,uint256,uint256,uint256,uint256,uint256,address,uint256)[])
func (_LotteryFactory *LotteryFactoryCaller) GetLotteries(opts *bind.CallOpts, filterByUser bool) ([]ILotteryFactoryLotteryData, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "getLotteries", filterByUser)

	if err != nil {
		return *new([]ILotteryFactoryLotteryData), err
	}

	out0 := *abi.ConvertType(out[0], new([]ILotteryFactoryLotteryData)).(*[]ILotteryFactoryLotteryData)

	return out0, err

}

// GetLotteries is a free data retrieval call binding the contract method 0xc0c3d3a5.
//
// Solidity: function getLotteries(bool filterByUser) view returns((address,string,uint256,address,string,uint256,uint256,uint256,uint256,uint256,address,uint256)[])
func (_LotteryFactory *LotteryFactorySession) GetLotteries(filterByUser bool) ([]ILotteryFactoryLotteryData, error) {
	return _LotteryFactory.Contract.GetLotteries(&_LotteryFactory.CallOpts, filterByUser)
}

// GetLotteries is a free data retrieval call binding the contract method 0xc0c3d3a5.
//
// Solidity: function getLotteries(bool filterByUser) view returns((address,string,uint256,address,string,uint256,uint256,uint256,uint256,uint256,address,uint256)[])
func (_LotteryFactory *LotteryFactoryCallerSession) GetLotteries(filterByUser bool) ([]ILotteryFactoryLotteryData, error) {
	return _LotteryFactory.Contract.GetLotteries(&_LotteryFactory.CallOpts, filterByUser)
}

// GetLotteryByAddress is a free data retrieval call binding the contract method 0x80542f7c.
//
// Solidity: function getLotteryByAddress(address addr) view returns((address,string,uint256,address,string,uint256,uint256,uint256,uint256,uint256,address,uint256))
func (_LotteryFactory *LotteryFactoryCaller) GetLotteryByAddress(opts *bind.CallOpts, addr common.Address) (ILotteryFactoryLotteryData, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "getLotteryByAddress", addr)

	if err != nil {
		return *new(ILotteryFactoryLotteryData), err
	}

	out0 := *abi.ConvertType(out[0], new(ILotteryFactoryLotteryData)).(*ILotteryFactoryLotteryData)

	return out0, err

}

// GetLotteryByAddress is a free data retrieval call binding the contract method 0x80542f7c.
//
// Solidity: function getLotteryByAddress(address addr) view returns((address,string,uint256,address,string,uint256,uint256,uint256,uint256,uint256,address,uint256))
func (_LotteryFactory *LotteryFactorySession) GetLotteryByAddress(addr common.Address) (ILotteryFactoryLotteryData, error) {
	return _LotteryFactory.Contract.GetLotteryByAddress(&_LotteryFactory.CallOpts, addr)
}

// GetLotteryByAddress is a free data retrieval call binding the contract method 0x80542f7c.
//
// Solidity: function getLotteryByAddress(address addr) view returns((address,string,uint256,address,string,uint256,uint256,uint256,uint256,uint256,address,uint256))
func (_LotteryFactory *LotteryFactoryCallerSession) GetLotteryByAddress(addr common.Address) (ILotteryFactoryLotteryData, error) {
	return _LotteryFactory.Contract.GetLotteryByAddress(&_LotteryFactory.CallOpts, addr)
}

// Lotteries is a free data retrieval call binding the contract method 0x1398e076.
//
// Solidity: function lotteries(uint256 ) view returns(address)
func (_LotteryFactory *LotteryFactoryCaller) Lotteries(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "lotteries", arg0)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Lotteries is a free data retrieval call binding the contract method 0x1398e076.
//
// Solidity: function lotteries(uint256 ) view returns(address)
func (_LotteryFactory *LotteryFactorySession) Lotteries(arg0 *big.Int) (common.Address, error) {
	return _LotteryFactory.Contract.Lotteries(&_LotteryFactory.CallOpts, arg0)
}

// Lotteries is a free data retrieval call binding the contract method 0x1398e076.
//
// Solidity: function lotteries(uint256 ) view returns(address)
func (_LotteryFactory *LotteryFactoryCallerSession) Lotteries(arg0 *big.Int) (common.Address, error) {
	return _LotteryFactory.Contract.Lotteries(&_LotteryFactory.CallOpts, arg0)
}

// MinDurationInDays is a free data retrieval call binding the contract method 0x49cfe175.
//
// Solidity: function minDurationInDays() view returns(uint256)
func (_LotteryFactory *LotteryFactoryCaller) MinDurationInDays(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "minDurationInDays")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// MinDurationInDays is a free data retrieval call binding the contract method 0x49cfe175.
//
// Solidity: function minDurationInDays() view returns(uint256)
func (_LotteryFactory *LotteryFactorySession) MinDurationInDays() (*big.Int, error) {
	return _LotteryFactory.Contract.MinDurationInDays(&_LotteryFactory.CallOpts)
}

// MinDurationInDays is a free data retrieval call binding the contract method 0x49cfe175.
//
// Solidity: function minDurationInDays() view returns(uint256)
func (_LotteryFactory *LotteryFactoryCallerSession) MinDurationInDays() (*big.Int, error) {
	return _LotteryFactory.Contract.MinDurationInDays(&_LotteryFactory.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_LotteryFactory *LotteryFactoryCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_LotteryFactory *LotteryFactorySession) Owner() (common.Address, error) {
	return _LotteryFactory.Contract.Owner(&_LotteryFactory.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_LotteryFactory *LotteryFactoryCallerSession) Owner() (common.Address, error) {
	return _LotteryFactory.Contract.Owner(&_LotteryFactory.CallOpts)
}

// ProtocolSupported is a free data retrieval call binding the contract method 0x84febedc.
//
// Solidity: function protocolSupported(uint256 id) view returns(bool)
func (_LotteryFactory *LotteryFactoryCaller) ProtocolSupported(opts *bind.CallOpts, id *big.Int) (bool, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "protocolSupported", id)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// ProtocolSupported is a free data retrieval call binding the contract method 0x84febedc.
//
// Solidity: function protocolSupported(uint256 id) view returns(bool)
func (_LotteryFactory *LotteryFactorySession) ProtocolSupported(id *big.Int) (bool, error) {
	return _LotteryFactory.Contract.ProtocolSupported(&_LotteryFactory.CallOpts, id)
}

// ProtocolSupported is a free data retrieval call binding the contract method 0x84febedc.
//
// Solidity: function protocolSupported(uint256 id) view returns(bool)
func (_LotteryFactory *LotteryFactoryCallerSession) ProtocolSupported(id *big.Int) (bool, error) {
	return _LotteryFactory.Contract.ProtocolSupported(&_LotteryFactory.CallOpts, id)
}

// SupportedProtocols is a free data retrieval call binding the contract method 0x68e84aef.
//
// Solidity: function supportedProtocols(uint256 ) view returns(address)
func (_LotteryFactory *LotteryFactoryCaller) SupportedProtocols(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "supportedProtocols", arg0)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// SupportedProtocols is a free data retrieval call binding the contract method 0x68e84aef.
//
// Solidity: function supportedProtocols(uint256 ) view returns(address)
func (_LotteryFactory *LotteryFactorySession) SupportedProtocols(arg0 *big.Int) (common.Address, error) {
	return _LotteryFactory.Contract.SupportedProtocols(&_LotteryFactory.CallOpts, arg0)
}

// SupportedProtocols is a free data retrieval call binding the contract method 0x68e84aef.
//
// Solidity: function supportedProtocols(uint256 ) view returns(address)
func (_LotteryFactory *LotteryFactoryCallerSession) SupportedProtocols(arg0 *big.Int) (common.Address, error) {
	return _LotteryFactory.Contract.SupportedProtocols(&_LotteryFactory.CallOpts, arg0)
}

// TokenMinAmount is a free data retrieval call binding the contract method 0x4dae755c.
//
// Solidity: function tokenMinAmount(address tokenAddress) view returns(uint256)
func (_LotteryFactory *LotteryFactoryCaller) TokenMinAmount(opts *bind.CallOpts, tokenAddress common.Address) (*big.Int, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "tokenMinAmount", tokenAddress)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TokenMinAmount is a free data retrieval call binding the contract method 0x4dae755c.
//
// Solidity: function tokenMinAmount(address tokenAddress) view returns(uint256)
func (_LotteryFactory *LotteryFactorySession) TokenMinAmount(tokenAddress common.Address) (*big.Int, error) {
	return _LotteryFactory.Contract.TokenMinAmount(&_LotteryFactory.CallOpts, tokenAddress)
}

// TokenMinAmount is a free data retrieval call binding the contract method 0x4dae755c.
//
// Solidity: function tokenMinAmount(address tokenAddress) view returns(uint256)
func (_LotteryFactory *LotteryFactoryCallerSession) TokenMinAmount(tokenAddress common.Address) (*big.Int, error) {
	return _LotteryFactory.Contract.TokenMinAmount(&_LotteryFactory.CallOpts, tokenAddress)
}

// TokenSupported is a free data retrieval call binding the contract method 0x062143f0.
//
// Solidity: function tokenSupported(address tokenAddress) view returns(bool)
func (_LotteryFactory *LotteryFactoryCaller) TokenSupported(opts *bind.CallOpts, tokenAddress common.Address) (bool, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "tokenSupported", tokenAddress)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// TokenSupported is a free data retrieval call binding the contract method 0x062143f0.
//
// Solidity: function tokenSupported(address tokenAddress) view returns(bool)
func (_LotteryFactory *LotteryFactorySession) TokenSupported(tokenAddress common.Address) (bool, error) {
	return _LotteryFactory.Contract.TokenSupported(&_LotteryFactory.CallOpts, tokenAddress)
}

// TokenSupported is a free data retrieval call binding the contract method 0x062143f0.
//
// Solidity: function tokenSupported(address tokenAddress) view returns(bool)
func (_LotteryFactory *LotteryFactoryCallerSession) TokenSupported(tokenAddress common.Address) (bool, error) {
	return _LotteryFactory.Contract.TokenSupported(&_LotteryFactory.CallOpts, tokenAddress)
}

// TokenToAtoken is a free data retrieval call binding the contract method 0xf49042c4.
//
// Solidity: function tokenToAtoken(address ) view returns(address)
func (_LotteryFactory *LotteryFactoryCaller) TokenToAtoken(opts *bind.CallOpts, arg0 common.Address) (common.Address, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "tokenToAtoken", arg0)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// TokenToAtoken is a free data retrieval call binding the contract method 0xf49042c4.
//
// Solidity: function tokenToAtoken(address ) view returns(address)
func (_LotteryFactory *LotteryFactorySession) TokenToAtoken(arg0 common.Address) (common.Address, error) {
	return _LotteryFactory.Contract.TokenToAtoken(&_LotteryFactory.CallOpts, arg0)
}

// TokenToAtoken is a free data retrieval call binding the contract method 0xf49042c4.
//
// Solidity: function tokenToAtoken(address ) view returns(address)
func (_LotteryFactory *LotteryFactoryCallerSession) TokenToAtoken(arg0 common.Address) (common.Address, error) {
	return _LotteryFactory.Contract.TokenToAtoken(&_LotteryFactory.CallOpts, arg0)
}

// Tokens is a free data retrieval call binding the contract method 0xe4860339.
//
// Solidity: function tokens(address ) view returns(uint256)
func (_LotteryFactory *LotteryFactoryCaller) Tokens(opts *bind.CallOpts, arg0 common.Address) (*big.Int, error) {
	var out []interface{}
	err := _LotteryFactory.contract.Call(opts, &out, "tokens", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Tokens is a free data retrieval call binding the contract method 0xe4860339.
//
// Solidity: function tokens(address ) view returns(uint256)
func (_LotteryFactory *LotteryFactorySession) Tokens(arg0 common.Address) (*big.Int, error) {
	return _LotteryFactory.Contract.Tokens(&_LotteryFactory.CallOpts, arg0)
}

// Tokens is a free data retrieval call binding the contract method 0xe4860339.
//
// Solidity: function tokens(address ) view returns(uint256)
func (_LotteryFactory *LotteryFactoryCallerSession) Tokens(arg0 common.Address) (*big.Int, error) {
	return _LotteryFactory.Contract.Tokens(&_LotteryFactory.CallOpts, arg0)
}

// AddProtocol is a paid mutator transaction binding the contract method 0x4a5ffab3.
//
// Solidity: function addProtocol(uint256 id, address lotteryBaseAddress) returns()
func (_LotteryFactory *LotteryFactoryTransactor) AddProtocol(opts *bind.TransactOpts, id *big.Int, lotteryBaseAddress common.Address) (*types.Transaction, error) {
	return _LotteryFactory.contract.Transact(opts, "addProtocol", id, lotteryBaseAddress)
}

// AddProtocol is a paid mutator transaction binding the contract method 0x4a5ffab3.
//
// Solidity: function addProtocol(uint256 id, address lotteryBaseAddress) returns()
func (_LotteryFactory *LotteryFactorySession) AddProtocol(id *big.Int, lotteryBaseAddress common.Address) (*types.Transaction, error) {
	return _LotteryFactory.Contract.AddProtocol(&_LotteryFactory.TransactOpts, id, lotteryBaseAddress)
}

// AddProtocol is a paid mutator transaction binding the contract method 0x4a5ffab3.
//
// Solidity: function addProtocol(uint256 id, address lotteryBaseAddress) returns()
func (_LotteryFactory *LotteryFactoryTransactorSession) AddProtocol(id *big.Int, lotteryBaseAddress common.Address) (*types.Transaction, error) {
	return _LotteryFactory.Contract.AddProtocol(&_LotteryFactory.TransactOpts, id, lotteryBaseAddress)
}

// AddToken is a paid mutator transaction binding the contract method 0x6daa9850.
//
// Solidity: function addToken(address tokenAddress, address aTokenAddress, uint256 minAmount) returns()
func (_LotteryFactory *LotteryFactoryTransactor) AddToken(opts *bind.TransactOpts, tokenAddress common.Address, aTokenAddress common.Address, minAmount *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.contract.Transact(opts, "addToken", tokenAddress, aTokenAddress, minAmount)
}

// AddToken is a paid mutator transaction binding the contract method 0x6daa9850.
//
// Solidity: function addToken(address tokenAddress, address aTokenAddress, uint256 minAmount) returns()
func (_LotteryFactory *LotteryFactorySession) AddToken(tokenAddress common.Address, aTokenAddress common.Address, minAmount *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.Contract.AddToken(&_LotteryFactory.TransactOpts, tokenAddress, aTokenAddress, minAmount)
}

// AddToken is a paid mutator transaction binding the contract method 0x6daa9850.
//
// Solidity: function addToken(address tokenAddress, address aTokenAddress, uint256 minAmount) returns()
func (_LotteryFactory *LotteryFactoryTransactorSession) AddToken(tokenAddress common.Address, aTokenAddress common.Address, minAmount *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.Contract.AddToken(&_LotteryFactory.TransactOpts, tokenAddress, aTokenAddress, minAmount)
}

// ChangeTokenMinAmount is a paid mutator transaction binding the contract method 0x7b53f86e.
//
// Solidity: function changeTokenMinAmount(address tokenAddress, uint256 newAmount) returns()
func (_LotteryFactory *LotteryFactoryTransactor) ChangeTokenMinAmount(opts *bind.TransactOpts, tokenAddress common.Address, newAmount *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.contract.Transact(opts, "changeTokenMinAmount", tokenAddress, newAmount)
}

// ChangeTokenMinAmount is a paid mutator transaction binding the contract method 0x7b53f86e.
//
// Solidity: function changeTokenMinAmount(address tokenAddress, uint256 newAmount) returns()
func (_LotteryFactory *LotteryFactorySession) ChangeTokenMinAmount(tokenAddress common.Address, newAmount *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.Contract.ChangeTokenMinAmount(&_LotteryFactory.TransactOpts, tokenAddress, newAmount)
}

// ChangeTokenMinAmount is a paid mutator transaction binding the contract method 0x7b53f86e.
//
// Solidity: function changeTokenMinAmount(address tokenAddress, uint256 newAmount) returns()
func (_LotteryFactory *LotteryFactoryTransactorSession) ChangeTokenMinAmount(tokenAddress common.Address, newAmount *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.Contract.ChangeTokenMinAmount(&_LotteryFactory.TransactOpts, tokenAddress, newAmount)
}

// CreateLottery is a paid mutator transaction binding the contract method 0x5e15fc2e.
//
// Solidity: function createLottery(string _name, uint256 _protocolId, address _tokenAddress, uint256 _minAmountToDeposit, uint256 _durationInDays) returns()
func (_LotteryFactory *LotteryFactoryTransactor) CreateLottery(opts *bind.TransactOpts, _name string, _protocolId *big.Int, _tokenAddress common.Address, _minAmountToDeposit *big.Int, _durationInDays *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.contract.Transact(opts, "createLottery", _name, _protocolId, _tokenAddress, _minAmountToDeposit, _durationInDays)
}

// CreateLottery is a paid mutator transaction binding the contract method 0x5e15fc2e.
//
// Solidity: function createLottery(string _name, uint256 _protocolId, address _tokenAddress, uint256 _minAmountToDeposit, uint256 _durationInDays) returns()
func (_LotteryFactory *LotteryFactorySession) CreateLottery(_name string, _protocolId *big.Int, _tokenAddress common.Address, _minAmountToDeposit *big.Int, _durationInDays *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.Contract.CreateLottery(&_LotteryFactory.TransactOpts, _name, _protocolId, _tokenAddress, _minAmountToDeposit, _durationInDays)
}

// CreateLottery is a paid mutator transaction binding the contract method 0x5e15fc2e.
//
// Solidity: function createLottery(string _name, uint256 _protocolId, address _tokenAddress, uint256 _minAmountToDeposit, uint256 _durationInDays) returns()
func (_LotteryFactory *LotteryFactoryTransactorSession) CreateLottery(_name string, _protocolId *big.Int, _tokenAddress common.Address, _minAmountToDeposit *big.Int, _durationInDays *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.Contract.CreateLottery(&_LotteryFactory.TransactOpts, _name, _protocolId, _tokenAddress, _minAmountToDeposit, _durationInDays)
}

// RemoveProtocol is a paid mutator transaction binding the contract method 0xd4dc4e83.
//
// Solidity: function removeProtocol(uint256 id) returns()
func (_LotteryFactory *LotteryFactoryTransactor) RemoveProtocol(opts *bind.TransactOpts, id *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.contract.Transact(opts, "removeProtocol", id)
}

// RemoveProtocol is a paid mutator transaction binding the contract method 0xd4dc4e83.
//
// Solidity: function removeProtocol(uint256 id) returns()
func (_LotteryFactory *LotteryFactorySession) RemoveProtocol(id *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.Contract.RemoveProtocol(&_LotteryFactory.TransactOpts, id)
}

// RemoveProtocol is a paid mutator transaction binding the contract method 0xd4dc4e83.
//
// Solidity: function removeProtocol(uint256 id) returns()
func (_LotteryFactory *LotteryFactoryTransactorSession) RemoveProtocol(id *big.Int) (*types.Transaction, error) {
	return _LotteryFactory.Contract.RemoveProtocol(&_LotteryFactory.TransactOpts, id)
}

// RemoveToken is a paid mutator transaction binding the contract method 0x5fa7b584.
//
// Solidity: function removeToken(address tokenAddress) returns()
func (_LotteryFactory *LotteryFactoryTransactor) RemoveToken(opts *bind.TransactOpts, tokenAddress common.Address) (*types.Transaction, error) {
	return _LotteryFactory.contract.Transact(opts, "removeToken", tokenAddress)
}

// RemoveToken is a paid mutator transaction binding the contract method 0x5fa7b584.
//
// Solidity: function removeToken(address tokenAddress) returns()
func (_LotteryFactory *LotteryFactorySession) RemoveToken(tokenAddress common.Address) (*types.Transaction, error) {
	return _LotteryFactory.Contract.RemoveToken(&_LotteryFactory.TransactOpts, tokenAddress)
}

// RemoveToken is a paid mutator transaction binding the contract method 0x5fa7b584.
//
// Solidity: function removeToken(address tokenAddress) returns()
func (_LotteryFactory *LotteryFactoryTransactorSession) RemoveToken(tokenAddress common.Address) (*types.Transaction, error) {
	return _LotteryFactory.Contract.RemoveToken(&_LotteryFactory.TransactOpts, tokenAddress)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_LotteryFactory *LotteryFactoryTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _LotteryFactory.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_LotteryFactory *LotteryFactorySession) RenounceOwnership() (*types.Transaction, error) {
	return _LotteryFactory.Contract.RenounceOwnership(&_LotteryFactory.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_LotteryFactory *LotteryFactoryTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _LotteryFactory.Contract.RenounceOwnership(&_LotteryFactory.TransactOpts)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_LotteryFactory *LotteryFactoryTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _LotteryFactory.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_LotteryFactory *LotteryFactorySession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _LotteryFactory.Contract.TransferOwnership(&_LotteryFactory.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_LotteryFactory *LotteryFactoryTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _LotteryFactory.Contract.TransferOwnership(&_LotteryFactory.TransactOpts, newOwner)
}

// LotteryFactoryCreatedEventIterator is returned from FilterCreatedEvent and is used to iterate over the raw logs and unpacked data for CreatedEvent events raised by the LotteryFactory contract.
type LotteryFactoryCreatedEventIterator struct {
	Event *LotteryFactoryCreatedEvent // Event containing the contract specifics and raw log

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
func (it *LotteryFactoryCreatedEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LotteryFactoryCreatedEvent)
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
		it.Event = new(LotteryFactoryCreatedEvent)
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
func (it *LotteryFactoryCreatedEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LotteryFactoryCreatedEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LotteryFactoryCreatedEvent represents a CreatedEvent event raised by the LotteryFactory contract.
type LotteryFactoryCreatedEvent struct {
	ContractAddress    common.Address
	UserAddress        common.Address
	Name               string
	ProtocolId         *big.Int
	TokenAddress       common.Address
	TokenSymbol        string
	TokenDecimals      *big.Int
	EndDate            *big.Int
	MinAmountToDeposit *big.Int
	Raw                types.Log // Blockchain specific contextual infos
}

// FilterCreatedEvent is a free log retrieval operation binding the contract event 0x30d57b16d443af4975ce697472129c63b26cd2fbde467442c6dc3ba55c22cc81.
//
// Solidity: event CreatedEvent(address contractAddress, address userAddress, string name, uint256 protocolId, address tokenAddress, string tokenSymbol, uint256 tokenDecimals, uint256 endDate, uint256 minAmountToDeposit)
func (_LotteryFactory *LotteryFactoryFilterer) FilterCreatedEvent(opts *bind.FilterOpts) (*LotteryFactoryCreatedEventIterator, error) {

	logs, sub, err := _LotteryFactory.contract.FilterLogs(opts, "CreatedEvent")
	if err != nil {
		return nil, err
	}
	return &LotteryFactoryCreatedEventIterator{contract: _LotteryFactory.contract, event: "CreatedEvent", logs: logs, sub: sub}, nil
}

// WatchCreatedEvent is a free log subscription operation binding the contract event 0x30d57b16d443af4975ce697472129c63b26cd2fbde467442c6dc3ba55c22cc81.
//
// Solidity: event CreatedEvent(address contractAddress, address userAddress, string name, uint256 protocolId, address tokenAddress, string tokenSymbol, uint256 tokenDecimals, uint256 endDate, uint256 minAmountToDeposit)
func (_LotteryFactory *LotteryFactoryFilterer) WatchCreatedEvent(opts *bind.WatchOpts, sink chan<- *LotteryFactoryCreatedEvent) (event.Subscription, error) {

	logs, sub, err := _LotteryFactory.contract.WatchLogs(opts, "CreatedEvent")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LotteryFactoryCreatedEvent)
				if err := _LotteryFactory.contract.UnpackLog(event, "CreatedEvent", log); err != nil {
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

// ParseCreatedEvent is a log parse operation binding the contract event 0x30d57b16d443af4975ce697472129c63b26cd2fbde467442c6dc3ba55c22cc81.
//
// Solidity: event CreatedEvent(address contractAddress, address userAddress, string name, uint256 protocolId, address tokenAddress, string tokenSymbol, uint256 tokenDecimals, uint256 endDate, uint256 minAmountToDeposit)
func (_LotteryFactory *LotteryFactoryFilterer) ParseCreatedEvent(log types.Log) (*LotteryFactoryCreatedEvent, error) {
	event := new(LotteryFactoryCreatedEvent)
	if err := _LotteryFactory.contract.UnpackLog(event, "CreatedEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LotteryFactoryOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the LotteryFactory contract.
type LotteryFactoryOwnershipTransferredIterator struct {
	Event *LotteryFactoryOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *LotteryFactoryOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LotteryFactoryOwnershipTransferred)
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
		it.Event = new(LotteryFactoryOwnershipTransferred)
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
func (it *LotteryFactoryOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LotteryFactoryOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LotteryFactoryOwnershipTransferred represents a OwnershipTransferred event raised by the LotteryFactory contract.
type LotteryFactoryOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_LotteryFactory *LotteryFactoryFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*LotteryFactoryOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _LotteryFactory.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &LotteryFactoryOwnershipTransferredIterator{contract: _LotteryFactory.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_LotteryFactory *LotteryFactoryFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *LotteryFactoryOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _LotteryFactory.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LotteryFactoryOwnershipTransferred)
				if err := _LotteryFactory.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_LotteryFactory *LotteryFactoryFilterer) ParseOwnershipTransferred(log types.Log) (*LotteryFactoryOwnershipTransferred, error) {
	event := new(LotteryFactoryOwnershipTransferred)
	if err := _LotteryFactory.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
