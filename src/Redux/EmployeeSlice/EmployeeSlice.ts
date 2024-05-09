import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface EmployeeState {
  fullNameAr:string;
  fullNameEn:string;
  id:number;
  accepted: boolean;
  email:string;
  mobile:string;
  dateOfBirth:string;
  gender:string;
  owner:boolean;
  preferredLocale:string;
  roles: [{ code: string, name: string }];
  };

  export interface PaginationData {
    limit:number;
    offset:number;
    total:number;
  }


  const initialState: {data: EmployeeState[] , paginationData:PaginationData  } = {data: [] , paginationData:{limit:10 , offset:0, total:20}};

  export const EmployeeSlice = createSlice({
    name:"Employees",
    initialState,
    reducers:{
        setEmployees: (state , action:PayloadAction<EmployeeState[]>) =>{
            state.data = action.payload
        },
        setPaginationData: (state , action:PayloadAction<PaginationData>) =>{
          state.paginationData.limit = action.payload.limit
          state.paginationData.offset = action.payload.offset
          state.paginationData.total = action.payload.total
        }
    }
  })

  export const { setEmployees , setPaginationData} = EmployeeSlice.actions;
  export default EmployeeSlice.reducer;

