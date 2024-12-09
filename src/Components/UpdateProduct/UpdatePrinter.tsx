import { FormEvent, useState } from "react";
import { NumericInput, TextInput } from "../../ui/Inputs";
import { SaveButton } from "../../ui/Buttons";
import cross from "/src/assets/cross.svg";
import { PrinterSettings } from "../../Repository/printerRepository";

type UpdatePrinterProps = JSX.IntrinsicElements["div"] & {
    printerData: PrinterSettings;
    onClose: () => void;
    onSave: (newPrinterData: PrinterSettings) => void;
};

export default function UpdatePrinter({
    printerData,
    onClose,
    onSave,
    ...props
}: UpdatePrinterProps) {
    const [inputs, setInputs] = useState<PrinterSettings>(printerData);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(inputs);
        onClose();
    };

    const handleChange = (inputName: string, value: string | number) => {
        setInputs((values: PrinterSettings) => ({
            ...values,
            [inputName]: value,
        }));
    };

    return (
        <div className="submenu-container" {...props}>
            {inputs && (
                <>
                    <div className="submenu-container-top">
                        <h1>Edit Printer:</h1>
                        <img className="close" src={cross} onClick={onClose} />
                    </div>
                    <h2>{inputs.printerName}</h2>

                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Printer Name"
                            defaultValue={inputs.printerName}
                            onChange={(v) => handleChange("printerName", v)}
                        />
                        <NumericInput
                            label="Total Printer Cost"
                            defaultValue={inputs.printerCost}
                            onChange={(v) => handleChange("printerCost", v)}
                        />
                        <NumericInput
                            label="Total Maintenance Cost"
                            defaultValue={inputs.maintenanceCost}
                            onChange={(v) => handleChange("maintenanceCost", v)}
                        />
                        <NumericInput
                            label="Printer Lifetime (h)"
                            defaultValue={inputs.printerLifetime}
                            onChange={(v) => handleChange("printerLifetime", v)}
                        />
                        <NumericInput
                            label="Power Consumption (watt)"
                            defaultValue={inputs.powerConsumption}
                            onChange={(v) =>
                                handleChange("powerConsumption", v)
                            }
                        />
                        <SaveButton innerText="Update" />
                    </form>
                </>
            )}
        </div>
    );
}
