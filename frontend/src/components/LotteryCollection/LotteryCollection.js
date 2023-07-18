import { React, useState, useEffect } from 'react';
// import { getActiveLotteries } from '../../providers/LotteryInfoProvider';
import Lottery from '../Lottery/Lottery';
import './LotteryCollection.css';

const ActiveLotteries = () => {

  const [lotteriesData, setLotteriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = null;
        // const result = await getActiveLotteries();
        if (result) 
        setLotteriesData(result);
        
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="active-lotteries">
      { lotteriesData && lotteriesData.map((lottery, index) => (
        <Lottery key={index} lottery={lottery} />
      )) }

        <div className='lottery'>
          <div className='lottery__header'>
            <h3>Lottery Title</h3>
          </div>
          <div className='lottery_body'>
            <h3>0.8 ETH</h3>
          </div>
          <div className='lottery_footer'>
            <h3>End Date: 03.06.2023.</h3>
          </div>
        </div>
    </div>


  );
};

export default ActiveLotteries;