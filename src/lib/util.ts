import { getPrinters } from "../Repository/printerRepository";
import { getFilaments } from "../Repository/filamentRepository";
import { getGeneralSettings } from "../Repository/otherSettingsRepository";

type CalculateProps = {
    printTime: number;
    printWeight: number;
    selectedPrinter: number;
    selectedFilament: number;
};

export type Costs = {
    printerCost: number;
    powerCost: number;
    materialCost: number;
    laborFee: number;
    profit: number;
    totalCost: number;
};

export const calculate = (props: CalculateProps): Costs => {
    const printers = getPrinters();
    const filaments = getFilaments();
    const otherSettings = getGeneralSettings();

    if (
        !printers.length ||
        !filaments.length ||
        !Object.keys(otherSettings).length
    )
        return {
            printerCost: NaN,
            powerCost: NaN,
            materialCost: NaN,
            laborFee: NaN,
            profit: NaN,
            totalCost: NaN,
        };

    const printerSettings = printers[props.selectedPrinter];
    const filamentSettings = filaments[props.selectedFilament];

    // (printerCost + maintenanceCost) / printerLifetime = printer cost per hour
    const printerCostPerHour =
        (printerSettings.printerCost + printerSettings.maintenanceCost) /
        printerSettings.printerLifetime;
    const printerCost = (printerCostPerHour * props.printTime) / 60;

    // (electricityCost * electricityUsage) / 1000 = power cost per hour
    const powerCostPerHour =
        (otherSettings!.electricityCostKWh * printerSettings.powerConsumption) /
        1000;
    const powerCost = (powerCostPerHour * props.printTime) / 60;
    // ((filamentCost * filamentWastage) / 100 + filamentCost) / filamentWeight = filament cost per gram
    const materialCostPerGram =
        ((filamentSettings.filamentCost * filamentSettings.filamentWastage) /
            100 +
            filamentSettings.filamentCost) /
        filamentSettings.filamentWeight;
    const materialCost = materialCostPerGram * props.printWeight;

    const laborFee = (otherSettings!.laborFee * props.printTime) / 60;

    const profit =
        ((printerCost + powerCost + materialCost + laborFee) *
            otherSettings.profitMargin) /
        100;

    const totalCost =
        printerCost + powerCost + materialCost + laborFee + profit;

    return {
        printerCost: printerCost,
        powerCost: powerCost,
        materialCost: materialCost,
        laborFee: laborFee,
        profit: profit,
        totalCost: totalCost,
    };
};

export const generateKey = () => {
    return `${Math.random()}_${new Date().getTime()}`;
};
