import React from 'react'
import PopupContent from './PopupContent';

function Popup({ trigger, setTrigger, handleRemove, clickEvent, allEvents, getData}) {

    return (trigger)
        ? (<div className='popup'>
            <div className='popup-inner'>
                <button id='close-btn-id' className='close-btn' onClick={() => setTrigger(false)}>❌</button>
                <PopupContent key={clickEvent.id} 
                eventDetail = {clickEvent} getData = {getData}/>
                <button id='remove-btn-id' onClick={() => handleRemove(clickEvent)}>🗑</button>
            </div>
        </div>)
        : "";
}

export default Popup