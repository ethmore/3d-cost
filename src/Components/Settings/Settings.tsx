import { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import NewPrinter from "../NewProduct/NewPrinter";
import NewFilament from "../NewProduct/NewFilament";
import UpdatePrinter from "../UpdateProduct/UpdatePrinter";
import UpdateFilament from "../UpdateProduct/UpdateFilament";
import { PrinterSettings } from "../../Repository/printerRepository";
import { FilamentSettings } from "../../Repository/filamentRepository";
import { OtherSettings } from "../../Repository/otherSettingsRepository";
import "./Settings.css";

const mountedStyle = {
    animation: "inAnimation 250ms ease-in",
};
const unMountedStyle = {
    animation: "outAnimation 250ms ease-out",
    animationFillMode: "forwards",
};

type subMenu =
    | "general"
    | "newPrinter"
    | "newFilament"
    | "updatePrinter"
    | "updateFilament";

type SettingsProps = {
    printers: PrinterSettings[];
    filaments: FilamentSettings[];
    generalSettings: OtherSettings;
    onNewPrinter: (newPrinter: PrinterSettings) => void;
    onNewFilament: (newFilament: FilamentSettings) => void;
    onUpdatePrinter: (
        printerID: number,
        newPrinterData: PrinterSettings
    ) => void;
    onUpdateFilament: (
        filamentID: number,
        newFilamentData: FilamentSettings
    ) => void;
    onDeletePrinter: (printerID: number) => void;
    onDeleteFilament: (filamentID: number) => void;
    onChangeGeneralSettings: (newGeneralSettingsData: OtherSettings) => void;
};

export default function Settings(props: SettingsProps) {
    const [settingsActive, setSettingsActive] = useState<boolean>(false);
    const [activeMenu, setActiveMenu] = useState<subMenu>("general");
    const [mountedSubMenu, setMountedSubMenu] = useState<subMenu>("general");
    const [editPrinterID, setEditPrinterID] = useState<number>(1);
    const [editFilamentID, setEditFilamentID] = useState<number>(1);

    const handleOnAnimationEnd = () => {
        if (mountedSubMenu === "general") setActiveMenu("general");
    };
    const handleSubMenuClose = () => {
        setMountedSubMenu("general");
    };
    const renderActiveMenu = () => {
        switch (activeMenu) {
            case "newPrinter":
                return (
                    <NewPrinter
                        style={
                            mountedSubMenu === "newPrinter"
                                ? mountedStyle
                                : unMountedStyle
                        }
                        onAnimationEnd={handleOnAnimationEnd}
                        onClose={handleSubMenuClose}
                        onSave={props.onNewPrinter}
                    />
                );
            case "newFilament":
                return (
                    <NewFilament
                        style={
                            mountedSubMenu === "newFilament"
                                ? mountedStyle
                                : unMountedStyle
                        }
                        onAnimationEnd={handleOnAnimationEnd}
                        onClose={handleSubMenuClose}
                        onSave={props.onNewFilament}
                    />
                );

            case "updatePrinter":
                return (
                    <UpdatePrinter
                        style={
                            mountedSubMenu === "updatePrinter"
                                ? mountedStyle
                                : unMountedStyle
                        }
                        onAnimationEnd={handleOnAnimationEnd}
                        printerData={props.printers[editPrinterID]}
                        onClose={handleSubMenuClose}
                        onSave={(updatedData) => {
                            props.onUpdatePrinter(editPrinterID, updatedData);
                        }}
                    />
                );
            case "updateFilament":
                return (
                    <UpdateFilament
                        style={
                            mountedSubMenu === "updateFilament"
                                ? mountedStyle
                                : unMountedStyle
                        }
                        onAnimationEnd={handleOnAnimationEnd}
                        filamentData={props.filaments[editFilamentID]}
                        onClose={handleSubMenuClose}
                        onSave={(updatedData) => {
                            props.onUpdateFilament(editFilamentID, updatedData);
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="settings-wrapper">
            <button
                aria-label="settings button"
                className={`settings-button`}
                onClick={() => {
                    setSettingsActive(!settingsActive);
                    setActiveMenu("general");
                }}>
                <div className={`hamburger ${settingsActive ? "active" : ""}`}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </button>

            <div
                className="settings-container"
                style={
                    settingsActive ? {} : { width: 0, padding: 0, margin: 0 }
                }>
                <GeneralSettings
                    printers={props.printers}
                    filaments={props.filaments}
                    generalSettings={props.generalSettings}
                    onAddFilament={() => {
                        setActiveMenu("newFilament");
                        setMountedSubMenu("newFilament");
                    }}
                    onAddPrinter={() => {
                        setActiveMenu("newPrinter");
                        setMountedSubMenu("newPrinter");
                    }}
                    onUpdatePrinter={(ID) => {
                        setMountedSubMenu("updatePrinter");
                        setActiveMenu("updatePrinter");
                        setEditPrinterID(ID);
                    }}
                    onUpdateFilament={(ID) => {
                        setMountedSubMenu("updateFilament");
                        setActiveMenu("updateFilament");
                        setEditFilamentID(ID);
                    }}
                    onDeletePrinter={props.onDeletePrinter}
                    onDeleteFilament={props.onDeleteFilament}
                    onChangeGeneralSettings={props.onChangeGeneralSettings}
                />

                {renderActiveMenu()}
            </div>
        </div>
    );
}
