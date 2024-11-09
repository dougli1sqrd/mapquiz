import { useRef } from "react";

export const GuessInput = ({guess, onChange}) => {

    return <input type="text" value={guess} onChange={onChange} ></input>
}

export const useFocus = () => {
    const ref = useRef(null)
    const setFocus = () => {ref.current && ref.current.focus({ preventScroll: true })}

    return [ ref, setFocus ] 
}
