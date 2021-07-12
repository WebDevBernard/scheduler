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

export function getInterview(state, interview) {
  if (interview){
    // returns id, name, avatar
    const interviewData = state.interviewers[interview.interviewer]
    // returns student name
    const studentData = interview.student
    // returns an object with interview data
    return {interviewer: interviewData, student: studentData}
  }
  // returns null if no interview is booked
  return null
}

export function getInterviewersForDay(state, day) {
  let result = []
  for (const i of state.days){
    if (i.name === day) {
      for (const j of i.interviewers){
        result.push(state.interviewers[j])
      }
    }
  }
  return result
}