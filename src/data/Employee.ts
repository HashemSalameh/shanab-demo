import axios from "axios";
import baseUrl from "../Pages/baseUrl";
import { useAppDispatch } from "../Redux/hook";
import { setEmployees, setPaginationData } from "../Redux/EmployeeSlice/EmployeeSlice";
import { InviteEmployeeRequest } from "../Components/ManageEmployeesComponents/InviteModal";
import { useTranslation } from "react-i18next";
import { params } from "../Pages/ManageEmployees";

// custom hook of create(invite) and get 
// rules of hooks 
  export const useEmployees = ()=>{

    const { i18n } =useTranslation();
    const dispatch = useAppDispatch(); 

    const update = async ( values:InviteEmployeeRequest , id:number)=>{
      let res= await axios.post(baseUrl+ `RestaurantEmployees/${id}/update?locale=${i18n.language}` , values);
      if(res.status === 204){
        get({
          locale: i18n.language,
          limit: 10,
          offset:0,
          accepted: undefined
        })
      }
      return res;
    }

    const get = async(params:params) =>{
      let res = await axios.get(baseUrl+ `restaurantEmployees?${params.locale && 'locale='+params.locale}${'&limit='+params.limit}${'&offset='+params.offset}${Boolean(params.accepted) ? ('&accepted='+params.accepted):''}`)
      if(res.status === 200)
        {
          dispatch(setEmployees(res.data.matches)) 
          dispatch(setPaginationData(res.data))
        }
        return res;
    }

    const invite = async( values:InviteEmployeeRequest)=>{
      const res =  await axios.post(baseUrl+ `restaurantemployees/inviterestaurantemployee?locale=${i18n.language}` , values)
      if(res.status === 200){
        get({
          locale: i18n.language,
          limit: 10,
          offset:0,
          accepted: undefined
        })
      }
      return res;
    }

    return {
      invite,get,update
    }
  }
