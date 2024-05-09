

const ResetPassword = () => {
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        id="container"
        className="flex flex-col gap-2 w-full max-w-[460px] p-6 rounded-2xl shadow-xl shadow-red-300 border-[1px] bg-[#eeeeee9f]"
      >
        <div className="flex justify-end">
          <button className="text-[#FF4233] font-semibold p-4 hover:bg-[#ffe0e0] rounded-[30px] transform hover:scale-110 transition ease-in-out duration-700 delay-75">
            العربية
          </button>
        </div>
        <div className="flex justify-center">
          <img src="./Documents/shanabLogo.svg" />
        </div>
        <div className="text-center text-3xl font-semibold">
          <p>Reset your Password</p>
        </div>
        <div className="text-center text-sm pt-2">
          <p>
            Enter your Email please
          </p>
        </div>
        
        <div className="pt-2 px-4">
          <button className="h-[50px] w-full text-base font-bold tracking-wide text-white bg-[#FF4233] hover:bg-[#F5F5F5] hover:text-[#FF4233] border-[1px] border-[#FF4233] rounded-3xl transition ease-in-out duration-700 delay-75">
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
