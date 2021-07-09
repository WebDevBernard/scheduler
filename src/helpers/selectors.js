export function getAppointmentsForDay(state, day) {
  let result = []
  for (const i of state.days){
      // find state.days array with name matching provided day
    if (i.name === day) {
      // accessing the appointment array in state.days
      for (const j of i.appointments){
        // matching state.days.appointments array with state.appointments id's
        result.push(state.appointments[j])
      }
    }
  }
  //returns empty array if no match
  return result
}
