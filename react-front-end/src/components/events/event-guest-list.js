import React from "react";
import eventGuestListItem from "./event-guest-list-item";
import "components/event-guest-list.scss";
import classNames from "classnames";
import propTypes from 'prop-types';

export default function InterviewerList(props) {

  const interviewerClass = classNames(
    "interviewers_item",
    { "interviewers__item--selected": props.selected }
  );

  const objToArray = (obj) => Object.assign([], Object.values(obj));

  const InterviewersProps = objToArray(props.interviewers).map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className={interviewerClass}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewersProps}</ul>
    </section>
  );
}

//Validate interviewers as an array
InterviewerList.propTypes = {
  interviewers: propTypes.array.isRequired
};