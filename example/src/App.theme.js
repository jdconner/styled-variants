import { MODES } from "./App.constants";

// dynamically create all hover/focus states for each color: darken
const BASE = {
    primary: "#09d3ac",
    secondary: "#282c34",
    white: "white",
    deepPurple: "purple",
    blue: "cyan",
};

const BASE_LIGHT = {
    ...BASE,
    primary: "#ff6f61",
    secondary: "#393d3f",
};

export const colors = {
    [MODES.DARK]: {
        ...BASE,
        border: BASE.primary,
        typography: {
            primary: BASE.secondary,
            secondary: BASE.white,
        },
    },
    [MODES.LIGHT]: {
        ...BASE_LIGHT,
        border: BASE_LIGHT.primary,
        typography: {
            primary: BASE.secondary,
            secondary: BASE.white,
        },
    },
};
