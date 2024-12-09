import { FormEvent } from "react";
import { generateKey } from "../lib/util";

export type PrinterSettings = {
    uID: string;
    printerName: string;
    printerCost: number;
    maintenanceCost: number;
    printerLifetime: number;
    powerConsumption: number;
};

export const samplePrinter: PrinterSettings = {
    uID: "1_1733481650287",
    printerName: "Sample Printer",
    printerCost: 300,
    maintenanceCost: 100,
    printerLifetime: 3000,
    powerConsumption: 250,
};

export const savePrinter = (
    printer: PrinterSettings,
    e?: FormEvent
): string => {
    e?.preventDefault();
    const printerData = Object.values(printer);
    if (printerData.includes(0) || printerData.includes(""))
        return "Incorrect data";

    printer.uID = generateKey();

    var printersArray: PrinterSettings[];
    const printers = localStorage.getItem("printers");

    if (printers) {
        printersArray = JSON.parse(printers);
        for (let index = 0; index < printersArray.length; index++) {
            if (printersArray[index].printerName === printer.printerName)
                return "Error: There is another printer with same name";
        }
        const newPrinters = [...printersArray, printer];
        localStorage.setItem("printers", JSON.stringify(newPrinters));
    } else {
        printersArray = [printer];
        localStorage.setItem("printers", JSON.stringify(printersArray));
    }
    return "";
};

export const updatePrinter = (
    printerID: number,
    newInfo: PrinterSettings,
    e?: FormEvent
) => {
    e?.preventDefault();
    const printers = getPrinters();
    if (!printers.length) return;

    printers[printerID] = newInfo;
    localStorage.setItem("printers", JSON.stringify(printers));
};

export const getPrinters = (e?: FormEvent): PrinterSettings[] => {
    e?.preventDefault();
    const printers = localStorage.getItem("printers");
    if (!printers) return [];

    const printerArray = JSON.parse(printers);
    if (!printerArray.length) return [];
    return printerArray;
};

export const deletePrinter = (printerID: number) => {
    const productArray = getPrinters();
    if (!productArray.length) return;

    productArray.splice(printerID, 1);
    localStorage.setItem("printers", JSON.stringify(productArray));
};
