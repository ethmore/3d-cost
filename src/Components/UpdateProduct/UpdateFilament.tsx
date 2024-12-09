import { FormEvent, useState } from "react";
import { NumericInput, TextInput } from "../../ui/Inputs";
import { SaveButton } from "../../ui/Buttons";
import cross from "/src/assets/cross.svg";
import { FilamentSettings } from "../../Repository/filamentRepository";

type UpdateFilamentProps = JSX.IntrinsicElements["div"] & {
    filamentData: FilamentSettings;
    onClose: () => void;
    onSave: (newFilamentData: FilamentSettings) => void;
};

export default function UpdateFilament({
    filamentData,
    onClose,
    onSave,
    ...props
}: UpdateFilamentProps) {
    const [inputs, setInputs] = useState<FilamentSettings>(filamentData);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(inputs);
        onClose();
    };

    const handleChange = (inputName: string, value: string | number) => {
        setInputs((values) => ({
            ...values,
            [inputName]: value,
        }));
    };

    return (
        <div className="submenu-container" {...props}>
            {inputs && (
                <>
                    <div className="submenu-container-top">
                        <h1>Edit Filament:</h1>
                        <img className="close" src={cross} onClick={onClose} />
                    </div>
                    <h2>{inputs.filamentName}</h2>

                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Filament Name"
                            defaultValue={inputs.filamentName}
                            onChange={(v) => handleChange("filamentName", v)}
                        />
                        <NumericInput
                            label="Filament Cost"
                            defaultValue={inputs.filamentCost}
                            onChange={(v) => handleChange("filamentCost", v)}
                        />
                        <NumericInput
                            label="Filament Weight (grams)"
                            defaultValue={inputs.filamentWeight}
                            onChange={(v) => handleChange("filamentWeight", v)}
                        />
                        <NumericInput
                            label="Filament Wastage (%)"
                            defaultValue={inputs.filamentWastage}
                            onChange={(v) => handleChange("filamentWastage", v)}
                        />

                        <SaveButton innerText="Update" />
                    </form>
                </>
            )}
        </div>
    );
}
