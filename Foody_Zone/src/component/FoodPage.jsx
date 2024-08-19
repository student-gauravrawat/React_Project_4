import { useState } from "react";
import styled from "styled-components"

const BASE_URL = "http://localhost:9000/";

export default function FoodPage(){

    const[data, setData] = useState(null) 
    
    const fetchFoodData = async()=>{

        try{
            se = await fetch(BASE_URL)
        const jsonData =  await response.json()
        console.log(jsonData)
        setData(jsonData)
        }
        catch(error){
                     
        }
        
    }
 
     fetchFoodData()
    return(
        <>
        <TopContainer>
            <Top>
                <div className="logo"> 
                      <img src="/images/logo.png" alt="img"/>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search Food..."/>
                </div>   
            </Top>

            <Option>
                 <Button>All</Button>
                 <Button>Breakfast</Button>
                 <Button>Lunch</Button>
                 <Button>Dinner</Button>
            </Option>
        </TopContainer>

        <FoodCardContainer>
                      <FoodCard>
                        
                      </FoodCard>
            </FoodCardContainer>
            
        </>
    )
}

const TopContainer = styled.div`
  max-width: 1200px;

`;


const Top = styled.div`
   min-height: 140px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin: 10px 100px 0;
   

   .search{
    margin-left: 800px;
    input{
        background-color: transparent;
        border: 1px solid red;
        color: white;
        font-size: 16px;
        font-weight: 400;
        border-radius: 5px;
        width: 285px;
        height: 40px;
        padding-left: 15px; 
    }
   }
`;

const Option = styled.div` 
   display: flex;
   justify-content: center;
   gap: 12px;
   margin-left: 300px;
   margin-top: -10px;
   margin-bottom: 10px;
   
`;

const Button = styled.button`
  background-color: #ff4343;
  font-weight: 550;
  color: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
`;

const FoodCardContainer = styled.div`
  height: 582px;
  background-image: url("/images/bg.png");
  background-size: cover;
  margin-bottom: 0;

`;
const FoodCard = styled.div`
 
`;