import React, { useState, useEffect } from 'react';
import { getHistory } from '../../providers/HistoryProvider';
import { getAllActiveLotteries, getMyLotteries } from '../../providers/LotteryProvider';
import Lottery from '../Lottery/Lottery';
import './LotteryCollection.scss';

const LotteryCollection = (props) => {

  const [lotteriesData, setLotteriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result;

      try {
        switch(props.currPage) {
          case 'all': result = await getAllActiveLotteries(); break;
          case 'my-lotteries': result = await getMyLotteries(props.wallet); break;
          case 'history': result = await getHistory(); break;
          default: result = null;
        }

        if(result)
          setLotteriesData(result);
      } catch (error) {
        console.error(error);
      }
    };

    setLotteriesData(null)
    fetchData();
  }, [props.currPage]);
  
  return (
    <>
      <div className="active-lotteries">
        {lotteriesData && lotteriesData.map((lott, index) => (
          <Lottery key={index} lottery={lott} currPage={props.currPage} wallet={props.wallet}/>
        )) }
      </div>
    </>
  );
};

export default LotteryCollection;