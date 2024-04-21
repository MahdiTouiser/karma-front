const NumberWithSeperator : React.FC<{value: number}> = ({value})=>{
    const formattedNumber = value.toLocaleString();
    return (
        <span className="ltr inline-block">{formattedNumber}</span>
    )
}

export default NumberWithSeperator;