import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from 'react-router-dom';

const UpdateRestaurant = (props) => {
    /* deconstruct id */
    const {id} =  useParams();

    const { restaurants } = useContext(RestaurantsContext);

    /* setup the status */
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);
            console.log(response.data.data)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        };
        fetchData();
    /* []:dependency array. only mounted when this component run */
    },[]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        /* Make an api call */
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        navigate(`/`)
    };
  


    return (
        <div>
            <form action="">
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text" />
                </div>
                <div className='form-group'>
                    <label htmlFor='price_range'>Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)}  id="price_range" className="form-control" type="number" />
                </div>
                <br/>
                <button type="submit" onClick={handleSubmit} className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant