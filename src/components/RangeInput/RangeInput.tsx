import classes from './RangeInput.module.scss';
type Props = {
    minValue: number;
    maxValue: number;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    step: number;
    label: string;
}

const RangeInput = ({minValue, maxValue, value, onChange, name, step, label}: Props) => {
    return (
        <div className={classes.holder}>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <input
                className={classes.range}
                id={name}
                type="range"
                name={name}
                min={minValue}
                max={maxValue}
                value={value}
                step={step}
                onChange={onChange}
            />
        </div>
    )
}

export default RangeInput;