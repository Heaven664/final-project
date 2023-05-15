import { useState, useEffect } from "react";
import axios from "axios";

export default function useEventsData(eventID, userID) {

  const [state, setState] = useState({
    day: "Monday",
    events: [],
    fundraisers: {},
    event_users: {},
    eventsInfo: {},
    usersInfo: {}
  });

  // const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {

    Promise.all([      
      axios.get('/api/events'),
      axios.get('/api/fundraisers'),
      axios.get('/api/event-users'),
      axios.get(`/api/events/${eventID}`),
      axios.get(`/api/users/${userID}`)
    ]).then((all) => {
      console.log(all)
      setState(prev => ({ ...prev, events: all[0].data, fundraisers: all[1].data, event_users: all[2].data, eventsInfo:all[3].data, usersInfo:all[4].data }));
    });
  }, []);

  return { state };
};