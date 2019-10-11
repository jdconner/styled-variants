import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import {
    GlobalStyle,
    Container,
    AppContainer,
    ExampleContainer,
} from "./App.styled";
import { colors } from "./App.theme";
import { Buttons } from "./components/Buttons";
import Radio from "./components/Radio";
import { MODES } from "./App.constants";

function App() {
    const [mode, setMode] = useState(MODES.DARK);
    const onClick = (value, action) => action(value);

    return (
        <ThemeProvider
            theme={{
                colors: colors[mode],
                Button: { userSelect: "none", cursor: "pointer" },
            }}>
            <GlobalStyle />
            <main>
                <AppContainer>
                    <ExampleContainer>
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
                    </ExampleContainer>
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
