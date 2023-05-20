import { createContext, useState } from "react";

export const friendContext = createContext();

export default function FriendProvider(props) {
  const previousPage = sessionStorage.getItem("page");
  const currentPage = previousPage ? JSON.parse(previousPage) : "profile";
  const [profileID, setProfileID] = useState(0);
  const [friendId, setFriendID] = useState(0);
  const [page, setPage] = useState(currentPage);

  const changeProfileId = (id) => {
    setProfileID(id);
  };

  const textFriendWithId = (id) => {
    setFriendID(id);
    setPage("chat");
  };

  const changePage = (pageName) => {
    sessionStorage.setItem("page", JSON.stringify(pageName));
    setPage(pageName);
  };

  const friendData = {
    friendId,
    page,
    textFriendWithId,
    changePage,
    profileID,
    changeProfileId,
  };

  return (
    <friendContext.Provider value={friendData}>
      {props.children}
    </friendContext.Provider>
  );
}
