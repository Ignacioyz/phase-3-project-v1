import React, { useState, useEffect } from 'react'
import DateTimePicker from 'react-datetime-picker'

function PopupContent({eventDetail, getData}) {
    console.log(getData)

    const [form, setForm] = useState(eventDetail.title)
    const [startForm, setStartForm] = useState(eventDetail.start)
    const [endForm, setEndForm] = useState(eventDetail.end)

    function handleChangeForm(e){
        setForm(e.target.value)
        getData()
    }

    function handleChangeStartForm(e){
        setStartForm(e.target.value)
    }

    function handleChangeEndForm(e){
        setEndForm(e.target.value)
    }

    useEffect(() => {
        
        const newTitle = {...eventDetail, title : form}
        console.log(newTitle)
        
        if(eventDetail){
            fetch(`http://localhost:4000/events/${eventDetail.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(newTitle)
        })
        }
    },[form])

    useEffect(() => {
        const newStartDate = {...eventDetail, start : startForm}
        console.log(newStartDate)
        
        if(eventDetail){
            fetch(`http://localhost:4000/events/${eventDetail.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(newStartDate)
        })
        }
    },[startForm])

    useEffect(() => {
        const newEndDate = {...eventDetail, end : endForm}
        console.log(newEndDate)
        
        if(eventDetail){
            fetch(`http://localhost:4000/events/${eventDetail.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(newEndDate)
        })
        }
    },[endForm])

    return (
        <div>
            <h3>My Event</h3>
            <h4> Title:
                <textarea id='title-textarea' onChange = {handleChangeForm}>{eventDetail.title}
                </textarea></h4>
            <h4>Starts: {eventDetail.start.toString()}
            <DateTimePicker onChange={handleChangeStartForm}/></h4>
            <h4>Ends: {eventDetail.end.toString()}
            <DateTimePicker onChange={handleChangeEndForm} /></h4>
            
        </div>
    )
}

export default PopupContent