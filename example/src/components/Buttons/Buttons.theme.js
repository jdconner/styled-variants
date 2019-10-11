import createTheme from "../../../../src"; // styled-variant

const ButtonTheme = createTheme("Button");

/* Size */
const defaultSizeStyles = {
    padding: "0.7em 1em",
    fontSize: "1rem",
};

export const sizeVariant = ButtonTheme.variant("size", {
    ...defaultSizeStyles,
    small: {
        padding: "0.3em 0.7em",
        fontSize: "0.8rem",
    },
    medium: defaultSizeStyles,
    large: {
        padding: "1em 1.2em",
        fontSize: "1.2rem",
    },
});

/* Variant */
const defaultVariantStyles = {
    border: ({ theme }) => `5px solid ${theme.colors.primary}`,
    backgroundColor: ({ theme }) => theme.colors.white,
    color: ({ theme }) => theme.colors.secondary,
};

export const variantVariant = ButtonTheme.variant("variant", {
    isDisabled: {
        opacity: 0.5,
        cursor: "default",
        pointerEvents: "none",
    },
    primary: {
        ...defaultVariantStyles,
        borderRadius: "3em",
        isActive: {
            backgroundColor: ({ theme }) => theme.colors.primary,
            color: ({ theme }) => theme.colors.white,
        },
    },
    secondary: {
        border: ({ theme }) => `3px solid ${theme.colors.white}`,
        backgroundColor: "transparent",
        color: ({ theme }) => theme.colors.white,
    },
});
