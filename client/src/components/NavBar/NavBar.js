import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
/* import logo from '../../logo.svg'; */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/isAuthenticated";
import defaultImage from "../../assets/images/defaultImage.jpg";
import { UserContext } from "../../App";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { myContext } from "../../context/NewPostContext";
import favicon1 from "../../assets/images/favicon1.jpeg";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations";
import "./NavBar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const isAuth = isAuthenticated();
  const { me, currentUserId } = React.useContext(UserContext);
  const { openPost, handleClickNew, handleFlagModal, handleStudentModal } =
    React.useContext(myContext);
  const location = useLocation();
  const [logout] = useMutation(LOGOUT, {
    onCompleted: (data) => {
      if (data.logout) {
        if (typeof window !== undefined) {
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
          navigate("/");
          window.location.reload();
        }
      }
    },
  });
  async function handleLogout(e) {
    e.preventDefault();
    await logout();
  }

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <Link to={"/dash"}>
          <div className="gpt3__navbar-links_logo">
            <img src={favicon1} alt="Logo" className="rounded-circle" />
          </div>
        </Link>
        {isAuth && (
          <div className="gpt3__navbar-links_container">
            {location.pathname === "/dash" && (
              <p>
                <button
                  className="btn btn-primary"
                  onClick={handleClickNew}
                  disabled={openPost}
                >
                  {/* Small */}
                  <ControlPointIcon /> New
                </button>
              </p>
            )}
          </div>
        )}
      </div>
      {!isAuth && (
        <div className="gpt3__navbar-sign">
          <Link to={`accounts/login`}>
            <p>Sign in</p>
          </Link>
          <Link to={`/accounts/signup`}>
            <button
              type="button"
              style={{ borderRadius: "19px" }}
              className="signup__button"
            >
              Sign up
            </button>
          </Link>
          {openPopover && (
            <div className="profile__navbar-menu_container scale-up-center">
              <div className="gpt3__navbar-menu_container-links">
                <p>
                  <a href="#home">Home</a>
                </p>
                <p>
                  <a href="#wgpt3">What is GPT3?</a>
                </p>
                <p>
                  <a href="#possibility">Open AI</a>
                </p>
                <p>
                  <a href="#features">Case Studies</a>
                </p>
                <p>
                  <a href="#blog">Library</a>
                </p>
              </div>

              <div className="gpt3__navbar-menu_container-links-sign">
                <p>Sign in</p>
                <button type="button">Sign up</button>
              </div>
            </div>
          )}
        </div>
      )}
      {isAuth && (
        <>
          {me?.moderatorLevel <= 1 && (
            <>
              <button
                type="button"
                className="btn btn-outline-info mr-6 flag__container"
                onClick={handleStudentModal}
              >
                Assign Power
              </button>
              <button
                type="button"
                className="btn btn-outline-danger mr-6 flag__container"
                onClick={handleFlagModal}
              >
                Flagged Comment
              </button>
            </>
          )}
          <div
            onClick={() => {
              // console.log("iage clicked");
              // setToggleMenu(true);
              setOpenPopover(!openPopover);
            }}
            style={{
              cursor: "pointer",
            }}
            className="profile__navbar-menu"
          >
            <Avatar src={defaultImage} />
            {openPopover && (
              <div className="profile__navbar-menu_container scale-up-center">
                <div className="gpt3__navbar-menu_container-links text-white">
                  <p>
                    Moderator Level{" "}
                    <span className="text-blue-300">
                      {me?.moderatorLevel === 0
                        ? "High Tier"
                        : me?.moderatorLevel === 1
                        ? "Medium Tier"
                        : "Low Tier"}
                    </span>
                  </p>
                  <p>
                    <Link to={`/u/${currentUserId}`}>Profile</Link>
                  </p>
                  <p>
                    <button
                      href="#blog"
                      className="text-white"
                      style={{
                        padding: "0.5rem 1rem",
                        color: "#fff",
                        background: "#ff4820",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "25px",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </p>
                </div>

                {/* <div className="gpt3__navbar-menu_container-links-sign">
                  <p>Sign in</p>
                  <button
                    type="button"
                    style={{
                      padding: "0.5rem 1rem",
                      color: "#fff",
                      background: "#ff4820",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "25px",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    Sign up
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </>
      )}

      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            {/* {console.log({ toggleMenu })} */}
            <div className="gpt3__navbar-menu_container-links">
              <p>
                {me?.moderatorLevel <= 1 && !isAuth && (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-info m-auto mb-4"
                      onClick={handleStudentModal}
                    >
                      Assign Power
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={handleFlagModal}
                    >
                      Flagged Comment
                    </button>
                  </>
                )}
              </p>
              {!isAuth && (
                <div className="gpt3__navbar-menu_container-links-sign">
                  <Link to={"/accounts/login"}>
                    <p>Sign in</p>
                  </Link>
                  <Link to={"/accounts/signup"}>
                    <button
                      type="button"
                      style={{
                        padding: "0.5rem 1rem",
                        color: "#fff",
                        background: "#ff4820",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "25px",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
