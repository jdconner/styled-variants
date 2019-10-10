import styled from 'styled-components';
import themer from '../../../../src';

const ButtonTheme = themer("Button");

const buttonSizeStyles = ButtonTheme.variants("size", {
    padding: "0.5em 1em",
    fontSize: "1rem",
    border: '2px solid #d8d8d8',
    large: {
        padding: "1em 2em",
        fontSize: "2rem",
    },
    small: {
        padding: "0.3em 0.7em",
        fontSize: "0.8rem",
    },
});

export const ThemedButton = styled.button(buttonSizeStyles);