import "./Product.css";
import edit from "/src/assets/edit.svg";
import trash from "/src/assets/trash.svg";
import close from "/src/assets/close-outline.svg";
import checkmark from "/src/assets/checkmark.svg";
import { useRef, useState } from "react";
import { useClickOutside } from "../lib/clickOutsideHook";

const mountedStyle = {
    animation: "inAnimation 250ms ease-in",
};
const unMountedStyle = {
    animation: "outAnimation 250ms ease-out",
    animationFillMode: "forwards",
};

type ProductProps = {
    productName: string;
    onEdit: () => void;
    onDelete?: () => void;
};

export const Product = (props: ProductProps) => {
    const [clickOnDelete, setClickOnDelete] = useState(false);
    const [confirmationMounted, setConfirmationMounted] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => {
        setConfirmationMounted(false);
    });

    return (
        <div ref={ref} className="product">
            <p>{props.productName}</p>
            <div className="product-controls">
                <button className="product-button" onClick={props.onEdit}>
                    <img src={edit} alt={`${props.productName} edit button`} />
                </button>
                <button
                    className="product-button"
                    onClick={() => {
                        setConfirmationMounted(true);
                        if (!clickOnDelete) setClickOnDelete(true);
                    }}>
                    <img
                        src={trash}
                        alt={`${props.productName} delete button`}
                    />
                </button>
            </div>
            {clickOnDelete && (
                <div
                    className="delete_confirmation"
                    style={confirmationMounted ? mountedStyle : unMountedStyle}
                    onAnimationEnd={() => {
                        if (!confirmationMounted) setClickOnDelete(false);
                    }}>
                    <button className="product-button" onClick={props.onDelete}>
                        <img
                            src={checkmark}
                            alt="confirm deletion"
                            className="delete-check"
                        />
                    </button>
                    <button
                        className="product-button"
                        onClick={() => setConfirmationMounted(false)}>
                        <img
                            src={close}
                            alt="cancel deletion"
                            className="delete-close"
                        />
                    </button>
                </div>
            )}
        </div>
    );
};
