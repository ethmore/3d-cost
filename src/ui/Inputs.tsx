import { useState } from "react";
import "./Inputs.css";

type NumericInputProps = {
    label: string;
    defaultValue?: number;
    required?: boolean;
    onChange?: (value: number) => void;
};

export function NumericInput({ required = true, ...props }: NumericInputProps) {
    const [value, setValue] = useState<number>(props.defaultValue || 0);
    return (
        <div className="input-container">
            <label className="input-label" htmlFor={props.label}>
                {props.label}
            </label>
            <input
                id={props.label}
                type="number"
                className="input"
                required={required}
                value={value}
                onChange={(e) => {
                    if (!Number(e.target.value)) return;
                    setValue(parseFloat(e.target.value));
                    props.onChange!(parseFloat(e.target.value));
                }}></input>
        </div>
    );
}

type TextInputProps = {
    label: string;
    defaultValue?: string;
    placeHolder?: string;
    required?: boolean;
    onChange?: (value: string) => void;
};

export function TextInput({ required = true, ...props }: TextInputProps) {
    return (
        <div className="input-container">
            <label className="input-label" htmlFor={props.label}>
                {props.label}
            </label>
            <input
                id={props.label}
                type="text"
                className="input"
                defaultValue={props.defaultValue}
                placeholder={props.placeHolder}
                required={required}
                onChange={(e) => props.onChange!(e.target.value)}></input>
        </div>
    );
}
