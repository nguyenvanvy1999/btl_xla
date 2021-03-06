import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import "../../styles/resistor.css";
import clsx from "clsx";
import ColorCodeSelector from "./ColorCodeSelector";
import {
  colorCodes,
  multiplierCodes,
  toleranceCodes,
  UNICODE_PLUS_MINUS
} from "../../core/constants";
import ColorBand from "./ColorBand";
import {
  formatResistorValue,
  getLabel,
  getColorDisplayValue,
  getCalculationDisplayDetails
} from "../../core/helpers";

function Resistor() {
  const [codes, setCodes] = useState({
    band: "",
    color1: 0,
    color2: 0,
    color3: 0,
    multiplier: 0,
    tolerance: 0,
    ppm: ""
  });

  const [resistorValue, setResistorValue] = useState(0);

  function setColorCode(key, value) {
    setCodes({ ...codes, [key]: value });
  }
  function findResistorValue({ color1, color2, color3, multiplier }) {
    return formatResistorValue(
      (parseInt(`${colorCodes[color1].value}${colorCodes[color2].value}`) *
        (multiplierCodes[multiplier].value * 100)) /
        100 // 100/100 to round to 2 decimals
    );
  }
  useEffect(() => {
    if (
      colorCodes[codes.color1].value !== -1 &&
      colorCodes[codes.color2].value !== -1 &&
      multiplierCodes[codes.multiplier].value !== -1
    ) {
      setResistorValue(findResistorValue(codes));
    } else {
      setResistorValue("--");
    }
  }, [codes]);
  return (
    <div>
      <Box my={2} textAlign="center">
        <Box my={1}>
          <Box component="span" fontSize="3em">
            {resistorValue}Ω{" "}
            <span className="text-gray">
              {` ${UNICODE_PLUS_MINUS}
               ${toleranceCodes[codes.tolerance] &&
                 toleranceCodes[codes.tolerance].value}`}
            </span>
          </Box>
          <Box component="div" fontSize="0.925em">
            Resistor value {getCalculationDisplayDetails(codes)}
          </Box>
        </Box>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={1} md={3}>
            <div className="resistor-leads"></div>
          </Grid>
          <Grid item xs>
            <div className="resistor-body">
              <Grid container spacing={0} justify="space-around">
                <ColorBand codes={codes} band="color1" />
                <ColorBand codes={codes} band="color2" />
                <ColorBand codes={codes} band="multiplier" type="multiplier" />

                <Grid item xs={4} md={6}>
                  <Box display="flex" justifyContent="flex-end">
                    <ColorBand
                      codes={codes}
                      band="tolerance"
                      type="tolerance"
                    />
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={1} md={3}>
            <div className="resistor-leads"></div>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} mb={2}>
        <b>Tip:</b>{" "}
        <i>Move or click the slider below to select a resistor band color.</i>
      </Box>
      <section className="color-selector-section">
        <Grid container>
          <Grid item xs={3} sm={2} lg={1}>
            <div>1st Band</div>
            <small
              className={clsx(
                "text-uppercase",
                `text-${getLabel(codes.color1, colorCodes)}`
              )}
            >
              {getLabel(codes.color1, colorCodes)}{" "}
              {getColorDisplayValue(codes.color1, colorCodes)}
            </small>
          </Grid>
          <Grid item xs>
            <ColorCodeSelector
              setColorCode={setColorCode}
              bandName="color1"
              type="color"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3} sm={2} lg={1}>
            <div>2nd Band</div>
            <small
              className={clsx(
                "text-uppercase",
                `text-${getLabel(codes.color2, colorCodes)}`
              )}
            >
              {getLabel(codes.color2, colorCodes)}{" "}
              {getColorDisplayValue(codes.color2, colorCodes)}
            </small>
          </Grid>
          <Grid item xs>
            <ColorCodeSelector setColorCode={setColorCode} bandName="color2" />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3} sm={2} lg={1}>
            <div>Multiplier</div>
            <small
              className={clsx(
                "text-uppercase",
                `text-${getLabel(codes.multiplier, multiplierCodes)}`
              )}
            >
              {getLabel(codes.multiplier, multiplierCodes)}{" "}
              {getColorDisplayValue(
                codes.multiplier,
                multiplierCodes,
                "multiplier"
              )}
            </small>
          </Grid>
          <Grid item xs>
            <ColorCodeSelector
              setColorCode={setColorCode}
              bandName="multiplier"
              type="multiplier"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3} sm={2} lg={1}>
            <div>Tolerance</div>
            <small
              className={clsx(
                "text-uppercase",
                `text-${getLabel(codes.tolerance, toleranceCodes)}`
              )}
            >
              {getLabel(codes.tolerance, toleranceCodes)}{" "}
              {getColorDisplayValue(
                codes.tolerance,
                toleranceCodes,
                "tolerance"
              )}
            </small>
          </Grid>
          <Grid item xs>
            <ColorCodeSelector
              setColorCode={setColorCode}
              bandName="tolerance"
              type="tolerance"
            />
          </Grid>
        </Grid>
      </section>
    </div>
  );
}

export default Resistor;
