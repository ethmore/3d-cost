import { FormEvent } from "react";
import { generateKey } from "../lib/util";

export type FilamentSettings = {
    uID: string;
    filamentName: string;
    filamentCost: number;
    filamentWeight: number;
    filamentWastage: number;
};

export const sampleFilament: FilamentSettings = {
    uID: "2_1733481673730",
    filamentName: "Sample Filament",
    filamentCost: 20,
    filamentWeight: 1000,
    filamentWastage: 20,
};

export const saveFilament = (
    filament: FilamentSettings,
    e?: FormEvent
): string => {
    e?.preventDefault();
    const filamentData = Object.values(filament);
    if (filamentData.includes(0) || filamentData.includes(""))
        return "Incorrect data";

    filament.uID = generateKey();

    var filamentsArray: FilamentSettings[];
    const filaments = localStorage.getItem("filaments");

    if (filaments) {
        filamentsArray = JSON.parse(filaments);
        for (let index = 0; index < filamentsArray.length; index++) {
            if (filamentsArray[index].filamentName === filament.filamentName)
                return "Error: There is another filament with same name";
        }
        const newFilaments = [...filamentsArray, filament];
        localStorage.setItem("filaments", JSON.stringify(newFilaments));
    } else {
        filamentsArray = [filament];
        localStorage.setItem("filaments", JSON.stringify(filamentsArray));
    }
    return "";
};

export const updateFilament = (
    filamentID: number,
    newInfo: FilamentSettings,
    e?: FormEvent
) => {
    e?.preventDefault();
    const filaments = getFilaments();
    if (!filaments.length) return;

    filaments[filamentID] = newInfo;
    localStorage.setItem("filaments", JSON.stringify(filaments));
};

export const getFilaments = (e?: FormEvent): FilamentSettings[] => {
    e?.preventDefault();
    const filaments = localStorage.getItem("filaments");
    if (!filaments) return [];

    const filamentArray = JSON.parse(filaments);
    if (!filamentArray.length) return [];
    return filamentArray;
};

export const deleteFilament = (filamentID: number) => {
    const productArray = getFilaments();
    if (!productArray.length) return;
    productArray.splice(filamentID, 1);
    localStorage.setItem("filaments", JSON.stringify(productArray));
};
