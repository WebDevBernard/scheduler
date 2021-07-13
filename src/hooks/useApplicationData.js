import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

// console.log("BEFORE: ", state.days[0].spots)
  // your code to update the spots goes here
// console.log("AFTER: ", state.days[0].spots)
  
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviews: {}
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
    appointments
  });
})
}

const setDay = day => setState({ ...state, day });

useEffect(() => {
  Promise.all([
    axios.get("api/days"),
    axios.get('api/appointments'),
    axios.get('api/interviewers')
  ]).then(axios.spread((response1, response2, response3) => {
    setState(prev => ({...prev, days: response1.data, appointments: response2.data, interviewers: response3.data }))
  }))
  .catch(error =>
    console.log(error));
}, []);

return { state, setDay, bookInterview, cancelInterview }
};