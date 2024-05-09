import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { WorkingDetails } from "./WorkingHoursModal";


type Iprops = {
  workingDetailstoDisplay: WorkingDetails;
  onDelete: (localId: string) => void;
  onEdit: (localId:string) => void;
};
const ShiftCard = ({ workingDetailstoDisplay , onDelete, onEdit }: Iprops) => {
  // 01:43 (AM) ,  13:43 (PM)
  const switchTo12hrsSystem = (time: string) => {
    var hours = parseInt(time.slice(0, 2)); // 01,13
    var mins = time.slice(3); // 43,43

    if (hours >= 0 && hours <= 11) {
      hours == 0 && (hours = 12);
      return hours + ":" + mins + " AM";
    } else {
      hours > 12 && (hours -= 12);
      return hours + ":" + mins + " PM";
    }
  };

  const handleDelete = () => {
    onDelete(workingDetailstoDisplay.localId);
  };

  const handleEdit = () => {
    onEdit(workingDetailstoDisplay.localId);
  };

  return (
    <div
      key={workingDetailstoDisplay.localId}
      id="shift"
      className="flex justify-between border-2 bg-[#F5F5F5] w-full rounded-xl shadow-2xl p-[10px] mt-1"
    >
      <div>
        <div>Day: {workingDetailstoDisplay.day}</div>
        <div>From: {switchTo12hrsSystem(workingDetailstoDisplay.from)}</div>
        <div>To: {switchTo12hrsSystem(workingDetailstoDisplay.to)}</div>
      </div>
      <div className="flex flex-wrap pl-[10px]">
        <button>
          <MdEdit
            onClick={handleEdit}
            color="#FF4233"
            className="w-[40px] h-[40px] p-2"
          />
        </button>
        <button onClick={handleDelete}>
          <MdDelete color="#FF4233" className="w-[40px] h-[40px] p-2" />
        </button>
      </div>
    </div>
  );
};

export default ShiftCard;
