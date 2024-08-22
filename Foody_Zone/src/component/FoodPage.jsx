import { useEffect, useState } from "react";
import styled from "styled-components"
import SearchResult from "./SearchResult";

export const BASE_URL = "http://localhost:9000";

export default function FoodPage(){

    const[data, setData] = useState(null)
    const[filteredData, setFilteredData] = useState(null)
    const[loading, setLoading] = useState(false) 
    const[error, setError] = useState(null)
    const[selectedBtn, setSelectedBtn]= useState('all') 
    
 
// I am using UseEffect for solveing re-rendering problem...
      useEffect(()=>{
        const fetchFoodData = async()=>{
         setLoading(true)

        try{
        const response = await fetch(BASE_URL)
        const jsonData =  await response.json()
        setData(jsonData);
        setFilteredData(jsonData)
        setLoading(false);
        
        }
        catch(error){
         setError('Unable to fetch data')
        }
        
    };
// Now I am calling fetchFoodData function.
      fetchFoodData()
      },[]);

// Search function..
  const searchFood = (e)=>{
      const searchValue = e.target.value;
      console.log(searchValue)

      if(searchValue === null){
        setFilteredData(null)
      }

     const filter = data?.filter((food)=>
       food.name.toLowerCase().includes(searchValue.toLowerCase())
     ) ;
     setFilteredData(filter)
  };

  const filterFood = (type)=>{
           if(type === 'all'){
               setFilteredData(data);
               setSelectedBtn('all');
               return;
           }
     const filter = data?.filter((food)=>
            food.type.toLowerCase().includes(type.toLowerCase())
          ) ;
         setFilteredData(filter)    
         setSelectedBtn(type)
  }

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

// If Error will show then this code will show.. 
    if(error){
        return(
            <div>{error}</div>
        )
    }
//  This code will run for showing loading..
    if(loading){
        return(
            <div>loading</div>
        )
    }

    return(
        <>
        <Container>
              <TopContainer>
            <Top>
                <div className="logo"> 
                      <img src="/images/logo.png" alt="img"/>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search Food..." onChange={searchFood}/><i class="fa-solid fa-magnifying-glass"></i>
                </div>   
            </Top>

            <Option>
            {filterBtns.map((value)=>(
                        <Button 
                         isSelected={selectedBtn === value.type}
                        onClick={() => filterFood(value.type)}>{value.name}</Button>
            ))}
            </Option>
        </TopContainer>

        </Container>
      <SearchResult data={filteredData}/>     
      
            
        </>
    )
}

export const Container = styled.div`
 max-width: 1200px;
 margin: 0 auto;
`;

const TopContainer = styled.div`
  max-width: 1200px;

`;


const Top = styled.div`
   height: 139px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin: 10px auto;
   

   .search{
    margin-left: 800px;
    display: flex;
    align-items: center;
    gap: 10px;
    input{
        background-color: transparent;
        border: 2px solid transparent;
        color: white;
        font-size: 16px;
        font-weight: 400;
        border-radius: 5px;
        width: 285px;
        height: 40px;
        padding-left: 15px; 
    }
   }

   @media(0 < width < 600px){
    flex-direction: column;
    height: 120px;
   }
`;

const Option = styled.div` 
   display: flex;
   justify-content: center;
   gap: 12px;
   margin: -20px auto 11px ;
   
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#ff4343" : "green")};
  outline: 1px solid ${({isSelected}) =>(isSelected ? 'white': '#ff4343')};
  font-weight: 550;
  color: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  &:hover{
    /* background-color: #f22f2f; */
  }
`;

