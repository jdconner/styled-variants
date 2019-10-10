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
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;

        h2, h3 {
            color: #09d3ac;
        }

        h2 {
            text-decoration: underline;
        }
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-context: center;

    * {
        margin-right: 10px;
    }
`;

export const AppContainer = styled.div`
    width: 50%;
    min-width: 600px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
`;
