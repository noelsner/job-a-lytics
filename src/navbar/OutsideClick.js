import { useEffect } from "react";

const outsideClick = (ref, callback) => {
  const clickEvent = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickEvent);

    return () => {
      document.removeEventListener("click", clickEvent);
    };
  });
};

export default outsideClick;