import { useState } from "react";
import UploadContainer from "./UploadContainer";
import UploadModal from "./UploadModal";
import RestaurantRegistrationRequest from "../../Types/Registration";
import { WorkingDetails } from "./WorkingHoursModal";
import { Document } from "../../Types/Registration";

type Iprops = {
  formikValues: RestaurantRegistrationRequest;
  formikSetter: (
    field: keyof RestaurantRegistrationRequest,
    value: string | WorkingDetails[] | Document[] | number | undefined
  ) => void;
  error:Record<keyof RestaurantRegistrationRequest , string |undefined> ;
};

const SecondForm = ({ formikValues, formikSetter, error }: Iprops) => {
  const [clicked, setClicked] = useState({
    isClicked: false,
    containerFieldId: "",
  });

  // get the documentTypeCode from formik documents
  // if there's a values then it's from type document
  const getCurrentField = () => {
    return formikValues.documents.find(
      (element) => element.documentTypeCode === clicked.containerFieldId
    );
  };

  const handleSaveModal = (locationFromAPI: string) => {
    const editedItem = getCurrentField();

    if (clicked.containerFieldId === "imageUrl") {
      formikSetter("imageUrl", locationFromAPI);
    } else if (editedItem) {
      const existingItems = formikValues.documents.filter(
        (x) => x.documentTypeCode != clicked.containerFieldId
      );
      editedItem.urls = [...editedItem.urls, locationFromAPI];
      formikSetter("documents", [...existingItems, editedItem]);
    } else {
      formikSetter("documents", [
        ...formikValues.documents,
        {
          documentTypeCode: clicked.containerFieldId,
          urls: [locationFromAPI],
        },
      ]);
    }
  };
  const handeldeletePdfIcon = (url: string, containerName: string) => {
    // case.1 if eauals to imageUrl
    if (containerName === "imageUrl") formikSetter("imageUrl", undefined);
    // case.2 if equals to documents , first check which container then
    // check the length of the urls array if it's =1
    else if (
      formikValues.documents.some(
        (document) =>
          document.documentTypeCode === containerName &&
          document.urls.length === 1
      )
    ) {
      // set the field documents of the specific document for ex the rest.contract
      // then spread the rest
      formikSetter("documents", [
        {
          documentTypeCode: containerName,
          urls: [],
        },
        ...formikValues.documents,
      ]);
    }
    // case.3 the field is documents, and the urls length>1
    else {
      const filteredDocumentURL = formikValues.documents.find(
        (document) =>
          document.documentTypeCode === containerName
      )?.urls.filter( x=> x!==url) ?? [];
      
      formikSetter("documents",[
        {
          documentTypeCode: containerName,
          urls: [...filteredDocumentURL] ,
        }, ...formikValues.documents
      ])
      
    }

  };

  return (
    <div id="SecondForm">
      <div className="flex gap-2 items-center pb-1">
        <img src="Documents/two.svg" />
        <div className="text-gray-900 font-bold text-2xl">
          Attach Required Documents{" "}
        </div>
      </div>
      <div className="text-sm font-medium p-2 pl-4">
        {" "}
        Fill out your personal information to create an account tied to a
        Restaurant and Continue
      </div>

      <div className="flex flex-col justify-center gap-2">
        <UploadContainer
          caption="Please download the contract and read it well, Then sign on it
                and upload the contract here"
          downLoadable
          onClickUploadContainer={() => {
            setClicked({
              isClicked: true,
              containerFieldId: "RestaurantContract",
            });
          }}
          urlToDisplayPDF={
            formikValues.documents.find(
              (element) => element.documentTypeCode === "RestaurantContract"
            )?.urls
          }
          deletePdfIcon={(url) =>
            handeldeletePdfIcon(url, "RestaurantContract")
          }
          error={error.documents}
        />
        <UploadContainer
          caption="Restaurant Image"
          onClickUploadContainer={() => {
            setClicked({
              isClicked: true,
              containerFieldId: "imageUrl",
            });
          }}
          urlToDisplayPDF={
            formikValues.imageUrl ? [formikValues.imageUrl] : undefined
          }
          deletePdfIcon={(url) => handeldeletePdfIcon(url, "imageUrl")}
          error={error.imageUrl}
        />
        <UploadContainer
          caption="Commercial License Number"
          onClickUploadContainer={() => {
            setClicked({
              isClicked: true,
              containerFieldId: "CommercialLicenseNumber",
            });
          }}
          urlToDisplayPDF={
            formikValues.documents.find(
              (element) =>
                element.documentTypeCode === "CommercialLicenseNumber"
            )?.urls
          }
          deletePdfIcon={(url) =>
            handeldeletePdfIcon(url, "CommercialLicenseNumber")
          }
          error={error.documents}
        />
        <UploadContainer
          caption="Tax Certificate Number"
          onClickUploadContainer={() => {
            setClicked({
              isClicked: true,
              containerFieldId: "TaxCertificateNumber",
            });
          }}
          urlToDisplayPDF={
            formikValues.documents.find(
              (element) => element.documentTypeCode === "TaxCertificateNumber"
            )?.urls
          }
          deletePdfIcon={(url) =>
            handeldeletePdfIcon(url, "TaxCertificateNumber")
          }
          error={error.documents}
        />
        {clicked.isClicked && (
          <UploadModal
            closeModal={() => {
              setClicked({
                isClicked: false,
                containerFieldId: clicked.containerFieldId,
              });
            }}
            saveModal={(locationFromAPI) => handleSaveModal(locationFromAPI)}
          />
        )}
        
      </div>
    </div>
  );
};

export default SecondForm;
