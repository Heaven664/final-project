import { useState, useEffect } from "react";
import axios from "axios";
import { response } from "express";

export default function useEventsData() {

  const [state, setState] = useState({
    day: "Monday",
    events: [],
    fundraisers: {},
    friendlists: {}
  });

  // const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {

    Promise.all([      
      axios.get('/api/events'),
      axios.get('/api/fundraisers'),
      axios.get('/api/friendlists')
    ]).then((all) => {
      console.log(all)
      setState(prev => ({ ...prev, events: all[0].data, fundraisers: all[1].data, friendlists: all[2].data }));
    });
  }, []);

  return { state };
};
