import React, { Component, useContext, useState , useEffect} from "react";
import { AuthContext } from "../../AuthContext";
import { Link, useHistory } from "react-router-dom";
import { DebugRouter } from "../../App.jsx";
import { AuthContextProvider } from "../../AuthContext.js";
import {
  faHome,
  faDumbbell,
  faUtensils,
  faCalendarAlt,
  faHeart,
  faBackspace,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

// useEffect(() => {
//   callFn()
// }, [searchQuery])
// const callFn = (e)=>{
//   e.preventDefault();
//   setSearchQuery(e.target.value)
// }
return (
  <div className="search-bar">
    <input
      type="text"
      name="name"
      value={searchQuery}
      placeholder="Search this bro"
      onChange={e => {setSearchQuery(e.target.value)}}
    />
    <div className="search-button" onClick={() => setSearchQuery("")}>
      <FontAwesomeIcon icon={faSearch} size="2x" />
    </div>
  </div>
);
};

const Navbar = () => {
  let reRoute = useHistory();
  const context = useContext(AuthContext);
  const { isAuth, uid } = context;
  

  

  return (
    <div className="header-bar">
    <p>{uid}</p>
      <div className="logo">
        <Link to="/Navbar">
          <FontAwesomeIcon
            size="4x"
            icon={faHeart}
            fixedWidth={false}
            transform=" right 1 rotate-350"
          />
        </Link>
      </div>
      <SearchBar />
      <div className="message" >
        <div>Welcome</div>
        
        <div>
          <strong>Rodney</strong>
        </div>
      </div>
      
      <div className="search-icon">
        
          <FontAwesomeIcon icon={faSearch} size="2x" />
          
      </div>

      <div className="profile-icon">
        <Link to="/Profile">
          <FontAwesomeIcon icon={faHome} size="2x" />
          <p>Profile</p>
        </Link>
      </div>
      <div className="dumbell-icon">
        <Link to="/Workout">
          <FontAwesomeIcon icon={faDumbbell} size="2x" />
          <p>Workout</p>
        </Link>
      </div>
      <div className="meal-icon">
        <Link to="/">
          <FontAwesomeIcon icon={faUtensils} size="2x" />
          <p>Meals</p>
        </Link>
      </div>
      <div className="calender-icon">
        <Link to="/">
          <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
          <p>Schedule</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
