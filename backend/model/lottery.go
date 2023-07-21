package model

type UserLottery struct {
	UserAddress    string
	LotteryAddress string
	Deposit        uint
}

type Lottery struct {
	Address       string `json:"contractAddress"`
	Name          string `json:"name"`
	ProtocolId    uint   `json:"protocolId"`
	TokenSymbol   string `json:"tokenSymbol"`
	TokenAddress  string `json:"tokenAddress"`
	TokenDecimals uint   `json:"tokenDecimals"`
	TokensInPool  uint   `json:"lastTVL"`
	MinTokens     uint   `json:"minTokens"`
	Yield         uint   `json:"yield"`
	EndDate       uint   `json:"endDate"`
	Active        bool   `json:"active"`
	Winner        string `json:"winner"`
}
