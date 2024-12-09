type SelectProps = {
    label: string;
    name?: string;
    id?: string;
    data: string[];
    onChange: (filament: number) => void;
};

export default function Select(props: SelectProps) {
    return (
        <div className="input-container">
            <label className="input-label" htmlFor={props.label}>
                {props.label}
            </label>
            <select
                id={props.label}
                className="input"
                onChange={(e) => {
                    props.onChange(parseInt(e.target.value));
                }}>
                {props.data.map((item, i) => {
                    return (
                        <option key={i} value={i}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
