type CalculationResultProps = JSX.IntrinsicElements["div"] & {
    label: string;
    value: number;
};

export default function CalculationResult({
    label,
    value,
    ...props
}: CalculationResultProps) {
    return (
        <div {...props}>
            <p className="cost-label">{label}</p>
            <p className="cost-value">
                ${(Math.round(value * 100) / 100).toFixed(2)}
            </p>
        </div>
    );
}
