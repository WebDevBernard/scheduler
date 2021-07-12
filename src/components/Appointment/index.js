import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY    
  )
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then (() => transition(SHOW));
  }
  function deleteSpot(id) {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then (() => transition(EMPTY));
  }
  return (
    <article className="appointment">
      <Header time={props.time} /> 
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && ( <Status message={"Saving..."} />)}
      {mode === DELETING && ( <Status message={"Deleting..."} />)}
      {mode ===  CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onConfirm={deleteSpot}
          onCancel={back}
          />
      )}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    interview={props.interview}
    onDelete={() => transition(CONFIRM)}
    onEdit={() => transition(EDIT)}
  />
)}
{mode === CREATE && (
  <Form
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}
  />
)}
    </article>
  )
}