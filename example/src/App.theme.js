
// dynamically create all hover/focus states for each color: darken
const BASE = {
    primary: "#09d3ac",
    secondary: "#282c34",
    white: "white",
    deepPurple: "purple",
};

export const colors = {
    ...BASE,
    border: BASE.deepPurple,
    typography: {
        primary: BASE.white,
        secondary: BASE.secondary
    },
};
