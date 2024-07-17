import React, { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
interface PopModalProps {
  show: boolean;
  handleShow: () => void;
  children: React.ReactNode;
}
const PopModal: React.FC<PopModalProps> = function ({
  children,
  show,
  handleShow,
}) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);
  return show
    ? ReactDOM.createPortal(
        <div className="fixed w-full flex justify-center h-dvh top-0 bg-black-2">
          <div className="relative w-[75%] max-w-[64rem] h-fit top-[50%] -translate-y-1/2 left-0 rounded bg-[#ffffff] ">
            <div className="w-full flex">
              <FontAwesomeIcon
                icon={faXmark}
                className="h-5 w-5 p-[2.5px] cursor-pointer absolute right-[-0.75rem] top-[-0.75rem] z-[100] bg-black-2 rounded-full hover:bg-white-1 hover:text-black-2 border-2 border-solid border-white-1"
                onClick={handleShow}
              />
            </div>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default PopModal;
