import { useEffect, useState } from "react";
import { PrinterSettings } from "../../Repository/printerRepository";
import { FilamentSettings } from "../../Repository/filamentRepository";
import { OtherSettings } from "../../Repository/otherSettingsRepository";
import { Product } from "../../ui/Product";
import { AddButton } from "../../ui/Buttons";
import { NumericInput } from "../../ui/Inputs";
import "./GeneralSettings.css";
import Watermark from "../../ui/Watermark";

type GeneralSettingsProps = {
    printers: PrinterSettings[];
    filaments: FilamentSettings[];
    generalSettings: OtherSettings;
    onAddPrinter: () => void;
    onAddFilament: () => void;
    onUpdatePrinter: (ID: number) => void;
    onUpdateFilament: (ID: number) => void;
    onDeletePrinter: (ID: number) => void;
    onDeleteFilament: (ID: number) => void;
    onChangeGeneralSettings: (newGeneralSettings: OtherSettings) => void;
};

const GeneralSettings = (props: GeneralSettingsProps) => {
    const [inputs, setInputs] = useState<OtherSettings>(props.generalSettings);

    useEffect(() => {
        props.onChangeGeneralSettings(inputs);
    }, [inputs]);

    const handleInputChange = (inputName: string, value: string | number) => {
        setInputs((values) => ({
            ...values,
            [inputName]: value,
        }));
    };

    return (
        <div className="general-settings">
            <div className="settings-header">
                <h1>SETTINGS</h1>
            </div>
            <div className="settings-printers">
                <div className="settings-printers-head">
                    <h2>Printers</h2>
                    <AddButton onClick={props.onAddPrinter} />
                </div>
                {props.printers.map((printer, i) => {
                    return (
                        <Product
                            key={printer.uID}
                            productName={printer.printerName}
                            onEdit={() => props.onUpdatePrinter(i)}
                            onDelete={() => props.onDeletePrinter(i)}
                        />
                    );
                })}
            </div>
            <div className="settings-filaments">
                <div className="settings-filaments-head">
                    <h2>Filaments</h2>
                    <AddButton onClick={props.onAddFilament} />
                </div>
                <div className="filaments">
                    {props.filaments.map((filament, i) => {
                        return (
                            <Product
                                key={filament.uID}
                                productName={filament.filamentName}
                                onEdit={() => props.onUpdateFilament(i)}
                                onDelete={() => props.onDeleteFilament(i)}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="other-settings">
                <div className="other-settings-head">
                    <h2>General Settings</h2>
                </div>
                <NumericInput
                    label="Electricity Cost (kWh)"
                    defaultValue={props.generalSettings.electricityCostKWh}
                    onChange={(v) => handleInputChange("electricityCostKWh", v)}
                />
                <NumericInput
                    label="Labor Fee"
                    defaultValue={props.generalSettings.laborFee}
                    onChange={(v) => handleInputChange("laborFee", v)}
                />
                <NumericInput
                    label="Profit Margin"
                    defaultValue={props.generalSettings.profitMargin}
                    onChange={(v) => handleInputChange("profitMargin", v)}
                />
            </div>
            <Watermark />
        </div>
    );
};

export default GeneralSettings;
