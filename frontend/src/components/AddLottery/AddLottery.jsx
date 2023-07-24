import { React, useState, useEffect } from 'react';
import {getTokenPrice} from '../../providers/OracleProvider';
import { createLottery } from '../../providers/LotteryProvider';
import { fetchAPY } from '../../providers/APYInfoProvider';
import './AddLottery.scss';

const AddLottery = ({wallet}) => {
    const [name, setName] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);
    const [minDepositAmount, setMinDepositAmount] = useState(0);
    const [token, setToken] = useState('DAI');
    const [protocol, setProtocol] = useState('Aave V3');
    const [date, setDate] = useState(new Date());

    const [apy, setAPY] = useState(0);
    const [expectedPrize, setExpectedPrize] = useState(0);

    function dateDifference(date1, date2) {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const differenceInDays = (date2.getTime() - date1.getTime()) / oneDayInMilliseconds;
      
        return differenceInDays;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        const daysBetween = dateDifference(new Date(), new Date(date));
        if (daysBetween < 10) {
            alert("Please input a date that is at least 10 days in the future!");
            return;
        }

        await createLottery(wallet, name, protocol, token, minDepositAmount, depositAmount, daysBetween);
    }

    useEffect(() => {

        async function getExpectedPrice() {
            const valueInUsd = await getTokenPrice(token) * depositAmount;
            const expectedPrize = valueInUsd * (1 + (apy * dateDifference(new Date(), new Date(date)) / 365) / 100);
            setExpectedPrize(expectedPrize);
            
            const resultAPY = await fetchAPY(protocol, token) / 10**25;
            setAPY(resultAPY);
        }

        getExpectedPrice();

    }, [apy, date, token, depositAmount]);

    return (
        <div className="add-lottery">
            <h1>Add Lottery</h1>
            <div className="lottery-card">
                <form onSubmit={onSubmitHandler}>
                    <label className='label name'>Name</label>
                    <input className='addLotteryInput' type='text' id='name' name='name' placeholder='Insert Lottery Name' 
                        onChange={e => setName(e.target.value)} required/>

                    <label className='label value'>Minimum value to deposit</label>
                    <br></br>
                    <h4 className='tokenandprotocol'>(In {token} for {protocol} protocol)</h4>
                    
                    <div className='flexRowDiv'>
                        <input className='addLotteryInput' type="number" step="any" placeholder="0.0"
                            onChange={e => setMinDepositAmount(e.target.value)} required/>
                        <select className="select token" id="token" name="token" defaultValue={"DAI"} 
                            onChange={e => setToken(e.target.value)}>
                                <option value="DAI">DAI</option>
                                <option value="USDC">USDC</option>
                                <option value="wETH">wETH</option>
                        </select>
                    </div>
                    

                    <div className='protocol'>
                        <select className="select protocol" id="protocol" name="protocol" defaultValue="aave"
                            onChange={e => setProtocol(e.target.value)}>
                                <option value="Aave V3">Aave V3</option>
                        </select>
                    </div>

                    <label className='label date'>End Date</label>
                    <input className='addLotteryInput' type='date' id='date' name='date' 
                        onChange={e => setDate(e.target.value)} required/>

                    <button className='submitButton'>Submit</button>
                </form>

                <div className='expectedDiv'>
                    <div className='expected yield'>
                        <h3>Expected yield:</h3>
                        <h3 className='expectedValue'>{apy?.toFixed(2)}%</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLottery;
