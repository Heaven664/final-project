import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import FriendList from './FriendList';
import './Friend.scss';


export default function Friend(props) {
  // change the search list/ myfriend <-> database
  const [selectedSection, setSelectedSection] = useState("myFriends");
  function handleSectionClick(section) {
    setSelectedSection(section);
  }


  return (
    <div className="friend-box background-box-color border-radius20 box-shadow">
      <div className="search-section display-flex">
        {selectedSection === 'myFriends' &&
          <>
            <div className="btn">
              <button
                className={`background-fundraiser-color btn-style
            ${selectedSection === 'addFriend' ? '--selected' : ''}`}
                onClick={() => handleSectionClick('addFriend')}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Add Friend
              </button>
            </div>
            <div className="search-bar ">
              <form>
                <span className="font20"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input 
                  type="text" name="name" className="border-radius15"
                  // onChange={(e) => setState({ ...state, name: e.target.value })}
                />
              </form>
            </div>
          </>
        }
        {selectedSection === 'addFriend' &&
          <>
            <div className="btn">
              <button
                className={`background-fundraiser-color btn-style
                ${selectedSection === 'myFriends' ? '--selected' : ''}`}
                onClick={() => handleSectionClick('myFriends')}
              >
                <FontAwesomeIcon icon={faUsers} /> My Friend
              </button>
            </div>
            <div className="search-bar ">
              <form>
                <span className="font20"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input 
                  type="text" name="name" className="border-radius15"
                  // onChange={(e) => setState({ ...state, name: e.target.value })}
                />
              </form>
            </div>
          </>
        }
      </div>
      <FriendList handleButtonClick={props.handleButtonClick}/>
      {/* <div className="friend-list border-radius15 display-flex">
        <div className="friend-user display-flex">
          <div className="thumbnail" style={{ backgroundImage: "url(http://localhost:8080/images/user-image-3.jpg)" }}></div>
          <p className="font20 font-title-color">Owen Peterson</p>
        </div>
        <div className="btns display-flex">
          <div className="btn">
            <button
              className='background-primary-color btn-style'
              onClick={handleButtonClick}
            >
              Message
            </button>
          </div>
          <div className="btn">
            <button
              className='background-bad-color btn-style'
            // onClick={() => deleteFriend()}
            >
              Unfriend
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}