import { useQuery } from "@apollo/client";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { isAuthenticated } from "./auth/isAuthenticated";
import PrivateRoute from "./auth/PrivateRoute";
import NewPostContext from "./context/NewPostContext";
import { ME } from "./graphql/query";
import DashBoard from "./pages/DashBoard";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import SignUp from "./pages/SignUp";

export const UserContext = React.createContext();
function App() {
  const { data, loading } = useQuery(ME);
  // const current = useSubscription(CURRENT_USER);
  if (loading) {
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          color: "white",
          height: "100vh",
        }}
      >
        Loading...
      </h1>
    );
  }
  const isAuth = isAuthenticated();
  const me = isAuth && data?.me ? data?.me : null;
  // console.log({ me });
  const currentUserId = me?.id;
  const postIds = me?.posts;

  return (
    <UserContext.Provider value={{ me, currentUserId, postIds }}>
      <NewPostContext>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accounts/signup" element={<SignUp />} />
          <Route path="/accounts/login" element={<LogIn />} />
          {/* <Route path="/dash" element={<DashBoard />} /> */}
          <Route
            path="/dash"
            element={<PrivateRoute Component={DashBoard} />}
          />
          <Route
            path="/p/:postId"
            element={<PrivateRoute Component={PostPage} />}
          />
          <Route
            path="/u/:userId"
            element={<PrivateRoute Component={ProfilePage} />}
          />
        </Routes>
      </NewPostContext>
    </UserContext.Provider>
  );
}

export default App;
