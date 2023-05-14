export function getEventGuests(data, event) {
  //... returns an array of appointments for that day  
  const filteredData = data.event_users.filter(each => each.event_id === event);

  let result = [];

  if (filteredData.length === 0) {

    return result;

  }

  for (let i of filteredData[0].event_users) {

    let x = data.event_users[i];
    
    result.push(x);
  }

  return result;

};