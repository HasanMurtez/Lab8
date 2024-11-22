import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Edit(props) {
  let { id } = useParams();  // Get the movie ID from URL
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const navigate = useNavigate();  // Navigate to another page after edit

  // Fetch movie details from server
  useEffect(() => {
    axios.get('http://localhost:4000/api/movie/' + id)
      .then((response) => {
        setTitle(response.data.title);
        setYear(response.data.year);
        setPoster(response.data.poster);  // Set poster URL from response
      })
      .catch((error) => {
        console.log(error);  // Log any errors
      });
  }, [id]);

  // Handle form submission to update movie
  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission
    const newMovie = { id, title, year, poster };  // Prepare updated movie data
    axios.put('http://localhost:4000/api/movie/' + id, newMovie)  // Send PUT request
      .then((res) => {
        console.log(res.data);  // Log server response
        navigate('/read');  // Redirect to '/read' page after successful edit
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Movie Title: </label>
          <input type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} />  {/* Update title state */}
        </div>
        <div className="form-group">
          <label>Release Year: </label>
          <input type="text" 
            className="form-control" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} />  {/* Update year state */}
        </div>
        <div className="form-group">
          <label>Poster URL: </label>
          <input type="text" 
            className="form-control" 
            value={poster} 
            onChange={(e) => setPoster(e.target.value)} />  {/* Update poster state */}
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Movie" className="btn btn-primary" />  {/* Submit the form */}
        </div>
      </form>
    </div>
  );
}
