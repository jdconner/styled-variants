
<h1 align="center" text-align="center">
    <img height="70px" width="70px" src="https://octodex.github.com/images/daftpunktocat-guy.gif">
   styled-variants
   <img height="70px" width="70px" src="https://octodex.github.com/images/daftpunktocat-thomas.gif">
</h1>

<p align="center">
    <img src="https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357">
    <img src="https://img.shields.io/github/license/jdconner/styled-variants">
    <img src="https://img.shields.io/github/package-json/v/jdconner/styled-variants">
    <img src="https://img.shields.io/github/size/jdconner/styled-variants/src/index.js">
</p>

<p align="center" style="width: 100%; text-align: center; display: flex; justify-content: center;">
A scalable styled-component theming system that fully leverages JavaScript as a language for styles authoring and theming at both local and global levels.
</p>
<br>

> Note: This was create specifically for `styled-components` but can also be used with `@emotion/styled`.

## Table Of Contents

- [Why Another Theming Library?](#why-another-theming-library)
- [Install](#install)
- [Usage](#usage)
  - [Basic](#basic)
  - [Passing Props](#passing-props)
  - [Boolean Variants](#boolean-variants)
  - [Combining Variants](#combining-variants)
  - [Pseudo Class Support](#pseudo-class-support)
  - [Global Theming](#global-theming)
- [Contributing](#contributing)
- [License](#license)

## Why Another Theming Library?

At [Remine](https://remine.com/info/careers/), we not only have _multiple global themes_ (i.e. separate themes for different apps/stakeholders, with light and dark themes for each), but _we also have multiple variants_: `size` (e.g. small, large, etc), `state` (e.g. error, warning, etc), and `type` (e.g. primary, secondary, tertiary) with more to come. We couldn't find a library in the ecosystem that could support such a large number of variants with minimal code, so we decided to create one.

Most theming systems for `styled-components` available today spit out string values (e.g. [styled-theming](https://github.com/styled-components/styled-theming), [styled-theme](https://github.com/diegohaz/styled-theme)) which can add a code bloat since you still need to assign the theme value to a css property. `styled-variants` takes advantage of the first-class object functionality that `styled-components` has added in [version 3.3.0](https://spectrum.chat/styled-components/general/v3-3-0-is-out-with-first-class-object-support~2b5fd935-fb1d-480d-a524-95ecd540a1ac) to help reduce this bloat and allow for cleaner, scalable theming.

## Install

```bash
$ npm install --save styled-variants
```

## Usage

See our Buttons [example code](https://github.com/jdconner/styled-variants/tree/master/example/src/components/Buttons) if you'd rather read code to understand the use cases.

### Basic

If we expect to write our HTML like this:

```html
<!-- takes default/medium styles -->
<ThemedButton />

<!-- takes large styles -->
<ThemedButton size="large" />

<!-- takes small styles -->
<ThemedButton size="small" />
```


Behind the scenes, the standard approach to define the variants is to write a `styled-component` that uses ternary switches within the template literal definition:

<img height="20px" width="20px" src="https://www.iconsdb.com/icons/preview/red/x-mark-xxl.png"> **DIFFICULT TO READ**
```js
export const Button = styled.button`
    padding: ${props =>
        props.size === "large"
            ? "1em 1.2em"
            : props.size === "small"
            ? "0.3em 0.7em"
            : "0.7em 1em"};
    font-size: ${props =>
        props.size === "large"
            ? "1.2rem"
            : props.size === "small"
            ? "0.8rem"
            : "1rem"};
`;
```
This is not only difficult to read, but it's not scalable.

**_Imagine_** what it would look like if we had even more size options or if "size" affected more css attributes!

This is the problem `styled-variants` is aiming to address.

With `styled-variants`, we can see easily:
1. What is included in each variant, and
2. What the css values will be without having to parse multiple levels of conditionals:

<img height="20px" width="20px" src="https://www.iconsdb.com/icons/preview/green/check-mark-3-xxl.png"> **EASIER TO READ**
```js
import styled from "styled-components";
import createTheme from "styled-variants";

const ButtonTheme = createTheme("Button");

const defaultSizeStyles = {
    padding: "0.7em 1em",
    fontSize: "1rem",
};

const sizeVariant = ButtonTheme.variant("size", {
    ...defaultSizeStyles,
    small: {
        padding: "0.3em 0.7em",
        fontSize: "0.8rem",
    },
    large: {
        padding: "1em 1.2em",
        fontSize: "1.2rem",
    },
});

export const ThemedButton = styled.button(sizeVariant);
```

---

### Passing Props

Just like `styled-components`, `styled-variants` also supports passing of props via function:

```js
import styled from "styled-components";
import createTheme from "styled-variants";

const ButtonTheme = createTheme("Button");

const defaultTypeStyles = {
    color: "white",
    border: ({ theme }) => `5px solid ${theme.colors.primary}`,
    backgroundColor: ({ theme }) => theme.colors.secondary,
};

export const typeVariant = ButtonTheme.variant("type", {
    ...defaultTypeStyles,
    secondary: {
        color: "black",
        backgroundColor: ({ theme }) => theme.colors.primary,
        borderColor: ({ theme }) => theme.colors.secondary,
    },
});

export const ThemedButton = styled.button(typeVariant);
```

Then we can use `styled-components`'s `ThemeProvider` to inject a theme into the props of our `ThemedButton`:

```jsx
import { ThemeProvider } from "styled-components";
import { ThemedButton } from "./ThemedButton.js";

const colors = {
    primary: "#09d3ac",
    secondary: "#282c34",
};

const MyApp = () => {
    return (
        <ThemeProvider theme={{ colors }}>
            <ThemedButton />
            <ThemedButton type="secondary" />
        </ThemeProvider>
    );
};
```

---

### Boolean Variants

If we have separate states (e.g. isDisabled, isActive, isOpen, etc) for each variant, we can easily incorporate those too:

```js
const typeVariant = ButtonTheme.variant("type", {
    isDisabled: {
        opacity: 0.5,
        cursor: "default",
        pointerEvents: "none",
    },
    isActive: {
        boxShadow: "0px 0px 1px 1px purple",
    },
    secondary: {
        isDisabled: {
            opacity: 0.7,
        },
        isActive: {
            boxShadow: "0px 0px 1px 1px blue",
        },
    },
});
```

Then we can pass a prop value for `isDisabled` and `isActive`:

```js
const MyApp = () => {
    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <ThemeProvider theme={{ colors }}>
            <ThemedButton isDisabled={isDisabled} type="secondary" />
            <ThemedButton isDisabled={isDisabled} />
            <ThemedButton isDisabled={isDisabled} type="secondary" isActive />
        </ThemeProvider>
    );
};
```

---

### Combining Variants

Thankfully, `styled-components` allows for multiple sets of first class objects, so we can do the following to combine our variants:

```js

const typeVariant = {
    /*** Insert previous examples here ***/
}

const sizeVariant = {
    /*** Insert previous examples here ***/
}

export const ThemedButton = styled.button(typeVariant, sizeVariant);
```

---

### Pseudo Class Support

To add pseudo classes we need to make it a valid object key. This is done simply by wrapping it in quotes:

```js
import createTheme from "styled-variants";

const ButtonTheme = createTheme("Button");

const typeVariant = ButtonTheme.variant("type", {
    ...defaultTypeStyles,
    primary: {
        color: "green",
        "&:hover": {
            color: "limegreen",
        },
    },
    secondary: {
        color: "black",
        "&:focus, &:hover": {
            color: "purple",
        },
    },
});
```

---

### Global Theming

In previous examples, we created our theme named `Button`, so at the root of our app, if we'd like to globally style all of our buttons, we can do that by adding a `Button` key and the values we want to the `ThemeProvider`:

```js
// App.js
const MyApp = () => {
    return (
        <ThemeProvider
            theme={{
                colors,
                Button: {
                    userSelect: "none",
                    cursor: "pointer",
                    isDisabled: { cursor: "default", pointerEvents: "none" },
                },
            }}>
            <ThemedButton />
            <ThemedButton isDisabled />
        </ThemeProvider>
    );
};
```

---

## Contributing

Contributions are welcome. Standards have yet to be set but we will set these in the near future.

To see you changes as you make them, an example app has been created. You can run it with:

```bash
$ npm run example
```

## License

MIT
