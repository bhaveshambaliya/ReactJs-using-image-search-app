import React ,{useState}  from "react";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
    accessKey: "your unspash key",
  });

export default function SearchPhotos() {

    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);

    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search
        .photos(10, query)
        .then(toJson)
        .then((json) => {
        setPics(json.results);
        });
      };
  return (
    <>
        <form className="form" onSubmit={searchPhotos}> 
        <label className="label" htmlFor="query"> 
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "space" or "nature"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
        <div className="card-list">
        {
          pics.map((pic) => 
            <div className="card" key={pic.id}>
              <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="50%"
                height="50%"
              ></img>
            </div>)
        }
        </div>   
      </form>
    </>
  );
}