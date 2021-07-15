import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
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
          // console.log("BEFORE: ", state.days[0].spots)
          updateSpots(id)
          // console.log("AFTER: ", state.days[0].spots)
        })
    }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
      }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
      return axios.delete(`/api/appointments/${id}`)
        .then(() => {
          setState({
          ...state,
          appointments,
          });
          // console.log("BEFORE: ", state.days[0].spots)
          updateSpots(id)
          // console.log("AFTER: ", state.days[0].spots)
        })
    }
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev, days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data }));
    })
    .catch(error =>
      console.log(error));
  }, []);

  const updateSpots = (id) => {
    axios.get("/api/days")
    .then(response => {
      setState(prev => 
        ({ ...prev, days: response.data}))
    })
    .catch(error =>
      console.log(error));
  }

  const setDay = day => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview }
  };