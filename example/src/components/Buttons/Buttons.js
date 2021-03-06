import React from "react";
import { Container, ExampleContainer } from "../../App.styled";
import { ThemedButton } from "./Buttons.styled";
import Text from "../Text";

export default () => {
    return (
        <ExampleContainer>
            <Container>
                <Text>Sizes:</Text>
                <div>
                    <ThemedButton size="large">Large</ThemedButton>
                    <ThemedButton>Default</ThemedButton>
                    <ThemedButton size="small">Small</ThemedButton>
                </div>
            </Container>
            <Container>
                <Text>Variants:</Text>
                <div>
                    <ThemedButton>Default</ThemedButton>
                    <ThemedButton variant="primary">Primary</ThemedButton>
                    <ThemedButton variant="secondary">Secondary</ThemedButton>
                </div>
            </Container>
            <Container>
                <Text>Combined:</Text>
                <div>
                    <ThemedButton size="large" variant="primary">
                        Large Primary
                    </ThemedButton>
                    <ThemedButton variant="primary">
                        Default Primary
                    </ThemedButton>
                    <ThemedButton size="small" variant="primary">
                        Small Primary
                    </ThemedButton>
                    <ThemedButton size="large" variant="secondary">
                        Large Secondary
                    </ThemedButton>
                    <ThemedButton variant="secondary">
                        Default Secondary
                    </ThemedButton>
                    <ThemedButton size="small" variant="secondary">
                        Small Secondary
                    </ThemedButton>
                    <ThemedButton>Default Default</ThemedButton>
                </div>
            </Container>
            <Container>
                <Text>Variants with boolean prop variants:</Text>
                <div>
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
                        isDisabled={true}
                        isPurple>
                        Small Primary isActive + isDisabled + isPurple
                    </ThemedButton>
                </div>
            </Container>
        </ExampleContainer>
    );
};
