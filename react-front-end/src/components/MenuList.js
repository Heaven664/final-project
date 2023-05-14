import React from "react";

import MenuListItem from "components/MenuListItem.js";

export default function DayList(props) {
  const dayArray = props.menus;
  const daysList = dayArray.map((eachDay) => {
  return (
    <MenuListItem
      key={eachDay.id}
      name={eachDay.name}
      spots={eachDay.spots}
      selected={eachDay.name === props.day}
      setDay={() => props.setDay(eachDay.name)}
    />)
  });

  return (
    <ul>
      {daysList}
    </ul>
  );

}

