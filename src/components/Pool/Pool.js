import PoolInfo from "../Dashboard/PoolInfo/PoolInfo";
import PoolInteractor from "../Dashboard/PoolInteractor/PoolInteractor";
import React, {useEffect, useState} from "react";
import {useContractService} from "../../context/ContractContext";
import {useNavigate, useParams} from "react-router-dom";
import './Pool.css';

export const Pool = () => {
  const { visiblePoolIds } = useContractService();
  const navigate = useNavigate();
  const [firstVisiblePoolId, setFirstVisiblePoolId] = useState(null);
  const [lastVisiblePoolId, setLastVisiblePoolId] = useState(null);
  const { poolId } = useParams();

  const handleSelectNextPool = () => {
    const currentIndex = visiblePoolIds.indexOf(poolId);
    const id = visiblePoolIds[currentIndex + 1];
    navigate(`/pool/${id}`);
  }

  const handleSelectPrevPool = () => {
    const currentIndex = visiblePoolIds.indexOf(poolId);
    const id = visiblePoolIds[currentIndex - 1];
    navigate(`/pool/${id}`);
  }

  useEffect(() => {
    setFirstVisiblePoolId(visiblePoolIds[0]);
    setLastVisiblePoolId(visiblePoolIds[visiblePoolIds.length - 1]);
  }, [visiblePoolIds]);


  return (
    <div className={'pool-container'}>
      {visiblePoolIds.length > 1 && <div class="button-container">
        <button
          className={`nav-button prev-button ${
            Number(poolId) === firstVisiblePoolId ? 'disabled' : ''
          }`}
          onClick={handleSelectPrevPool}
        >
          ← Prev
        </button>
        <button
          className={`nav-button next-button ${
            Number(poolId) === lastVisiblePoolId ? 'disabled' : ''
          }`}
          onClick={handleSelectNextPool}
        >
          Next →
        </button>
      </div>
      }
      <div class={"pool-body"}>
        <div className='main-container-left'>
          <PoolInfo/>
        </div>
        <div className='main-container-right'>
          <PoolInteractor/>
        </div>
      </div>
    </div>
  )
}