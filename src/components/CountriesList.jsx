
export const CorrectList = ({countries}) => {
    return <div>{countries.join(", ")}</div>
}

export const AllCountries = ({countries, correct, correctColor="green", defaultColor="black"}) => {
    return (
        countries.map((c) => {
            const color = correct.includes(c) ? correctColor : defaultColor;
            return <CountryElement countryName={c} key={c} style={{color: color}} />
        })
    )
}

export const CountryElement = ({ countryName, style={} }, key) => {
    return <div key={key} style={style} >{countryName}</div>
}
