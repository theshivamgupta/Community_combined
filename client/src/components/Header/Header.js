import React from "react";
import intro from "../../assets/intro.svg";
import people from "../../assets/people.png";
import "./Header.css";
import "../../App.css";

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">
        Let&apos;s Build Some Interesting Conversation here
      </h1>
      {/* <p>Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.</p> */}

      <div className="gpt3__header-content__people">
        <img src={people} alt="people" />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={intro} alt="intro" style={{ width: "90%" }} />
    </div>
  </div>
);

export default Header;
