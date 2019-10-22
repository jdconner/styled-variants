import defaultsDeep from "lodash.defaultsdeep";

function _isObject(value) {
    return value != null && typeof value === "object";
}

function _isFunction(value) {
    return value != null && typeof value === "function";
}

function _isPseudoClass(value) {
    return value.includes(":");
}

function _isNegation(value) {
    return value.charAt(0) === "!";
}

function _getList(value) {
    return value.split(",").map(val => val.trim());
}

function parseForBooleanVariants(props, sheet) {
    let variantSheet = { ...sheet };
    for (let [key, value] of Object.entries(variantSheet)) {
        const shouldNegate = _isNegation(key);
        let sanitizedKey = key;

        if (shouldNegate) sanitizedKey = key.substring(1);

        if (_isObject(value) && !_isPseudoClass(key)) {
            const shouldApplyVariant = shouldNegate
                ? !props[sanitizedKey]
                : !!props[sanitizedKey];

            if (shouldApplyVariant) {
                // * The more nested the values, the higher the precedence
                variantSheet = defaultsDeep(
                    parseForBooleanVariants(props, variantSheet[key]),
                    variantSheet
                );
            }

            // * Removes excess key/values that do not apply to
            // * reduce the number of styles created by styled-components
            delete variantSheet[key];
        }
    }

    return variantSheet;
}

function normalizeStylesheet(props, variantStylesheet, variantPropValue) {
    const stylesheetVariant =
        (variantPropValue && variantStylesheet[variantPropValue]) || {};

    let variantSheet = parseForBooleanVariants(
        props,
        defaultsDeep({ ...stylesheetVariant }, variantStylesheet)
    );

    for (let [key, value] of Object.entries(variantSheet)) {
        // * Support passing of props to functions
        if (_isFunction(value)) {
            variantSheet[key] = value(props);
        } else if (_isPseudoClass(key)) {
            // * Support pseudo-class functions
            let newPseudoValues = {};

            for (let [pseudoKey, pseudoValue] of Object.entries(
                variantSheet[key]
            )) {
                newPseudoValues[pseudoKey] = _isFunction(pseudoValue)
                    ? pseudoValue(props)
                    : pseudoValue;
            }

            if (key.includes(",")) {
                _getList(key).forEach(key2 => {
                    variantSheet[key2] = {
                        ...variantSheet[key2],
                        ...newPseudoValues,
                    };
                });
                delete variantSheet[key];
            } else {
                variantSheet[key] = newPseudoValues;
            }
        }
    }

    return variantSheet;
}

function theme(componentName, baseSheet = {}) {
    function self(props) {
        const globalComponentStylesheet =
            normalizeStylesheet(props, props.theme[componentName]) || {};
        const baseStylesheet = normalizeStylesheet(
            props,
            _isFunction(baseSheet) ? baseSheet(props) : baseSheet
        );

        // * Local takes precedence over global because of higher specificity
        return defaultsDeep(
            ...self.styles.map(func => func(props)),
            baseStylesheet,
            globalComponentStylesheet
        );
    }

    self.styles = [];

    self.addVariant = function(variantName, variantStylesheet) {
        function variant(props) {
            const variantPropValue = props[variantName];

            return normalizeStylesheet(
                props,
                _isFunction(variantStylesheet)
                    ? variantStylesheet(props)
                    : variantStylesheet,
                variantPropValue
            );
        }

        this.styles.push(variant);

        return this;
    };

    self.addGlobalVariant = function(variantName, variantStylesheet) {
        function globalVariant(props) {
            const variantPropValue = props.theme[variantName];

            return normalizeStylesheet(
                props,
                _isFunction(variantStylesheet)
                    ? variantStylesheet(props)
                    : variantStylesheet,
                variantPropValue
            );
        }

        this.styles.push(globalVariant);

        return this;
    };

    return self;
}

export default theme;
