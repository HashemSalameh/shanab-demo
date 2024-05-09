type Iprops ={
  children:string;
  style:string | undefined;
  onclick?:() => void
  isSubmitType?: boolean;
} 
const Button =({children , style , onclick ,isSubmitType}:Iprops)=>{
    return(
        <div>
          <button type={isSubmitType ? 'submit' : undefined} className={style} onClick={onclick}>
            {children}
          </button>
        </div>
    );
}

export default Button;