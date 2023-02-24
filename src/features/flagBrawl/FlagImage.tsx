import * as React from "react";

interface Country {
  country: {
    id: string;
    name: string;
    country_code: string;
  };
}

function FlagImage({ country }: Country) {
  const flagImage = `${country.country_code}.svg`;
  return (
    <div className="grid-item grid-item-1">
      <img
        alt="country-flag"
        style={{ height: "400px", border: "1px solid black" }}
        src={require(`../../assets/flags/${flagImage}`)}
      />
    </div>
  );
}

export default FlagImage;
