import { useState, useEffect } from "react";
import axios from "axios";

export default function useEventsData() {

  const [state, setState] = useState({
    day: "Monday",
    events: [],
    fundraisers: {},
    event_users: {}
  });

  // const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {

    Promise.all([      
      axios.get('/api/events'),
      axios.get('/api/fundraisers'),
      axios.get('/api/event-users')
    ]).then((all) => {
      console.log(all)
      setState(prev => ({ ...prev, events: all[0].data, fundraisers: all[1].data, event_users: all[2].data }));
    });
  }, []);

  return { state };
};
