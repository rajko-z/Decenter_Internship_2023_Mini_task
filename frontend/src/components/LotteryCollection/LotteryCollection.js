import React, { useState, useEffect } from 'react';
import { getActiveLotteries, getMyActiveLotteries, getMyPastLotteries } from '../../providers/LotteryInfoProvider';
import Lottery from '../Lottery/Lottery';
import './LotteryCollection.css';

const ActiveLotteries = (props) => {

  const { request, wallet } = props;
  const [lotteriesData, setLotteriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result;

      try {
        switch(request) {
          case 'all': result = await getActiveLotteries(); break;
          case 'my-active': result = await getMyActiveLotteries(wallet); break;
          case 'my-past': result = await getMyPastLotteries(wallet); break;
          default: result = null;
        }

        if (result) 
          setLotteriesData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [request, wallet]);
  
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