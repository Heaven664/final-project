import React from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Error from "./Error";
import Confirm from "./Confirm";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;


  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function destory() {
    transition(DELETING, true);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )
      }

      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onSave={save}
          onCancel={back}
          student={interview.student}
        />
      )
      }

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )
      }

      {mode === SAVING && (
        <Status
          message={"Saving"}
        // onComplete={() => transition(SHOW)}
        />
      )
      }

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onConfirm={destory}
          onCancel={back}
        />
      )
      }

      {mode === DELETING && (
        <Status
          message={"Deleting"}
        // onComplete={() => transition(EMPTY)}
        />
      )
      }

      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete appointment"}
          onClose={back}
        />
      )
      }

      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save appointment"}
          onClose={back}
        />
      )
      }

    </article>
  );
}