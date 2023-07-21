package model

type UserLottery struct {
	UserAddress    string
	LotteryAddress string
	Deposit        uint
}

type Lottery struct {
	Address      string `json:"contractAddress"`
	Name         string `json:"name"`
	ProtocolId   uint   `json:"protocolId"`
	TokenAddress string `json:"tokenAddress"`
	TokensInPool uint   `json:"lastTVL"`
	MinTokens    uint   `json:"minTokens"`
	Yield        uint   `json:"yield"`
	EndDate      uint   `json:"endDate"`
	Active       bool   `json:"active"`
	Winner       string `json:"winner"`
}
