import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
  .then (() => transition(SHOW))
  .catch(error => transition(ERROR_SAVE, true));

 }
function deleteSpot(id) {
  transition(DELETING, true);
  props
  .cancelInterview(props.id)
  .then (() => transition(EMPTY))
  .catch(error => transition(ERROR_DELETE, true));
}
return (
  <article className="appointment">
    <Header time={props.time} /> 
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && ( <Status message={"Saving..."} />)}
      {mode === DELETING && ( <Status message={"Deleting..."} />)}
      {mode ===  CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={deleteSpot}
          message={"Are you sure you want to delete?"}
        />)}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}
      {mode === ERROR_SAVE && (
        <Error
          message={"Error Saving"}
          onClose={back}
        />)}
      {mode === ERROR_DELETE && (
        <Error
          message={"Error Deleteing"}
          onClose={back}
        />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interview={props.interview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />)}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}
  </article>
  );
}