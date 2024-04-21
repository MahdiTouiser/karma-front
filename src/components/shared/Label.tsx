interface SDLabelProps {
    htmlFor?: string;
    className?: string,
    children?: React.ReactNode;
    
}
const SDLabel : React.FC<SDLabelProps> = (props)=>{
    return (
        <label htmlFor={props.htmlFor} className={`${props.className || ''} text-sm font-medium  dark:text-gray-300 text-slate-500 block mb-2`}>
            {props.children}
        </label>
    )
}

export default SDLabel