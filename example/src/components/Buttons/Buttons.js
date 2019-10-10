import React from "react";
import { Container } from "../../App.styled";
import { StyledButton } from './Buttons.styled';

export default props => {
    return (
        <Container>
            <StyledButton size="large">Large</StyledButton>
            <StyledButton>Default</StyledButton>
            <StyledButton size="small">Small</StyledButton>
        </Container>
    );
};
