package model

type UserLottery struct {
	UserAddress    string
	LotteryAddress string
	Deposit        uint
}

type Lottery struct {
	Address       string
	Name          string
	ProtocolId    uint
	TokenSymbol   string
	TokenDecimals uint
	TokensInPool  uint
	MinTokens     uint
	Yield         uint
	EndDate       uint
	Active        bool
	Winner        string
}
