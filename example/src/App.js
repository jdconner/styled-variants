import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, Container, AppContainer } from "./App.styled";
import { colors } from "./App.theme";
import { Buttons } from "./components/Buttons";
import Radio from "./components/Radio";

const MODES = {
    DARK: "dark",
    LIGHT: "light",
};

function App() {
    const [mode, setMode] = useState(MODES.DARK);
    const onClick = (value, action) => action(value);

    return (
        <ThemeProvider
            theme={{ mode, colors, Button: { borderRadius: "30px" } }}>
            <GlobalStyle />
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
                    </div>
                    <Examples />
                </AppContainer>
            </main>
        </ThemeProvider>
    );
}

const Examples = React.memo(() => (
    <div>
        <h2>Examples</h2>
        <Container>
            <Buttons />
        </Container>
    </div>
));

export default App;
