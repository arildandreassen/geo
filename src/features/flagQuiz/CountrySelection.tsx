import * as React from "react";
import { Country } from "../../types/types";
import countries from "../../assets/countries/countries.json";

function CountrySelection({ countryIds, handleCountryClick }: any) {
  return (
    <div className="grid-item grid-item-3 country-grid">
      {countryIds.map((countryId: string, index: number) => {
        const { name } = countries.find((country: Country) => country.id === countryId);
        return (
          <div key={countryId} className={`country-item-${index + 1}`}>
            <div
              className="country-selection"
              data-country-id={countryId}
              onClick={handleCountryClick}
            >
              {name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CountrySelection;
