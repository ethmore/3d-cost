import { getPrinters, savePrinter } from "./printerRepository";
import { getFilaments, saveFilament } from "./filamentRepository";
import { samplePrinter } from "./printerRepository";
import { sampleFilament } from "./filamentRepository";

export type OtherSettings = {
    electricityCostKWh: number;
    laborFee: number;
    profitMargin: number;
};

export const otherSettings = {
    electricityCostKWh: 0.5,
    laborFee: 10,
    profitMargin: 20,
};

export const updateGeneralSettings = (generalSettings: OtherSettings) => {
    localStorage.setItem("generalSettings", JSON.stringify(generalSettings));
};

export const getGeneralSettings = (): OtherSettings => {
    const generalSettings = localStorage.getItem("generalSettings");
    if (!generalSettings) return {} as OtherSettings;
    return JSON.parse(generalSettings);
};

export const initData = () => {
    const p = getPrinters();
    const f = getFilaments();
    const g = getGeneralSettings();

    if (p.length === 0 && f.length === 0 && Object.keys(g).length === 0) {
        savePrinter(samplePrinter);
        saveFilament(sampleFilament);
        updateGeneralSettings(otherSettings);
    }
};
