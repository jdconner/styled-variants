import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, Container, AppContainer } from "./App.styled";

import { Buttons } from "./components/Buttons";
import Radio from "./components/Radio";

const MODES = {
    DARK: "dark",
    LIGHT: "light",
};

const APPS = {
    AGENT: "agent",
    CONSUMER: "consumer",
};

function App() {
    const [mode, setMode] = useState(MODES.DARK);
    const [app, setApp] = useState(APPS.AGENT);
    const onClick = (value, action) => action(value);

    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={{ mode, app }}>
                <main>
                    <AppContainer>
                        <div>
                            <h2>Theme Toggles</h2>
                            <Container>
                                <h3>Mode</h3>
                                <Radio
                                    name={MODES.DARK}
                                    checked={mode === MODES.DARK}
                                    onClick={onClick.bind(
                                        null,
                                        MODES.DARK,
                                        setMode
                                    )}
                                    type={"mode"}
                                />
                                <Radio
                                    name={MODES.LIGHT}
                                    checked={mode === MODES.LIGHT}
                                    onClick={onClick.bind(
                                        null,
                                        MODES.LIGHT,
                                        setMode
                                    )}
                                    type={"mode"}
                                />
                            </Container>
                            <Container>
                                <h3>App</h3>
                                <Radio
                                    name={APPS.AGENT}
                                    checked={app === APPS.AGENT}
                                    onClick={onClick.bind(
                                        null,
                                        APPS.AGENT,
                                        setApp
                                    )}
                                    type={"app"}
                                />
                                <Radio
                                    name={APPS.CONSUMER}
                                    checked={app === APPS.CONSUMER}
                                    onClick={onClick.bind(
                                        null,
                                        APPS.CONSUMER,
                                        setApp
                                    )}
                                    type={"app"}
                                />
                            </Container>
                        </div>
                        <div>
                            <h2>Examples</h2>
                            <Container>
                                <Buttons />
                            </Container>
                        </div>
                    </AppContainer>
                </main>
            </ThemeProvider>
        </>
    );
}

export default App;
