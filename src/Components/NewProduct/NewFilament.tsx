import { FormEvent, useState } from "react";
import { NumericInput, TextInput } from "../../ui/Inputs";
import { SaveButton } from "../../ui/Buttons";
import {
    FilamentSettings,
    sampleFilament,
} from "../../Repository/filamentRepository";
import cross from "/src/assets/cross.svg";
import "./Submenu.css";

type NewFilamentProps = JSX.IntrinsicElements["div"] & {
    onClose: () => void;
    onSave: (filament: FilamentSettings) => void;
};

export default function NewFilament({
    onClose,
    onSave: onNewFilament,
    ...props
}: NewFilamentProps) {
    const [inputs, setInputs] = useState<FilamentSettings>(sampleFilament);

    const handleInputChange = (inputName: string, value: string | number) => {
        setInputs((values) => ({
            ...values,
            [inputName]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onNewFilament(inputs);
        onClose();
    };

    return (
        <div className="submenu-container" {...props}>
            <div className="submenu-container-top">
                <h1>New Filament</h1>
                <img className="close" src={cross} onClick={onClose} />
            </div>

            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Filament Name"
                    placeHolder="Sample Filament"
                    defaultValue={inputs.filamentName}
                    onChange={(v) => handleInputChange("filamentName", v)}
                />
                <NumericInput
                    label="Filament Cost"
                    defaultValue={inputs.filamentCost}
                    onChange={(v) => handleInputChange("filamentCost", v)}
                />
                <NumericInput
                    label="Filament Weight (grams)"
                    defaultValue={inputs.filamentWeight}
                    onChange={(v) => handleInputChange("filamentWeight", v)}
                />
                <NumericInput
                    label="Filament Wastage (%)"
                    defaultValue={inputs.filamentWastage}
                    onChange={(v) => handleInputChange("filamentWastage", v)}
                />
                <SaveButton />
            </form>
        </div>
    );
}
