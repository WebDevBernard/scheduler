import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment"
import "components/Application.scss";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
}

useEffect(() => {

  Promise.all([
    axios.get("api/days"),
    axios.get('api/appointments'),
    axios.get('api/interviewers')
  ]).then(axios.spread((response1, response2, response3) => {
    setState(prev => ({...prev, days: response1.data, appointments: response2.data, interviewers: response3.data }))
    // ]).then((all) => {
    // setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  }))
  .catch(error =>
    console.log(error));
}, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        
        {dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
