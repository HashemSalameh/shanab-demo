import { Link } from "react-router-dom";
import Button from "./ModalButton";

type Iprops = {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  secondaryTitleButton: string;
  primaryTitleButton: string;
  primaryActionButton?: () => void;
  secondaryActionButton: () => void;
  isSuccessModal?: boolean;
};
const Modal = ({
  onClose,
  title,
  children,
  primaryTitleButton,
  secondaryTitleButton,
  primaryActionButton,
  secondaryActionButton,
  isSuccessModal,
}: Iprops) => {
  return (
    <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
      <div
        id="modal-container"
        className={
          isSuccessModal
            ? "flex flex-col gap-4 bg-white border-[1px] border-[#505050] mx-auto shadow-lg p-[24px] rounded-3xl xs:w-11/12 lg:w-1/2"
            : "flex flex-col gap-4 bg-[#fdfdfd] border-[1px] border-[#505050] mx-auto shadow-lg p-[24px] rounded-3xl xs:w-11/12 lg:w-1/2"
        }
      >
        <div id="modal-header" className="flex justify-between items-center">
          <div
            className={
              isSuccessModal
                ? "text-[22px] text-[#1a1a1a] font-semibold"
                : "text-[22px] text-[#ff4233] font-semibold"
            }
          >
            {title}
          </div>
          <div>
            {!isSuccessModal && (
              <button className="h-[35px] w-[35px]" onClick={onClose}>
                <img className="h-[35px] w-[35px]" src="Documents/close.svg" />
              </button>
            )}
          </div>
        </div>
        <div id="modal-border" className="border-[#1a1a1a] border-[1px]" />
        {children}
        <div
          id="modal-footer"
          className="flex justify-center items-center gap-[10px] mt-[15px]"
        >
          <Button
            style={
              isSuccessModal
                ? "h-[45px] w-[125px] text-base font-bold tracking-wide text-white bg-[#7D0000]  rounded-3xl hover:animate-bounce"
                : "h-[45px] w-[125px] text-base font-bold tracking-wide text-[#ff4233] bg-[#f6e6e6] hover:bg-[#FAFAFA]  border-[1px] border-[#FF4233] rounded-3xl"
            }
            onclick={secondaryActionButton}
          >
            {secondaryTitleButton}
          </Button>
          {isSuccessModal ? (
            <Link to="/">
              <Button
                onclick={primaryActionButton}
                style={
                  "h-[45px] w-[125px] text-base font-bold tracking-wide text-white bg-[#5F8047]  rounded-3xl animate-bounce hover:animate-none"
                }
              >
                {primaryTitleButton}
              </Button>
            </Link>
          ) : (
            <Button
              onclick={primaryActionButton}
              style={
                "h-[45px] w-[125px] text-base font-bold tracking-wide text-white bg-[#FF4233] hover:bg-[#F5F5F5] hover:text-[#FF4233] border-[1px] border-[#FF4233] rounded-3xl"
              }
            >
              {primaryTitleButton}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
