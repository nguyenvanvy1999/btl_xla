import React from "react";
import { Grid } from "@material-ui/core";
import {
  colorCodes,
  NONE,
  multiplierCodes,
  toleranceCodes
} from "../../core/constants";
import clsx from "clsx";

function ColorBand({ codes, type, band }) {
  //console.log("colorCodes[codes[band]]", colorCodes[codes[band]]);
  let typeData = colorCodes;
  switch (type) {
    case "multiplier":
      typeData = multiplierCodes;
      break;
    case "tolerance":
      typeData = toleranceCodes;
      break;

    default:
      typeData = colorCodes;
  }
  return (
    <Grid item>
      <div
        className={clsx(
          "colors",
          type ? type : "",
          codes[band] === 0
            ? NONE
            : typeData[codes[band]]
            ? typeData[codes[band]].label
            : ""
        )}
      >
      </div>
    </Grid>
  );
}

export default ColorBand;
