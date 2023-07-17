import { React, useState, useEffect } from 'react';
// import { getActiveLotteries } from '../../providers/LotteryInfoProvider';
import Lottery from '../Lottery/Lottery';

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
    </div>
  );
};

export default ActiveLotteries;