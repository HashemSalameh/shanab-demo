import { MdOutlineFileDownload } from "react-icons/md";

type Iprops = {
  caption: string;
  downLoadable?: boolean;
  onClickUploadContainer: () => void;
  urlToDisplayPDF: string[] | undefined;
  deletePdfIcon: (url: string) => void;
  error:string | undefined;
};

const UploadContainer = ({
  caption,
  onClickUploadContainer,
  downLoadable,
  urlToDisplayPDF,
  deletePdfIcon,
  error,
}: Iprops) => {
  return (
    <div className="flex flex-col justify-end bg-[#F5F5F5] rounded-xl">
      <div className="flex flex-col p-7 gap-2 min-h-[166px]">
        <div className="flex flex-wrap items-center gap-1 font-semibold text-sm">
          <a role="button" className="hover:underline decoration-[#FF4233]">
            {caption}
          </a>
          {downLoadable && (
            <button className="p-1 hover:bg-[#F5EEED] rounded-3xl">
              <MdOutlineFileDownload
                color="#FF4233"
                className="h-[25px] w-[25px] "
              />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button className="w-[130px]" onClick={onClickUploadContainer}>
            <div className=" flex justify-center items-center bg-[#EEEEEE] w-[130px] h-[110px] rounded-xl">
              <img className="w-[32px]" src="Documents/plus-upload.svg"></img>
            </div>
          </button>
          {urlToDisplayPDF?.map((url) => (
            <div className="relative z-0 flex justify-center w-[130px] bg-[#EEEEEE] rounded-xl ">
              <div>
                <div
                  onClick={() => deletePdfIcon(url)}
                  className="absolute z-10 flex justify-center items-center right-[4px] -top-[5px] w-[30px] h-[30px] bg-[#ffffff] rounded-xl hover:bg-[#F5EEED]"
                >
                  <img
                    className=" w-[20px] h-[20px] cursor-pointer"
                    src="Documents/close.svg"
                  />
                </div>
                <a href={url} target="_blank">
                  <div>
                    <img
                      src="Documents/pdfImage.png"
                      className="h-[110px] rounded-xl"
                    />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
        {error && <div className="text-[13px] text-[#fd4747]">{error}</div>}
      </div>
    </div>
  );
};

export default UploadContainer;
