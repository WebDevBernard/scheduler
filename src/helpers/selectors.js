export function getAppointmentsForDay(state, day) {
  let result = []
  for (const i of state.days){
    if (i.name === day) {
      for (const j of i.appointments){
        result.push(state.appointments[j])
      }
    }
  }
  return result
}

export function getInterview(state, interview) {
  if (interview){
    const interviewData = state.interviewers[interview.interviewer]
    const studentData = interview.student
    return {interviewer: interviewData, student: studentData}
  }
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