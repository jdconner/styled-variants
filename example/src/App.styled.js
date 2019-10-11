import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }

    main {
        background-color:  ${({ theme }) => theme.colors.secondary};
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;

        h2, h3 {
            color: ${({ theme }) => theme.colors.primary};
        }

        h2 {
            text-decoration: underline;
        }
    }
`;

const BaseContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled(BaseContainer)`
    flex-direction: row;

    * {
        margin-right: 10px;
    }
`;

export const ExampleContainer = styled(BaseContainer)`
    display: flex;
    flex-direction: column;

    * {
        margin: 8px;
    }
`;

export const AppContainer = styled(BaseContainer)`
    width: 70%;
    max-width: 860px;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
`;
