import createTheme from "styled-variants"; // styled-variant
import { APP_TYPES } from "../../App.constants";

const appType = props => ({
    [APP_TYPES.SOFT]: {
        fontFamily: "cursive",
    },
    [APP_TYPES.HARD]: {
        textDecoration: props.theme.textDecoration,
    },
});

export default createTheme("Text").addGlobalVariant("appType", appType);
