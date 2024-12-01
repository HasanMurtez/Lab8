import axios from "axios";
import { useState, useEffect } from "react";
import Movies from "./movies";

function Read() {
    const [data, setData] = useState([]); // State to store movie data

    // Function to reload movie data from the server
    const Reload = () => {
        console.log("Reloading movie data...");
        axios.get('http://localhost:4000/api/movies') // Fetch movie data
            .then((response) => {
                setData(response.data.movies); // Update the state with the movie list
            })
            .catch((error) => {
                console.error("Error reloading data:", error);
            });
    };

    // Load movie data when the component mounts
    useEffect(() => {
        Reload();
    }, []); 

    return (
        <div>
            <h2>Movie List</h2>
            
            {/* Pass movie data and reload function to Movies */}
            <Movies myMovies={data} ReloadData={Reload} />
        </div>
    );
}

export default Read;
