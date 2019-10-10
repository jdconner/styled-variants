import React from "react";

export default ({ onClick, checked, name, type }) => {
    return (
        <div>
            <input
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
