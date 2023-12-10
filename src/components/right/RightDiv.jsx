import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { removeFromList } from "../../redux/actions/listActions";
import "./RightDiv.css";
import { NavLink } from "react-router-dom";

const RightDiv = () => {
  const movies = useSelector(({ list }) => list);
  const [listName, setListName] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const dispatch = useDispatch();

  const showAlert = (icon, title) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1700,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon,
      title,
    });
  };

  const handleRemove = (movie) => {
    showAlert("success", "Movie removed from list");
    dispatch(removeFromList(movie));
  };

  const showNotification = (icon, title) => {
    let timerInterval;

    Swal.fire({
      title,
      html: "I will close in <b></b> milliseconds.",
      timer: 1500,
      icon,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    setIsCreated(icon === "success");
  };

  const handleCreateListButton = () => {
    listName === ""
      ? showNotification("info", "Please specify a name for your list")
      : showNotification("success", "List created successfully");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputOnChange = (e) => {
    e.preventDefault();
    setListName(e.target.value);
  };

  const movieArray = [...movies.movies];

  return (
    <div className="right" id="down">
      <div className="list-group">
        <div className="list-name">
          <h2>Create a movie list</h2>
        </div>
        <div className="list-name-bar">
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleInputOnChange}
              type="text"
              placeholder="Type name of list"
              className="search-bar list-name-bar"
              disabled={isCreated}
            />
          </form>
        </div>
      </div>
      {!isCreated && (
        <div className="movie-list border-none">
          {movieArray === undefined ? (
            <p>No movie available</p>
          ) : (
            movieArray.map((movie) => (
              <div key={movie.movie.imdbID}>
                <div className="movie-card-in-list">
                  <div className="card-image">
                    <img src={movie.movie.Poster} alt={movie.movie.Title} />
                  </div>
                  <div className="card-text">
                    <div className="card-title">
                      <h1>{movie.movie.Title}</h1>
                    </div>
                    <div className="card-id">
                      <p>Movie ID: {movie.movie.imdbID}</p>
                    </div>
                    <div className="card-year">
                      <p>Year: {movie.movie.Year}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(movie.movie)}
                      className="remove-button remove-submit"
                      disabled={isCreated}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {isCreated ? (
        <div className="create-list-button">
          <NavLink to={`/movielist`} className="button list-button">
            Go to {listName.length > 0 ? listName : "list"}
          </NavLink>
        </div>
      ) : (
        <div className="create-list-button">
          <button
            onClick={handleCreateListButton}
            className="button search-submit margin-top"
          >
            Create list
          </button>
        </div>
      )}
    </div>
  );
};

export default RightDiv;
