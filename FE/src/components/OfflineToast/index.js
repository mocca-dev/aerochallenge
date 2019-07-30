import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import {} from "./index.css";

const OfflineToast = ({ sWPromise }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    sWPromise.then(res => {
      setShow(res.type === "CACHED");
      setText(res.text);
      setInterval(() => {
        setShow(false);
      }, 7000);
    });
  }, [sWPromise]);

  useEffect(() => {
    function updateOnlineStatus(event) {
      setText("La conexión se perdió.");
      setShow(!navigator.onLine);
    }

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  }, []);

  return (
    <>
      <CSSTransition
        in={show}
        timeout={700}
        classNames="toast"
        unmountOnExit
        onEnter={() => {}}
        onExited={() => {}}
      >
        <div className="toast-container">
          <span>{text}</span>{" "}
          <button className="close-btn" onClick={() => setShow(false)}>
            X
          </button>
        </div>
      </CSSTransition>
    </>
  );
};

export default OfflineToast;
