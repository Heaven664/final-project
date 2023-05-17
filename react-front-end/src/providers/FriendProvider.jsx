import { createContext, useState } from "react";

export const friendContext = createContext();

export default function FriendProvider(props) {
  const [friendId, setFriendID] = useState(0);
  const [page, setPage] = useState("profile");

  const textFriendWithId = (id) => {
    setPage("chat");
    setFriendID(id);
  };

  const changePage = (pageName) => {
    setPage(pageName);
  };

  const friendData = { friendId, page, textFriendWithId, changePage };

  return (
    <friendContext.Provider value={friendData}>
      {props.children}
    </friendContext.Provider>
  );
}
