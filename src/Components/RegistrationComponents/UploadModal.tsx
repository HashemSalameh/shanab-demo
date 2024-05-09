import { IoCloudUploadOutline } from "react-icons/io5";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "./ModalButton";
import axios from "axios";
import { useState } from "react";
import baseUrl from "../../Pages/baseUrl";

type Iprops = {
  closeModal: () => void;
  saveModal: (location:string)=> void;
};
const UploadModal = ({ closeModal , saveModal }: Iprops) => {
  
  const [locationFromAPI, setLocationFromAPI] = useState<string>("");

  const toBase64 = async (file: any): Promise<string | undefined> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result?.toString().replace(/^data:(.*,)?/, "");
        if (encoded)
          if (encoded.length % 4 > 0) {
            //Extracts the content in the beginning (the metadata of base64)
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
      <div
        id="modal-container"
        className="flex flex-col gap-4 bg-[#fdfdfd] border-[1px] border-[black] shadow-lg p-[24px] xs:w-8/12 lg:w-[45%] "
      >
        <div id="modal-header" className="flex justify-between items-center">
          <div className="text-[22px] text-[#000000] font-medium">
            Upload file
          </div>
          <div>
            <button className="h-[30px] w-[30px]" onClick={closeModal}>
              <img className="h-[30px] w-[30px]" src="Documents/close.svg" />
            </button>
          </div>
        </div>
        <div id="modal-body">
          <label className="flex justify-center items-center w-full h-[250px] px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus:outline-none">
            <div className="flex flex-col items-center text-2xl font-medium text-[#FF4233] ">
              Drag and drop a file here or click
              <span className="flex justify-center items-centerh-[30px] w-[30px] hover:bg-[#F5EEED] rounded-3xl">
                <IoCloudUploadOutline />
              </span>
            </div>
            <input
              type="file"
              name="file_upload"
              className="hidden"
              onChange={async (e) => {
                if (e.target.files) {
                  const base64File = await toBase64(e.target.files[0]);
                  // const res = 
                  await axios.post(
                    baseUrl +"blobs/upload",
                    {
                      base: base64File,
                      name: e.target.files[0].name,
                    }
                  )
                  .then((response)=> setLocationFromAPI(response.data.location))
                  .catch((error)=> alert(error.message))
                  
                  // setLocationFromAPI(res.data.location);
                }
              }}
            />
          </label>
        </div>
        {locationFromAPI && (
          <div>
            <div>Preview:</div>
            <div className="flex gap-1 group">
              <button>
                <IoDocumentAttachOutline className="h-[50px] w-[50px]" />
              </button>
              <button
                className="invisible group-hover:visible hover:bg-[#F5EEED] rounded-3xl"
                onClick={() => setLocationFromAPI("")}
              >
                <RiDeleteBin5Line
                  className="h-[35px] w-[43px] "
                  color="#C43F3F"
                />
              </button>
            </div>
          </div>
        )}
        <div id="modal-footer" className="flex justify-center gap-2 px-[8px] ">
          <Button
            style="h-[40px] w-[115px] text-base font-bold tracking-wide text-[#ff4233] bg-[#FAFAFA] hover:bg-[#F5EEED] border-[1px] border-[#FF4233] rounded-3xl"
            onclick={closeModal}
          >
            Cancel
          </Button>

          {locationFromAPI && (
            <Button style="h-[40px] w-[115px] text-base font-bold tracking-wide text-[white] bg-[#ff4233] hover:bg-[#F5F5F5] hover:text-[#FF4233] border-[1px] border-[#FF4233] rounded-3xl"
                    onclick={()=>{
                      closeModal();
                      saveModal(locationFromAPI)
                    }}
            >
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
