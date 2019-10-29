function _isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
}

function _isFunction(value) {
    return value && typeof value === "function";
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

function deepMerge(target, ...sources) {
    const output = target;

    if (_isObject(target)) {
        sources.forEach(source => {
            if (_isObject(source)) {
                Object.keys(source).forEach(key => {
                    // Avoid prototype pollution
                    if (key === "__proto__") {
                        return;
                    }

                    if (_isObject(source[key]) && key in target) {
                        output[key] = deepMerge(
                            { ...target[key] },
                            source[key]
                        );
                    } else {
                        output[key] = source[key];
                    }
                });
            }
        });
    }

    return output;
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
                variantSheet = deepMerge(
                    { ...variantSheet },
                    parseForBooleanVariants(props, variantSheet[key])
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
        deepMerge({ ...variantStylesheet }, stylesheetVariant)
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
        const globalValriantValue =
            (props.theme &&
                props.theme.components &&
                props.theme.components[componentName]) ||
            {};
        const globalComponentStylesheet = normalizeStylesheet(
            props,
            globalValriantValue
        );
        const baseStylesheet = normalizeStylesheet(
            props,
            _isFunction(baseSheet) ? baseSheet(props) : baseSheet
        );

        // * Local takes precedence over global because of higher specificity
        return deepMerge(
            { ...globalComponentStylesheet },
            baseStylesheet,
            ...self.styles.map(func => func(props))
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
