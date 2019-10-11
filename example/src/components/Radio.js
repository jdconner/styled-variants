import React from "react";

import styled from 'styled-components';

const RadioOption = styled.input`
    cursor: pointer;
`;

export default ({ onClick, checked, name, type }) => {
    return (
        <div>
            <RadioOption
                type="radio"
                id={name}
                name={type}
                value={name}
                checked={checked}
                onChange={onClick}
            />
            <label htmlFor={name}>{name}</label>
        </div>
    );
};
