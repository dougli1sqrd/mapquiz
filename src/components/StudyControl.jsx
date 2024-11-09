import { useEffect, useRef, useState } from "react"

export const StudyControl = ({ setReveal, startingTimeLimit = 0, timeLimit = 20000, startingStudies = 3, started=false }) => {

    const timerRef = useRef(null);

    const [availableStudies, setAvailableStudies] = useState(startingStudies)

    useEffect(() => {
        clearTimeout(timerRef.current);
    }, []); 

    useEffect(() => {
        if (startingTimeLimit) {
            setReveal(true);
            const tId = setTimeout(() => {
                setReveal(false);
            }, startingTimeLimit);
            return () => clearTimeout(tId);
        }
    }, []); 

    return <div><input type="button" value="Study" disabled={availableStudies == 0 || !started} onClick={() => {
        setReveal(true)
        setAvailableStudies(availableStudies - 1);
        timerRef.current = setTimeout(() => {
            setReveal(false);
        }, timeLimit);
    }} />
        {"   🌍".repeat(availableStudies)}
    </div>
}
