import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import baseUrl from '../../Pages/baseUrl';
import { useEffect, useState } from 'react';


type Iprops = {
  setFormikFoodCategories_Ids: (x:number[])=> void;

};
type Match = {
  imageUrl: string;
  inactive:boolean;
  name: string;
  nameAr:string;
  nameEn:string;
  id: number;
};

type ApiResponseData ={
  matches: Match[];
}

type FoodCategoriesLookUp={
  id:number;
  name:string;
}


const RestaurantTypes = ({setFormikFoodCategories_Ids}:Iprops) => {

   
  const [foodCategoriesLookUp, setFoodCategoriesLookUp]= useState<FoodCategoriesLookUp[]>();

  useEffect(()=>getLookup(),[])
  
  const getLookup=()=>{
      axios.get( baseUrl+"foodcategories" )
      .then((res)=> {
        const resDataMatches:ApiResponseData =res.data;
        const lookUps :FoodCategoriesLookUp[] = resDataMatches.matches.map( element =>{  
         return {
            id:element.id,
            name:element.name
         }}
        )
        setFoodCategoriesLookUp(lookUps);
         
      })
      .catch((error)=> alert(error))
 
    }

    return (

    <div>
      <label htmlFor="Types" className="text-gray-900 font-bold text-md">Restaurant Type</label>
        <br/>
      <Multiselect 
      options={foodCategoriesLookUp}
      displayValue='name'
      showCheckbox={true}
      closeOnSelect={true}
      showArrow={true}
      placeholder='Select your type of restaurant'
      className='border-solid border-2 rounded-xl bg-[#FAFAFA] focus:outline-none focus:border-[#FF4B3C]'
      style={{
        chips:{
          background: '#FF4B3C'
        },
        optionContainer: { // To change css for option container 
          background: '#FAFAFA',
          },
          option: { // To change css for dropdown options
            color: 'black'
            },
      }}
      onSelect={(selectedFoodCategories:FoodCategoriesLookUp[])=>
        {
          const selectedIds:number[] = selectedFoodCategories.map(element=> element.id)
          setFormikFoodCategories_Ids(selectedIds);
        }}
      onRemove={(selectedFoodCategories:FoodCategoriesLookUp[])=>
        {
          const selectedIds:number[] = selectedFoodCategories.map(element=> element.id)
          setFormikFoodCategories_Ids(selectedIds);
        }}
      />
    </div>
  );
};

export default RestaurantTypes;
