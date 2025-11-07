import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = "b10a2007";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch {
        setError("Failed to load movie details.");
      }
    };

    fetchMovie();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <Link to="/">⬅ Back to Home</Link>
      <h2>{movie.Title}</h2>
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.Title}
      />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
}

export default MovieDetails;
