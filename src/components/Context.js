import { createContext, useState, useEffect } from "react";
import StyledSearchFilter from "../styles/styledSearchFilter";

const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const url = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [region, setRegion] = useState([]);
  const [activeRegion, setActiveRegion] = useState("Filter by Region");
  const [search, setSearch] = useState([]);
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);

  const data = [countries, search, filtered];

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    setSearch(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      )
    );
  }, [name]);

  const handleCountrySearch = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    setFiltered(
      countries.filter((country) =>
        country.region.toLowerCase().includes(region.toLowerCase())
      )
    );
  }, [region]);

  const handleRegionFilter = (e) => {
    setRegion(e.target.innerText);
    setActiveRegion(e.target.innerText);
  };

  const removeRegionFilter = () => {
    setActiveRegion("Filter by Region");
    setIndex(0);
  };

  useEffect(() => {
    if (name.length > 0) {
      setIndex(1);
    }
    if (activeRegion !== "Filter by Region") {
      setIndex(2);
    }
  }, [name, region]);

  return (
    <CountriesContext.Provider
      value={{
        data,
        index,
        activeRegion,
        handleCountrySearch,
        handleRegionFilter,
        removeRegionFilter,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesContext;
