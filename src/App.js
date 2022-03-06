import React, { useEffect } from "react";
import axios  from "axios";
import "./App.css";

function App() {
  const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
  const [inputValue, setInputValue] = React.useState("");
  const [searchMove, setSearchMove] = React.useState([]);
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1",
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
          },
        }
      );
      setSearchMove(data.films);
    })();
  }, []);
  const filteredCountries = searchMove.filter((country) => {
    return country.nameRu.toLowerCase().includes(inputValue.toLowerCase());
  });
  console.log(searchMove);
  return (
    <div className="App">
      <div className="header">
        <div className="header_left">Movie App</div>
        <div className="header_right">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Поиск"
          />
        </div>
      </div>
      <div className="move">
        {filteredCountries.map((obj) => (
          <div key={obj.filmId} className="section">
            <div className="section_container">
              <div className="section_container_img">
                <img src={obj.posterUrlPreview} alt="Фото" />
              </div>
            </div>
            <p className="section_p1">{obj.nameRu}</p>

            {obj.genres.map((e, i) => {
              return (
                <span key={i} className="section_span">
                  {` ${e.genre}\u00A0`}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
