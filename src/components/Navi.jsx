import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as ReactBootstrap from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Navi = () => {
  const [postcode, setPostcode] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);
  const [show, setShow] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  
  const fetchData = async (input) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://localhost:8080/restaurants/${input}`);
      console.log("Response data: ", response.data.restaurants);

      if (!response.data.restaurants.length) {
        console.log("Wrong postcode");
        setError("Search unsuccessful. No data found.");
        setPostcode([]);
        setShow(true); 
      } else {
        setPostcode(response.data.restaurants);
      }
    } catch (error) {
      console.log(error);
      setPostcode([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData(input);
  };

  // Get current 10 restaurants
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = postcode.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Function to handle next page
  const nextPage = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(currentPage + 1);
  };

  // Function to handle previous page
  const prevPage = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(currentPage - 1);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    if (sortBy) {
      setLoading(true);
      axios.get(`http://localhost:8080/restaurants/${input}`)
        .then(response => {
          const sortedRestaurants = response.data.restaurants.slice().sort((a, b) => {
            if (sortBy === 'topRated') {
              return b.rating.starRating - a.rating.starRating;
            } else if (sortBy === 'lowRated') {
              return a.rating.starRating - b.rating.starRating;
            }
          });
          setPostcode(sortedRestaurants);
        })
        .catch(error => {
          console.error('Error fetching restaurants:', error);
          setPostcode([]);
        })
        .finally(() => setLoading(false));
    }
  }, [sortBy]);

  

  return (
    <div>
      <div className='top'>
        <div className='header'><h2>RESTAURANTS</h2><h1>Near Me</h1></div>
        <div className="searchPost">
          <p className='text1'>Where are you?</p>
          <Form onSubmit={handleSubmit} className="searchForm">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <input
                type="text"
                placeholder="Post Code"
                value={input}
                onChange={handleChange}
                className='inputSearch'
              />
            </Form.Group>
            <Button variant="outline-light" type="submit" className="searchButton">Search</Button>
          </Form>
        </div>
        {loading ? (<Spinner animation="border" variant="light" />) : null}
      </div>

      {error ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Something went wrong :(</Modal.Title>
          </Modal.Header>
          <Modal.Body>Make sure your postcode is correct.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}

      {!loading && (
        <div>

          {postcode.length ?<div>  <p className='sorting'>Sort by:</p>
          <Button className='sortingButton'  onClick={() => setSortBy('topRated')}> ▲ Top Rated</Button>
          <Button className='sortingButton'  onClick={() => setSortBy('lowRated')}> ▼ Low Rated</Button> </div> : null}
         

          <div className='cards'>
            {currentRestaurants.map((place, index) => (
              <Card className="card" key={index}>
                <Card.Body className='cardbody'>
                  <div className='bodyimg'><Card.Img className='cardimg' src="https://cdn270-genai.picsart.com/54fe4413-217f-4095-a43a-1014161248e0/451509696034201.jpg" /></div>
                  <div className='bodytext'>
                    <Card.Title className="cardTitle"> <p>{place.name}</p> </Card.Title>
                    <p className='infoText'>Rating: {place.rating.starRating} <Rating name="read-only" value={place.rating.starRating} readOnly /> </p>
                    <p className='infoText'> {place.address.firstLine}, {place.address.city}, {place.address.postalCode}</p>
                    <ul>
                      {place.cuisines.map((cuisine, cuisineIndex) => (
                        <li key={cuisineIndex} className='infoText'> &#35;&#65039;&#8419; {cuisine.name}</li>
                      ))}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            ))}
            <div className='button'>
              {currentRestaurants.length ? (
                <div>
                  {currentPage > 1 && (
                    <Button className='buttonPrev' size="lg" onClick={prevPage}>
                      ⟪ Previous
                    </Button>
                  )}
                  <Button className='buttonNext' size="lg" onClick={nextPage}>
                    Next ⟫
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navi;