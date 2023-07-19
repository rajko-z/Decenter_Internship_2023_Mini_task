import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getAllActiveLotteries, getMyLotteries } from '../../providers/LotteryProvider';
import Lottery from '../Lottery/Lottery';
import './LotteryCollection.css';

const LotteryCollection = (props) => {

  const [lotteriesData, setLotteriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result;

      try {
        switch(props.currPage) {
          case 'all': result = await getAllActiveLotteries(); break;
          case 'my-lotteries': result = await getMyLotteries(props.wallet); break;
          default: result = null;
        }

        console.log("result: ", result)
        if(result)
          setLotteriesData(result);
      } catch (error) {
        console.log(error);
      }
    };

    setLotteriesData(null)
    fetchData();
  }, [props.currPage]);
  
  return (
    <>
      <div className="active-lotteries">
        {lotteriesData && lotteriesData.map((lott, index) => (
          <Lottery key={index} lottery={lott} />
        )) }
      </div>
    </>
  );
};

export default LotteryCollection;