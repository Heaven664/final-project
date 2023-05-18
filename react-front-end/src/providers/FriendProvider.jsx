import { createContext, useState } from "react";

export const friendContext = createContext();

export default function FriendProvider(props) {

  const previousPage = sessionStorage.getItem('page');
  const currentPage = previousPage ? JSON.parse(previousPage) : 'profile'

  const [friendId, setFriendID] = useState(0);
  const [page, setPage] = useState(currentPage);

  const textFriendWithId = (id) => {
    setPage("chat");
    setFriendID(id);
  };

  const changePage = (pageName) => {
    sessionStorage.setItem('page', JSON.stringify(pageName));
    setPage(pageName);
  };

  const friendData = { friendId, page, textFriendWithId, changePage };

  return (
    <friendContext.Provider value={friendData}>
      {props.children}
    </friendContext.Provider>
  );
}
