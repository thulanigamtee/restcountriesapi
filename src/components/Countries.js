import React, { useContext } from "react";
import StyledCountries from "../styles/styledCountries";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import CountriesContext from "../Context";

const Countries = () => {
  const { countriesData, index, isLoading } = useContext(CountriesContext);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <StyledCountries>
          {countriesData[index].map(
            ({ name, capital, population, region, flags }) => {
              return (
                <section key={name}>
                  <img src={flags.png} alt={name} />
                  <div>
                    <Link to={`details/${name}`}>
                      <p>{name}</p>
                    </Link>
                    <p>
                      population: <span>{population.toLocaleString()}</span>
                    </p>
                    <p>
                      region: <span>{region}</span>
                    </p>
                    <p>
                      capital:
                      <span> {capital}</span>
                    </p>
                  </div>
                </section>
              );
            }
          )}
        </StyledCountries>
      )}
    </>
  );
};

export default Countries;
