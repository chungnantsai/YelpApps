import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {

    const [restaurants, setRestaurants] = useState([]);

    /* define a function for adding a restaurant */
    const addRestaurants = (restaurant) => {
        /* take the current restaurant array and copy over to this array */
        setRestaurants([...restaurants, restaurant]);
    }
    return ( 
        <RestaurantsContext.Provider value ={{restaurants, setRestaurants, addRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    )

}