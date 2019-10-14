import styled from "styled-components";
import { variantVariant, sizeVariant, appTypeVariant } from "./Buttons.theme";

export const BaseButton = styled.button`
    border-radius: 5px;
    border: ${({ theme }) => `2px solid ${theme.colors.border}`};
`;

export const ThemedButton = styled(BaseButton)(
    sizeVariant,
    variantVariant,
    appTypeVariant
);
