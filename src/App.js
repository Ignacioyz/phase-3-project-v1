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
import Popup from './Component/Popup1';


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


console.log(new Date)

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
  const [allEvents, setAllEvents] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false)
  const [clickEvent, setClickEvent] = useState({})
  const [clickEventArr, setClickEventArr] = useState([])

  useEffect(() => {
    getData()
  }, [])

  let events = []

  function getData() {
    fetch("http://localhost:4000/events")
      .then(response => response.json())
      .then(data => {
        events = data.map((item) => {
          const id = item.id
          const title = item.title
          const start = new Date(item.start)
          const end = new Date(item.end)

          return {
            id: id,
            title: title,
            start: start,
            end: end
          }
        })
        setAllEvents(events)
      })
  }

  function handleAddEvent() {
    fetch(`http://localhost:4000/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end
      })
    }).then(response => response.json())
      .then((newEvent) => setAllEvents([...allEvents, newEvent]))
  }


  function removeEventHandler(e) {
    console.log(e)
    console.log(`removed ${e.id}`)
    setAllEvents(allEvents.filter((event) => {
      return event.id !== e.id
    }))
    setButtonPopup(!buttonPopup)
  }

  function handlePopup(e) {
    setClickEvent(e)
    setClickEventArr(e)
    setButtonPopup(true)
  }

  console.log(allEvents)

  return (
    <div className="App">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input id='event-input' type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

        <DatePicker id='start-input' placeholderText='Start Date'
          selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })}
          showTimeSelect
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

      <Calendar
        localizer={localizer}
        events={allEvents}
        onSelectEvent={handlePopup}
        startAccessor="start" endAccessor="end"
        style={{ height: 800, margin: "50px" }}>
      </Calendar>

      <Popup trigger={buttonPopup}
        setTrigger={setButtonPopup}
        handleRemove={removeEventHandler}
        clickEvent={clickEvent}
        allEvents={allEvents}
        clickEventArr={clickEventArr}>
      </Popup>

    </div>
  );
}

export default App;
