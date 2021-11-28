import React, { createContext, useState } from "react";

export const myContext = createContext();
const NewPostContext = (props) => {
  const [openPost, setOpenPost] = useState(false);
  const [flagModal, setFlagModal] = useState(false);
  const [studentModal, setStudentModal] = useState(false);
  function handleClickNew(e) {
    e.preventDefault();
    setOpenPost(!openPost);
  }

  function handleFlagModal(e) {
    e.preventDefault();
    setFlagModal(!flagModal);
  }

  function handleStudentModal(e) {
    e.preventDefault();
    setStudentModal(!studentModal);
  }

  return (
    <myContext.Provider
      value={{
        openPost,
        handleClickNew,
        flagModal,
        handleFlagModal,
        studentModal,
        handleStudentModal,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default NewPostContext;
