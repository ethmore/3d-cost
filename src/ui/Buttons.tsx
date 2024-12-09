import "./Buttons.css";

type AddButtonProps = {
    onClick: () => void;
};
export function AddButton(props: AddButtonProps) {
    return (
        <div className="add-button" onClick={props.onClick}>
            <div></div>
            <div></div>
        </div>
    );
}

type SaveButtonProps = JSX.IntrinsicElements["button"] & {
    innerText?: string;
};
export const SaveButton = ({
    innerText = "Save",
    ...props
}: SaveButtonProps) => {
    return (
        <button className="save-button" {...props}>
            {innerText}
        </button>
    );
};
