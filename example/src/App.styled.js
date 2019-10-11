import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color:  ${({ theme }) => theme.colors.secondary};
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }

    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;

        h2, h3 {
            color: ${({ theme }) => theme.colors.primary};
            margin-top: 0;
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
    flex: 1;
    width: 100%;
    border-bottom: 1px dashed ${({ theme }) => theme.colors.primary};
    margin: 20px 0;
    padding-bottom: 20px;

    > :nth-child(1) {
        flex: 1;
    }

    > :nth-child(2) {
        flex: 3;
    }

    * {
        margin: 5px;
    }
`;

export const ExampleContainer = styled(BaseContainer)`
    display: flex;
    flex-direction: column;
`;

export const Legend = styled(ExampleContainer)`
    position: fixed;
    right: 0;
    top: 0;
    margin: 1.5rem;
    padding: 1.5rem;
    border: 3px dashed ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const AppContainer = styled(BaseContainer)`
    width: 70%;
    max-width: 860px;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
`;
