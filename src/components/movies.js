import MovieItem from "./movieitem";

function Movies(props) {
    return (
        <>
            {/* Loop through movies and render each as a MovieItem */}
            {props.myMovies.map((movie) => (
                <MovieItem
                    mymovie={movie} // Pass movie details
                    key={movie._id} // Unique key for each movie
                    Reload={props.ReloadData} // Function to refresh movie list
                />
            ))}
        </>
    );
}

export default Movies;
