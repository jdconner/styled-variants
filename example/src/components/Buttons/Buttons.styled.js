import styled from "styled-components";
import createTheme from "../../../../src";

const ButtonTheme = createTheme("Button");

const defaultStyles = {
    padding: "0.5em 1em",
    fontSize: "1rem",
    border: "2px solid #d8d8d8",
};

const buttonSizeStyles = ButtonTheme.variants("size", {
    ...defaultStyles,
    small: {
        padding: "0.3em 0.7em",
        fontSize: "0.8rem",
    },
    medium: defaultStyles,
    large: {
        padding: "1em 2em",
        fontSize: "2rem",
    },
});

export const ThemedButton = styled.button(buttonSizeStyles);

export const StyledButton = styled(ThemedButton)`
    pointer: cursor;
    border-radius: 5px;
`;
