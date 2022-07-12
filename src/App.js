import './App.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


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
    title: "Bach-Booty-Call",
    // allDay: true,
    start: new Date(2022, 6, 16),
    end: new Date(2022, 6, 17)
  },
  {
    title: "Project-Presentation",
    start: new Date(2022, 6, 15, 12),
    end: new Date(2022, 6, 15, 13)
  },
  {
    title: "Bach Doctor Apointment (for Gonorrhea)",
    start: new Date(2022, 6, 14),
    end: new Date(2022, 6, 14)
  },
  {
    title: "Ignacio's interview @ Google",
    start: new Date(2022, 6, 18),
    end: new Date(2022, 6, 18)
  },
]



function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
  const [allEvents, setAllEvents] = useState(events)





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



// function removeEvent(){

// }

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
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
        startAccessor="start" endAccessor="end"
        style={{ height: 800, margin: "50px" }} 
        />
    </div>
  );
}

export default App;
