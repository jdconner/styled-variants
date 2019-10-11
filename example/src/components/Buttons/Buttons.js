import React from "react";
import { Container, ExampleContainer } from "../../App.styled";
import { ThemedButton } from "./Buttons.styled";

export default () => {
    return (
        <ExampleContainer>
            <Container>
                Sizes:
                <ThemedButton size="large">Large</ThemedButton>
                <ThemedButton>Default</ThemedButton>
                <ThemedButton size="small">Small</ThemedButton>
            </Container>
            <Container>
                Variants:
                <ThemedButton>Default</ThemedButton>
                <ThemedButton variant="primary">Primary</ThemedButton>
                <ThemedButton variant="secondary">Secondary</ThemedButton>
            </Container>
            <Container>
                Combined:
                <ThemedButton size="large" variant="primary" borderColor="purple">
                    Large Primary
                </ThemedButton>
                <ThemedButton size="small" variant="primary">
                    Small Primary
                </ThemedButton>
                <ThemedButton size="large" variant="secondary">
                    Large Secondary
                </ThemedButton>
                <ThemedButton size="small" variant="secondary">
                    Small Secondary
                </ThemedButton>
            </Container>
            <Container>
                Variants with boolean variants
                <ThemedButton variant="primary" isActive={true}>
                    Primary isActive
                </ThemedButton>
                <ThemedButton variant="primary" isDisabled={true}>
                    Primary isDisabled
                </ThemedButton>
                <ThemedButton
                    variant="primary"
                    size="small"
                    isActive={true}
                    isDisabled={true}>
                    Small Primary isActive + isDisabled
                </ThemedButton>
            </Container>
        </ExampleContainer>
    );
};
