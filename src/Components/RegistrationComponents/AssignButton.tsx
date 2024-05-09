type Iprops = {
  caption: string;
  onOpen: () => void;
};
const AssignButton = ({ caption, onOpen }: Iprops) => {
  return (
    <>
      <div className="flex items-center gap-2 xs:justify-between ">
        <div>{caption}</div>
        <button
          type="button"
          onClick={onOpen}
          className="flex justify-center items-center bg-[#FF4233] hover:bg-[#F5F5F5] text-black text-sm px-4 py-2  border rounded-full max-w-10 max-h-10"
        >
          <p className="text-3xl">+</p>
        </button>
      </div>
    </>
  );
};

export default AssignButton;
