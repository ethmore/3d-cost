import { useEffect, useState } from "react";
import Select from "../../ui/Select";
import CalculationResult from "../../ui/CalculationResult";
import { NumericInput } from "../../ui/Inputs";
import { calculate, Costs } from "../../lib/util";
import { PrinterSettings } from "../../Repository/printerRepository";
import { FilamentSettings } from "../../Repository/filamentRepository";
import { OtherSettings } from "../../Repository/otherSettingsRepository";
import "./Calculator.css";

const costLabels = [
    "Printer Cost: ",
    "Material Cost: ",
    "Power Cost: ",
    "Labor Fee: ",
    "Profit: ",
    "Total Print Cost: ",
];

type CalculatorProps = {
    printers: PrinterSettings[];
    filaments: FilamentSettings[];
    otherSettings: OtherSettings;
};

export default function Calculator(props: CalculatorProps) {
    const [inputs, setInputs] = useState({
        selectedPrinter: 0,
        selectedFilament: 0,
        printWeight: 50,
        printTime: 240,
    });
    const [costs, setCosts] = useState<Costs>();

    const printerNames: string[] = props.printers.map((printer) => {
        return printer.printerName;
    });
    const filamentNames: string[] = props.filaments.map((filament) => {
        return filament.filamentName;
    });

    useEffect(() => {
        setCosts(() => {
            return calculate(inputs);
        });
    }, [inputs, props.filaments, props.printers, props.otherSettings]);

    return (
        <div className="calculator-wrapper">
            <div className="calculator-container">
                3D Print Cost Calculator
                <div className="calculator-inputWrapper">
                    <Select
                        label="Select Printer"
                        data={printerNames}
                        onChange={(printer) =>
                            setInputs({ ...inputs, selectedPrinter: printer })
                        }
                    />
                    <Select
                        label="Select Filament"
                        data={filamentNames}
                        onChange={(filament) =>
                            setInputs({ ...inputs, selectedFilament: filament })
                        }
                    />
                    <NumericInput
                        label="Print Weight (grams)"
                        defaultValue={inputs.printWeight}
                        onChange={(printWeight) =>
                            setInputs({ ...inputs, printWeight: printWeight })
                        }
                    />
                    <NumericInput
                        label="Print Time (mins)"
                        defaultValue={inputs.printTime}
                        onChange={(printTime) =>
                            setInputs({ ...inputs, printTime: printTime })
                        }
                    />

                    <div className="calculator-result">
                        {costs && (
                            <>
                                {Object.entries(costs).map((cost, i) => {
                                    return (
                                        <CalculationResult
                                            key={i}
                                            label={costLabels[i]}
                                            value={cost[1]}
                                            className={`costs ${
                                                cost[0] === "totalCost"
                                                    ? ""
                                                    : "sub-cost"
                                            }`}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
