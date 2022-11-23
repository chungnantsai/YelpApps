import React, { useContext, useEffect } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
/* In react-router-dom v6 useHistory() is replaced by useNavigate(). */
import { useNavigate } from 'react-router-dom';


const RestaurantList = (props) => {
  // store 2 properties and deconstruce it. import useContext //
  const {restaurants, setRestaurants} = useContext(RestaurantsContext);

  // use useNavigate api //
  let navigate = useNavigate();
  useEffect(() => {
    /* define something */
    const fetchData = async () => {
    try {
        const response = await RestaurantFinder.get("/")
        /* set the state, and store the restaurant in our state */
        setRestaurants(response.data.data.restaurant);
        } catch (err) {}
    }; 
    /* called it as function */
    fetchData();
  },[]);

  const handleDelete = async (id) => {
    try {
        const response = await RestaurantFinder.delete(`/${id}`);
        console.log(response);
        setRestaurants(restaurants.filter(restaurant => {
            return restaurant.id !==id
        }))
    } catch (err) {
        console.log(err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/restaurants/${id}/update`)
  };


  return (
    <div className="list-group">
        <table className="table ">
            <thead>
                <tr className="bg-primary">
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price Range</th>
                <th scope="col">Ratings</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* if restaurants is undefined, then not run */}
                {restaurants && 
                   restaurants.map(restaurant => {
                    return (
                        <tr key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>reviews</td>
                        <td><button onClick={() => handleUpdate(restaurant.id)} className="btn btn-warning">Update</button></td>
                        {/* Pass error function to event handler, pass a reference to function, not function itself */}
                        <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    )
                })}
                {/*
                <tr>
                    <th scope="row">1</th>
                    <td>mcdonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>
                        <button className="btn btn-warning">Update</button>
                    </td>
                    <td>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>mcdonalds</td>
                    <td>Japan</td>
                    <td>$$</td>
                    <td>
                        <button className="btn btn-warning">Update</button>
                    </td>
                    <td>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
                */}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList