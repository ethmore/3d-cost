import { FormEvent, useState } from "react";
import { NumericInput, TextInput } from "../../ui/Inputs";
import { SaveButton } from "../../ui/Buttons";
import {
    PrinterSettings,
    samplePrinter,
} from "../../Repository/printerRepository";
import cross from "/src/assets/cross.svg";
import "./Submenu.css";

type NewPrinterProps = JSX.IntrinsicElements["div"] & {
    onClose: () => void;
    onSave: (newPrinter: PrinterSettings) => void;
};

export default function NewPrinter({
    onClose,
    onSave: onNewPrinter,
    ...props
}: NewPrinterProps) {
    const [inputs, setInputs] = useState<PrinterSettings>(samplePrinter);

    const handleInputChange = (inputName: string, value: string | number) => {
        setInputs((values) => ({
            ...values,
            [inputName]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onNewPrinter(inputs);
        onClose();
    };

    return (
        <div className="submenu-container" {...props}>
            <div className="submenu-container-top">
                <h1>New Printer</h1>
                <img className="close" src={cross} onClick={onClose} />
            </div>

            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Printer Name"
                    placeHolder="Sample Printer"
                    defaultValue={inputs.printerName}
                    onChange={(v) => handleInputChange("printerName", v)}
                />
                <NumericInput
                    label="Total Printer Cost"
                    defaultValue={inputs.printerCost}
                    onChange={(v) => handleInputChange("printerCost", v)}
                />
                <NumericInput
                    label="Total Maintenance Cost"
                    defaultValue={inputs.maintenanceCost}
                    onChange={(v) => handleInputChange("maintenanceCost", v)}
                />
                <NumericInput
                    label="Printer Lifetime (h)"
                    defaultValue={inputs.printerLifetime}
                    onChange={(v) => handleInputChange("printerLifetime", v)}
                />
                <NumericInput
                    label="Power Consumption (watt)"
                    defaultValue={inputs.powerConsumption}
                    onChange={(v) => handleInputChange("powerConsumption", v)}
                />
                <SaveButton />
            </form>
        </div>
    );
}
