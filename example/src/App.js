import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, AppContainer, Legend } from "./App.styled";
import { colors } from "./App.theme";
import { Buttons } from "./components/Buttons";
import Radio from "./components/Radio";
import { MODES, APP_TYPES } from "./App.constants";

function App() {
    const [mode, setMode] = useState(MODES.DARK);
    const [appType, setAppType] = useState(APP_TYPES.HARD);
    const onClick = (value, action) => action(value);

    return (
        <ThemeProvider
            theme={{
                colors: colors[mode],
                appType,
                textDecoration: "underline",
                components: {
                    Button: {
                        userSelect: "none",
                        cursor: "pointer",
                        isActive: { fontFamily: "cursive", cursor: "help" },
                    },
                },
            }}>
            <GlobalStyle />
            <main>
                <Legend>
                    <h3>Mode</h3>
                    <Radio
                        name={MODES.DARK}
                        checked={mode === MODES.DARK}
                        onClick={onClick.bind(null, MODES.DARK, setMode)}
                        type={"mode"}
                    />
                    <Radio
                        name={MODES.LIGHT}
                        checked={mode === MODES.LIGHT}
                        onClick={onClick.bind(null, MODES.LIGHT, setMode)}
                        type={"mode"}
                    />
                    <br />
                    <h3>App Type</h3>
                    <Radio
                        name={APP_TYPES.HARD}
                        checked={appType === APP_TYPES.HARD}
                        onClick={onClick.bind(null, APP_TYPES.HARD, setAppType)}
                        type={"appType"}
                    />
                    <Radio
                        name={APP_TYPES.SOFT}
                        checked={appType === APP_TYPES.SOFT}
                        onClick={onClick.bind(null, APP_TYPES.SOFT, setAppType)}
                        type={"appType"}
                    />
                </Legend>
                <AppContainer>
                    <Examples />
                </AppContainer>
            </main>
        </ThemeProvider>
    );
}

const Examples = React.memo(() => (
    <div>
        <h2>Examples</h2>
        <Buttons />
    </div>
));

export default App;
