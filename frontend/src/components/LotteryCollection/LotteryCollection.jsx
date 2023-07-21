import React, { useState, useEffect } from 'react';
import { getHistory } from '../../providers/HistoryProvider';
import { getAllLotteries, getUserLotteries } from '../../providers/LotteryProvider';
import ArchivedLottery from '../Lottery/ArchivedLottery';
import Lottery from '../Lottery/Lottery';
import './LotteryCollection.scss';

const LotteryCollection = (props) => {

  const [lotteriesData, setLotteriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result;

      try {
        switch(props.currPage) {
          case 'all': result = await getAllLotteries(); break;
          case 'my-lotteries': result = await getUserLotteries(props.wallet); break;
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
      {props.currPage === 'history' ? (
        // Render archived lotteries map if currPage is 'history'
        lotteriesData && lotteriesData.map((lott, index) => (
          <ArchivedLottery key={index} archivedLottery={lott} />
        ))
      ) : (
        // Render regular lotteries map for other pages
        lotteriesData && lotteriesData.map((lott, index) => (
          <Lottery key={index} lottery={lott} wallet={props.wallet} />
        ))
      )}
      </div>
    </>
  );
};

export default LotteryCollection;