import React from "react";
import { Container } from "../../App.styled";
import { ThemedButton } from './Buttons.styled';

export default props => {
    return (
        <Container>
            <ThemedButton size="large">Large</ThemedButton>
            <ThemedButton>Default</ThemedButton>
            <ThemedButton size="small">Small</ThemedButton>
        </Container>
    );
};
