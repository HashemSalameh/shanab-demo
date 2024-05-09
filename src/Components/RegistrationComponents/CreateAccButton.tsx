
type Iprops={
  formSubmit: ()=>void;
}

const CreateAccButton =({formSubmit}:Iprops)=>{
    return(
        <div className="flex justify-end mt-[16px]" >
          <button type="submit" onClick={()=>formSubmit()} className="text-base font-bold tracking-wide text-white bg-[#FF4233] hover:bg-[#F5F5F5] hover:text-[#FF4233] h-[45px] w-[150px] border-[1px] border-[#FF4233] rounded-3xl">
            Create Account
          </button>
        </div>
    );
}

export default CreateAccButton;