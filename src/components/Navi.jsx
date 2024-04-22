import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as ReactBootstrap from "react-bootstrap";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'



const Navi = () => {

  const [postcode, setPostcode] = useState([]);
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);

  const fetchData = async (input) => {
    try {
      setLoading(true)
      setError("")
      const response = await axios.get(`http://localhost:8080/restaurants/${input}`);
      console.log("Response data: ", response.data.restaurants);
      setPostcode(response.data.restaurants);

      if (response.status === 204) {
        setError("Search unsuccessful. No data found.");
        setPostcode([]);
      } else {
        setPostcode(response.data.restaurants);
      }

    } catch (error) {
      console.log(error)
      setPostcode([]);
    } finally {
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData(input);
  };
 // Logic to get current restaurants
 const indexOfLastRestaurant = currentPage * restaurantsPerPage;
 const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
 const currentRestaurants = postcode.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

 // Function to handle next page
 const nextPage = () => {
     setCurrentPage(currentPage + 1);
 };




  return (
    <div>



      <div className="searchPost">
        <p>Where are you?</p>
        <form onSubmit={handleSubmit} className="searchForm">
          <input
            type="text"
            placeholder="Post Code"
            value={input}
            onChange={handleChange}
            className='inputSearch'
          />
                  <button type="submit" className="searchButton">Search</button>

        </form>
      </div>

      {loading ? 
      (<p>Loading...</p>) 
      :
      
        
        (
        <div className='cards'>
          {currentRestaurants.map((place, index) => (
               
            <Card className="card" key={index}>
             <Card.Body className='cardbody'>
             <Card.Img className='cardimg' src="https://cdn270-genai.picsart.com/54fe4413-217f-4095-a43a-1014161248e0/451509696034201.jpg" /> 

                <Card.Title className="cardTitle">
                  <p>{place.name}</p>

                </Card.Title>
                <p>Star Rating: {place.rating.starRating}</p>
                <p>Address: {place.address.firstLine}, {place.address.city}, {place.address.postalCode}</p>
                <ul>
                  {place.cuisines.map((cuisine, cuisineIndex) => (
                    <li key={cuisineIndex}> &#35;&#65039;&#8419; {cuisine.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
       
                 

          )
          )}    
        <div className='button'>
           {currentRestaurants.length ? (<div>
        <button onClick={nextPage}>Next</button>
       </div>  ) : null} </div>
        </div>
      
     
       )
        
        
        }


    </div>
  );
}

export default Navi