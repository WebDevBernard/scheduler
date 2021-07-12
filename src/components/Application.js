import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment"
import "components/Application.scss";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {}
  });
  
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
    setState({
      ...state,
      appointments
    });
  })
  }

  const setDay = day => setState({ ...state, day });

  const interviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });
  
useEffect(() => {
  Promise.all([
    axios.get("api/days"),
    axios.get('api/appointments'),
    axios.get('api/interviewers')
  ]).then(axios.spread((response1, response2, response3) => {
    setState(prev => ({...prev, days: response1.data, appointments: response2.data, interviewers: response3.data }))
    console.log(response3.data)
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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
