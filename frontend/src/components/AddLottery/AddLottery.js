import { React, useState, useEffect } from 'react';

import './AddLottery.css';
import {getTokenPrice} from '../../providers/OracleProvider.js';

const AddLottery = () => {
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [token, setToken] = useState('DAI');
    const [protocol, setProtocol] = useState('aave');
    const [date, setDate] = useState(new Date());

    const [apy, setAPY] = useState(3.4);
    const [expectedPrize, setExpectedPrize] = useState(0);

    function dateDifference(date1, date2) {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const differenceInDays = (date2.getTime() - date1.getTime()) / oneDayInMilliseconds;
      
        return differenceInDays;
    }

    async function isValueAtLeastHundredsOfDollars(value, token) {
        // Convert Token to USD and check if it is at least 100
        const valueInUsd = await getTokenPrice(token) * value;
        return valueInUsd >= 100;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // console.log(name, value, token, protocol, date);
        
        if (dateDifference(new Date(), new Date(date)) < 10) {
            alert("Please input a date that is at least 10 days in the future!");
            return;
        }
        
        if (!await isValueAtLeastHundredsOfDollars(value, token)) {
            alert("Please input a value that is at least 100 dollars!");
            return;
        }

        alert("Lottery added!");
        window.location.reload(false);
    }

    useEffect(() => {
        // console.log(name, value, token, protocol, date);
        // console.log(apy);
        async function getExpectedPrice() {
            const valueInUsd = await getTokenPrice(token) * value;
            console.log(dateDifference(new Date(), new Date(date)))
            const expectedPrize = valueInUsd * (1 + (apy * dateDifference(new Date(), new Date(date)) / 365) / 100);

            console.log("Debug", (apy * dateDifference(new Date(), new Date(date)) / 365));
            console.log(expectedPrize);
            setExpectedPrize(expectedPrize);
        }

        getExpectedPrice();

        console.log(expectedPrize);
    }, [apy, date, token, value]);

    return (
        <div className="add-lottery">
            <h1>Add Lottery</h1>
            <div className="lottery-card">
                <form onSubmit={onSubmitHandler}>
                    <label className='label name'>Name</label>
                    <input className='input name' type='text' id='name' name='name' placeholder='Insert Lottery Name' 
                        onChange={e => setName(e.target.value)} required/>

                    <label className='label value'>Value</label>

                    <div className='flexRowDiv'>
                        <input className='input value' type="number" step="any" placeholder="0.0"
                            onChange={e => setValue(e.target.value)} required/>
                        <select className="select token" id="token" name="token" defaultValue={"DAI"} 
                            onChange={e => setToken(e.target.value)}>
                                <option value="DAI">DAI</option>
                                <option value="USDC">USDC</option>
                        </select>
                    </div>

                    <div className='protocol'>
                        <select className="select protocol" id="protocol" name="protocol" defaultValue="aave"
                            onChange={e => setProtocol(e.target.value)}>
                                <option value="aave">Aave v3</option>
                        </select>
                    </div>

                    <label className='label date'>End Date</label>
                    <input className='input date' type='date' id='date' name='date' 
                        onChange={e => setDate(e.target.value)} required/>

                    <button className='submitButton'>Submit</button>
                </form>

                <div className='expectedDiv'>
                    <div className='expected yield'>
                        <h3>Expected yield:</h3>
                        <h3 className='expectedValue'>{apy}%</h3>
                    </div>
                    <div className='expected prize'>
                        <h3>Expected win prize:</h3>
                        <h3 className='expectedValue'>{expectedPrize.toFixed(4)} USD</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLottery;
