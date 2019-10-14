import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, AppContainer, Legend } from "./App.styled";
import { colors } from "./App.theme";
import { Buttons } from "./components/Buttons";
import Radio from "./components/Radio";
import { MODES, APP_TYPES } from "./App.constants";

function App() {
    const [mode, setMode] = useState(MODES.DARK);
    const [appType, setAppType] = useState(APP_TYPES.AGENT);
    const onClick = (value, action) => action(value);

    return (
        <ThemeProvider
            theme={{
                colors: colors[mode],
                appType,
                Button: { userSelect: "none", cursor: "pointer" },
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
                        name={APP_TYPES.AGENT}
                        checked={appType === APP_TYPES.AGENT}
                        onClick={onClick.bind(
                            null,
                            APP_TYPES.AGENT,
                            setAppType
                        )}
                        type={"appType"}
                    />
                    <Radio
                        name={APP_TYPES.CONSUMER}
                        checked={appType === APP_TYPES.CONSUMER}
                        onClick={onClick.bind(
                            null,
                            APP_TYPES.CONSUMER,
                            setAppType
                        )}
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
