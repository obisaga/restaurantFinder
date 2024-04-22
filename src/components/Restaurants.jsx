import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [restaurantsPerPage] = useState(10);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/restaurants/EC4M7RF');
            console.log(response.data.restaurants);
            setRestaurants(response.data.restaurants);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Logic to get current restaurants
    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

    // Function to handle next page
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="cardContainer">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='cards'>
                    {currentRestaurants.map((place, index) => (
                        <Card className="card" key={index}>
                            <Card.Body>
                                <Card.Title className="cardTitle">
                                    <p>{place.name}</p>
                                   
                                </Card.Title>
                                 <p>Star Rating: {place.rating.starRating}</p>
                                    <p>Address: {place.address.firstLine}, {place.address.city}, {place.address.postalCode}</p>
                                    <ul>
                                        {place.cuisines.map((cuisine, cuisineIndex) => (
                                            <li key={cuisineIndex}>{cuisine.name}</li>
                                        ))}
                                    </ul>
                            </Card.Body>
                        </Card>
                    ))}
                    <button onClick={nextPage}>Next</button>
                </div>
            )}
        </div>
    );
};

export default Restaurants;