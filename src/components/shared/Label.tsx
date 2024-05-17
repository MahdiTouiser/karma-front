interface KLabelProps {
    htmlFor?: string;
    className?: string,
    children?: React.ReactNode;

}
const KLabel: React.FC<KLabelProps> = (props) => {
    return (
        <label htmlFor={props.htmlFor} className={`${props.className || ''} text-sm font-medium  dark:text-gray-300 text-slate-500 block mb-2`}>
            {props.children}
        </label>
    )
}

export default KLabel