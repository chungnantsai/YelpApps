import React from "react";
import AddRestaurant from "../components/AddRestaurant";
import Header from "../components/Header"
import Navbar from "../components/Navbar";
import RestaurantList from "../components/RestaurantList";


const Home = () => {
    return(
        <div>
            <Navbar />
            <Header />
            <AddRestaurant />
            <RestaurantList />
        </div>
    )
}

export default Home