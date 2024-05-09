import { useId,useState } from "react";
import Modal from "./Modal";

export type WorkingDetails = {
  day: string;
  from: string;
  to: string;
  localId:string;
};

type Props = {
  
  title:string;
  primaryTitleButton:string;
  onClose: () => void;
  onAddOrEditModal: (details: WorkingDetails) => void;
  alreadyAddedWorkingDetails: WorkingDetails[];
  editedElementToShow?: WorkingDetails
  
}
const WorkingHoursModal = ({
  title,
  primaryTitleButton,
  onClose,
  onAddOrEditModal,
  alreadyAddedWorkingDetails,
  editedElementToShow,
  
}: Props) => {

  

  const handleAdd = () => {
    if (!conflictValidator()) {
      // check inner & outer conflict, from>to and shift>=30
      onAddOrEditModal(workingDetails);
      onClose();
    }
  };

  const [workingDetails, setWorkingDetails] = useState<WorkingDetails>({
    day: editedElementToShow?.day??'Sunday',
    from: editedElementToShow?.from??'',
    to: editedElementToShow?.to??'',
    localId:editedElementToShow?.localId??useId()
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const conflictValidator = (): boolean => {
    var fromHrs = parseInt(workingDetails.from.slice(0, 2)) * 60;
    var toHrs = parseInt(workingDetails.to.slice(0, 2)) * 60;
    var totalFromMins = parseInt(workingDetails.from.slice(3)) + fromHrs;
    var totalToMins = parseInt(workingDetails.to.slice(3)) + toHrs;

    // case1: compare total mintues return true if from>to
    if (totalFromMins > totalToMins) {
      setErrorMessage("Error: From value should'nt exceed the To value!");
      return true;
    }
    // case2: minimum 30 min interval
    else if (totalToMins - totalFromMins < 30) {
      setErrorMessage("Error: The interval shouldn't be less than 30 minutes!");
      return true;
    } 
    // case3: conflict between the shifts
    else {
      const shiftsConflictFound = alreadyAddedWorkingDetails.some((element) => {
        return (
          element.day === workingDetails.day &&
          (element.from === workingDetails.from ||
            element.to === workingDetails.to)
        );
      });
      
      if (shiftsConflictFound) {
        setErrorMessage(
          "Error: The interval you are trying to add exists on the same day or have conflict with it!"
        );
        return true;
      }
      {
        return false;
      }
    }
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      secondaryActionButton={onClose}
      secondaryTitleButton="Cancel"
      primaryTitleButton={primaryTitleButton}
      primaryActionButton={handleAdd}
    >
      <div id="modal body" className="text-base font-semibold">
        <div>
          If your shift starts in the morning and ends after midnight, you need
          to divide it into two shifts: The first shift: Starts at x:xx AM. Ends
          at 11:59 PM. The second shift: Starts at 12:00 AM (midnight).Ends at
          x:xx AM.
        </div>
        <div className="flex flex-wrap justify-around gap-y-1">
          <div className="p-1 pt-4">
            <label htmlFor="days">Day: </label>
            <select
              className="bg-[#FAFAFA] text-[#737373] p-1"
              name="days"
              id="days"
              value={workingDetails?.day}
              onChange={(e) =>
                setWorkingDetails({ ...workingDetails, day: e.target.value })
              }
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
          <div className="p-1 pt-4">
            From:{" "}
            <input
              id="from"
              type="time"
              value={workingDetails.from}
              className="bg-[#FAFAFA] text-[#737373] p-[2px]"
              onChange={(e) =>
                setWorkingDetails({ ...workingDetails, from: e.target.value })
              }
            />
          </div>
          <div className="p-1 pt-4">
            To:{" "}
            <input
              id="to"
              type="time"
              value={workingDetails?.to}
              className="bg-[#FAFAFA] text-[#737373] p-[2px]"
              onChange={(e) =>
                setWorkingDetails({ ...workingDetails, to: e.target.value })
              }
            />
          </div>
          {errorMessage && (
            <div className="text-[13px] text-[#fd4747] ">{errorMessage}</div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WorkingHoursModal;
