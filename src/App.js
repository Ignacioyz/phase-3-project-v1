import './App.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Popup from './Component/Popup';


const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  {
    id: 1,
    title: "Bach-Booty-Call",
    start: new Date(2022, 6, 16),
    end: new Date(2022, 6, 17)
  },
  {
    id: 2,
    title: "Project-Presentation",
    start: new Date(2022, 6, 15, 12),
    end: new Date(2022, 6, 15, 13)
  },
  {
    id: 3,
    title: "Bach Doctor Apointment (for Gonorrhea)",
    start: new Date(2022, 6, 14),
    end: new Date(2022, 6, 14)
  },
  {
    id: 4,
    title: "Ignacio's interview @ Google",
    start: new Date(2022, 6, 18),
    end: new Date(2022, 6, 18)
  },
]



function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
  const [allEvents, setAllEvents] = useState([])

function getData() {
  fetch("http://localhost:4000/events")
.then(response => response.json())
.then(data => setAllEvents(data))
}

console.log(allEvents)

useEffect(() => {
  getData()
},[])



  // function postNewEvent(e){
  //     fetch('', {
  //       method:'POST',
  //       headers: {
  //         'Accept':'application/json',
  //         'Content-Type':'application/json'},
  //         body: JSON.stringify(
  //           ({
  //           'name': e.target.title.value,
  //           'start': e.target.start.value,
  //           'end': e.target.end.value,
  //   }),
  // )
  //   })  
  // }


  console.log(allEvents)
  function removeEventHandler(e){
    console.log(`removed ${e.id}`)
    setAllEvents(allEvents.filter((event) => {
      return event.id !== e.id
    }))
  }


  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
  }

  function handlePopup() {
    setButtonPopup(true)
  }

  return (
    <div className="App">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input id='event-input' type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

        <DatePicker id='start-input' placeholderText='Start Date'
          selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa" />

        <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa" />

        <button id='submit-button' onClick={handleAddEvent} >Add Event</button>
      </div>

      <Calendar localizer={localizer}
        events={allEvents}
        onSelectEvent={handlePopup}
        startAccessor="start" endAccessor="end"
        style={{ height: 800, margin: "50px" }} 
        />

      <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
        <h3>My Popup</h3>
      </Popup>
    </div>
  );
}

export default App;
