import createTheme from "../../../../src"; // styled-variant

const ButtonTheme = createTheme("Button");

const defaultSizeStyles = {
    padding: "0.7em 1.2em",
    fontSize: "1rem",
};

const defaultVariantStyles = {
    border: ({ theme }) => `3px solid ${theme.colors.primary}`,
    backgroundColor: ({ theme }) => theme.colors.white,
    color: ({ theme }) => theme.colors.secondary,
};

export const sizeVariant = ButtonTheme.variant("size", {
    ...defaultSizeStyles,
    small: {
        padding: "0.3em 0.7em",
        fontSize: "0.8rem",
    },
    medium: defaultSizeStyles,
    large: {
        padding: "1em 1.5em",
        fontSize: "1.5rem",
    },
});

export const variantVariant = ButtonTheme.variant("variant", {
    primary: defaultVariantStyles,
    secondary: {
        border: ({ theme }) => `3px solid ${theme.colors.white}`,
        backgroundColor: ({ theme }) => theme.colors.secondary,
        color: ({ theme }) => theme.colors.white,
    },
});
