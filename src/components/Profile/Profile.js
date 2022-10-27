import React from "react";
import argentBankLogo from "../../assets/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setUserFirstName, setUserLastName, setLogout } from "../../features/user/userSlice";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./Profile.css";

function Profile() {
  const loginInfos = useSelector((state) => state.user.loginInfos);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatingName, setUpdatingName] = useState("false");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getUserData();
  }, []);
  
  // Receive user data on first login:
  const getUserData = () => {
    Axios.post("http://localhost:3001/api/v1/user/profile", loginInfos, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setFirstName(response.data.body.firstName);
        dispatch(setUserFirstName(firstName));
        setLastName(response.data.body.lastName);
        dispatch(setUserLastName(lastName));
      })
      .catch(function (error) {
        console.error("Token incorrect.");
        console.log(error);
      });
  };

  let name = firstName + " " + lastName + "!";

  // Sign Out
  const handleLogout = (e) => {
    dispatch(setLogout());
    navigate("/JeremiePiard_13_21092022/");
  };

  // 1. Change user name and lastname
  const handleChangeUserName = (e) => {
    e.preventDefault();

    setFirstName(e.target[0].value);
    dispatch(setUserFirstName(e.target[0].value));

    setLastName(e.target[1].value);
    dispatch(setUserLastName(e.target[1].value));

    updateUserData(e.target[0].value, e.target[1].value);
    setUpdatingName(!updatingName);
  };

  // 2. Then update new user name and lastname in the server
  const updateUserData = (name, lastname) => {
    const userProfile = {
      firstName: name,
      lastName: lastname,
    };

    Axios.put("http://localhost:3001/api/v1/user/profile", userProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Html form that update user name and lastname
  const changeUsername = () => {
    return (
      <form onSubmit={handleChangeUserName}>
        <div className="formChangeUserNameInputs">
          <div>
            <input
              type="text"
              id="username"
              placeholder={firstName}
              className="inputUpdate"
            />
          </div>
          <div>
            <input
              type="text"
              id="lastname"
              placeholder={lastName}
              className="inputUpdate"
            />
          </div>
        </div>
        <div className="formChangeUserNameButtons">
          <button type="submit" className="buttonUpdate">
            Save
          </button>
          <button
            type="button"
            className="buttonUpdate"
            onClick={(e) => setUpdatingName(!updatingName)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container">
      <nav className="main-nav">
        <Link
          className="main-nav-logo"
          to="/JeremiePiard_13_21092022/"
          key="homepage-link"
          onClick={handleLogout}
        >
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <a className="main-nav-item" href="#">
            <FontAwesomeIcon icon={faUserCircle} className="margin" />
            {firstName}
          </a>
          <button className="main-nav-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} className="margin" />
            Sign Out
          </button>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {updatingName ? name : changeUsername()}
          </h1>
          {updatingName ? (
            <button
              className="edit-button"
              onClick={(e) => setUpdatingName(!updatingName)}
            >
              Edit Name
            </button>
          ) : (
            ""
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2022 Argent Bank</p>
      </footer>
    </div>
  );
}

export default Profile;
