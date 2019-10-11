import styled from "styled-components";
import { variantVariant, sizeVariant } from "./Buttons.theme";

export const BaseButton = styled.button`
    cursor: pointer;
    border-radius: 5px;
    border: ${({ theme }) => `5px solid ${theme.colors.border}`}
    border-color: pink;

    :first-child {
        border-color: green;
    }
`;

export const ThemedButton = styled(BaseButton)(
    variantVariant,
    sizeVariant
);
