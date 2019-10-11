import React from "react";
import { Container, ExampleContainer } from "../../App.styled";
import { ThemedButton } from "./Buttons.styled";

export default () => {
    return (
        <ExampleContainer>
            <Container>
                <ThemedButton size="large">Large</ThemedButton>
                <ThemedButton>Default</ThemedButton>
                <ThemedButton size="small">Small</ThemedButton>
            </Container>
            <Container>
                <ThemedButton variant="primary">Primary</ThemedButton>
                <ThemedButton variant="primary">Primary2</ThemedButton>
                <ThemedButton variant="secondary">Secondary</ThemedButton>
            </Container>
            <Container>
                <ThemedButton size="large" variant="primary">Large Primary</ThemedButton>
                <ThemedButton size="small" variant="primary">Small Primary</ThemedButton>
                <ThemedButton size="small" variant="secondary">Small Secondary</ThemedButton>
            </Container>
        </ExampleContainer>
    );
};
