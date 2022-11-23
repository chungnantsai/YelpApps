import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    const handleSubmit = async (e) => {
        /* prevent it reload the page */
        e.preventDefault()
        try {
            /* return promise, so use async/await */
            const response = await RestaurantFinder.post("/",{
                /* name are the same, it cab be shorten
                name: name,
                location: location,
                */
                name,
                location,
                price_range: priceRange
            });
            /* retrieve from api */
            addRestaurants(response.data.data.restaurant)
            console.log(response)
        } catch (err) {

        }
    }
    return(
        <div className="mb-5">
                    <div className="row">
                            <div className="col">
                                {/* e: event  */}
                                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Name"/>
                            </div>
                            <div className="col">
                                <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Location"/>
                            </div>
                            <div className="col">
                                <select 
                                value={priceRange} onChange={e => setPriceRange(e.target.value)} 
                                className="form-control">
                                    <option disabled>Price Range</option>
                                    <option value="1">$</option>
                                    <option value="2">$$</option>
                                    <option value="3">$$$</option>
                                    <option value="4">$$$$</option>
                                    <option value="5">$$$$$</option>
                                </select>
                            </div>
                            <div className="col">
                                <button onClick={handleSubmit} type="submit" className="form-control btn btn-primary">Add</button>
                            </div>
                    </div>      
        </div>
    );
};

export default AddRestaurant
