import React, {useState} from 'react';
import './GrinderAIAgent.css';
import GrinderAIDeposit from './GrinderAIDeposit/GrinderAIDeposit';
import MintIntent from './MintIntent/MintIntent';
import GrinderAIChat from './GrinderAIChat/GrinderAIChat';

function GrinderAIAgent ({ networkConfig }) {

    return (
        <>
          {/* <div className='grinderai-container'> */}
            {/* <div className='grinderai-container-left'> */}
              {/* <div className='grinder-container-left-title'> EXPLICIT GRINDER AI INTERACTION </div> */}
            {/* </div> */}
            {/* <div className='grinderai-container-right'> */}
              {/* <div className='grinder-conteiner-right-title'> CHAT GRINDER AI  INTERACTION </div> */}
            {/* </div> */}
          {/* </div> */}
          <div className='grinderai-container'>
            <div className='grinderai-container-left'>
            <MintIntent networkConfig={networkConfig} />
              {/* <GrinderAIDeposit networkConfig={networkConfig} /> */}
                {/* <div className='grinderai-intent-mint'> */}
                  {/* <MintIntent networkConfig={networkConfig} /> */}
                {/* </div> */}
            </div>
            <div className='grinderai-container-right'>
            <GrinderAIDeposit networkConfig={networkConfig} />
              {/* <GrinderAIChat networkConfig={networkConfig}/> */}
            </div>
          </div>
        </>
      );

}

export default GrinderAIAgent;