import React from 'react'

function Popup(props) {

    return (props.trigger)
        ? (<div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>❌</button>
                {props.children}
                <button onClick={() => props.removeEvent}>🗑</button>
            </div>
        </div>)
        : "";
}

export default Popup