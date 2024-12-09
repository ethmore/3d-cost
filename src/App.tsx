import { useState } from "react";
import "./App.css";
import Calculator from "./Components/Calculator/Calculator";
import Settings from "./Components/Settings/Settings";
import {
    PrinterSettings,
    getPrinters,
    savePrinter,
    updatePrinter,
    deletePrinter,
} from "./Repository/printerRepository";
import {
    FilamentSettings,
    getFilaments,
    saveFilament,
    updateFilament,
    deleteFilament,
} from "./Repository/filamentRepository";
import {
    OtherSettings,
    getGeneralSettings,
    updateGeneralSettings,
    initData,
} from "./Repository/otherSettingsRepository";

function App() {
    initData();
    var localPrinters = getPrinters();
    var localFilaments = getFilaments();
    var localGeneralSettings = getGeneralSettings();

    const [printers, setPrinters] = useState<PrinterSettings[]>(localPrinters);
    const [filaments, setFilaments] =
        useState<FilamentSettings[]>(localFilaments);
    const [generalSettings, setGeneralSettings] =
        useState<OtherSettings>(localGeneralSettings);

    const updatePrinterData = () => {
        localPrinters = getPrinters();
        setPrinters(localPrinters);
    };

    const updateFilamentData = () => {
        localFilaments = getFilaments();
        setFilaments(localFilaments);
    };

    const handleNewPrinter = (newPrinter: PrinterSettings) => {
        savePrinter(newPrinter);
        updatePrinterData();
    };
    const handleNewFilament = (newFilament: FilamentSettings) => {
        saveFilament(newFilament);
        updateFilamentData();
    };
    const handleUpdatePrinter = (
        printerID: number,
        newPrinterInfo: PrinterSettings
    ) => {
        updatePrinter(printerID, newPrinterInfo);
        updatePrinterData();
    };
    const handleUpdateFilament = (
        filamentID: number,
        newFilamentInfo: FilamentSettings
    ) => {
        updateFilament(filamentID, newFilamentInfo);
        updateFilamentData();
    };
    const handleDeletePrinter = (printerID: number) => {
        deletePrinter(printerID);
        updatePrinterData();
    };
    const handleDeleteFilament = (filamentID: number) => {
        deleteFilament(filamentID);
        updateFilamentData();
    };
    const handeChangeGeneralSettings = (
        newGeneralSettingsData: OtherSettings
    ) => {
        updateGeneralSettings(newGeneralSettingsData);
        localGeneralSettings = getGeneralSettings();
        setGeneralSettings(localGeneralSettings);
    };

    return (
        <div className="app">
            <Calculator
                printers={printers}
                filaments={filaments}
                otherSettings={generalSettings}
            />
            <Settings
                printers={printers}
                filaments={filaments}
                generalSettings={generalSettings}
                onNewPrinter={handleNewPrinter}
                onNewFilament={handleNewFilament}
                onUpdatePrinter={handleUpdatePrinter}
                onUpdateFilament={handleUpdateFilament}
                onDeletePrinter={handleDeletePrinter}
                onDeleteFilament={handleDeleteFilament}
                onChangeGeneralSettings={(data) => {
                    handeChangeGeneralSettings(data);
                }}
            />
        </div>
    );
}

export default App;
