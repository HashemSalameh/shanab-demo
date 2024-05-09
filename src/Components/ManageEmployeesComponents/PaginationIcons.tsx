import { useState } from "react";
import { useAppSelector } from "../../Redux/hook";
import { useEmployees } from "../../data/Employee";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PaginationIcons = () => {
  const params = useAppSelector((state) => state.Employees.paginationData);
  const { i18n } = useTranslation();
  const { get } = useEmployees();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(params.total / params.limit);

  // function returns an array to save pages numbers in it, and to use to map buttons
  const getPagesNumber = () => {
    var pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    get({
      locale: i18n.language,
      limit: 10,
      offset: (page * params.limit) - params.limit,
      accepted: undefined,
    });
  };

  const handlePreviousPage=()=>{
    if(currentPage > 1)
        handlePageClick(currentPage-1)
  }

  const handleNextPage=()=>{
    if(currentPage < totalPages)
       handlePageClick(currentPage+1)
  }
  console.log(i18n.dir())
  return (
    <div className="flex justify-center gap-1 mt-1 p-1 border-[1px] rounded-xl bg-[#fef4f4]">
      <button className={`flex justify-center items-center w-[35px] h-[35px] text-zinc-700 ${(!(currentPage!=1)) ? "bg-gray-200" : "hover:bg-rose-200 bg-[#fafafa] border-rose-300 border-[1px]"}   rounded-2xl  transition ease-in-out duration-700 delay-75`}
              onClick={handlePreviousPage} disabled={!(currentPage!=1)}>
        { i18n.dir()=="rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </button>
      {getPagesNumber().map((page) => (
        <button
          className={`w-[35px] h-[35px] border-[1px] text-zinc-700 border-rose-300 rounded-2xl hover:bg-rose-200 transition ease-in-out duration-700 delay-75 ${
            currentPage === page ? "bg-rose-200" : "bg-[#fafafa]"
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button className={`flex justify-center items-center w-[35px] h-[35px] text-zinc-700 ${(!(currentPage==1)) ? "bg-gray-200" : "hover:bg-rose-200 bg-[#fafafa] border-rose-300 border-[1px]"}  rounded-2xl transition ease-in-out duration-700 delay-75`}
              onClick={handleNextPage} disabled={!(currentPage==1)}>
        { i18n.dir()=="rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>
    </div>
  );
};

export default PaginationIcons;
