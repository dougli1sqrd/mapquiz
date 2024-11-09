import africa from "../../Africa_Countries.json"
import { useRef, useState, useEffect } from 'react';
import { useFocus } from './GuessInput';
import { Map } from './Map';
import { StudyControl } from "./StudyControl";
import { QuizStatus } from "./QuizStatus";


function guessMatchName(guess, name) {
    const normalized = name.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    const g = guess.normalize("NFD").replace(/\p{Diacritic}/gu, '').toLowerCase();
    return name !== "" && g === normalized;
}

function splitFeatures(countries) {
    return countries.features.map((x) => {
        const feat = {
            "type": "Feature",
            "name": `Africa_Countries:${x.properties.NAME}`,
            "crs": countries.crs,
            "properties": x.properties,
            "geometry": x.geometry
        };
        return feat
    })
}

function countryList(countries) {
    return countries.features.map((feat) => {
        return feat.properties.NAME
    });
}

function countryBounds(countryFeature) {
    const flatCoords = countryFeature.geometry.coordinates.flat().reduce((accum, current) => {
        if (current.length == 2) {
            return [current, ...accum];
        } else {
            return [...current, ...accum];
        }
    }, []);

    const latLons = flatCoords.map((p) => {
        return L.latLng(p);
    });

    const bounds = L.latLngBounds(latLons);
    return bounds;
}

function leftoverCountries(correct, allCountries) {
    return allCountries.filter((c) => {
        // countries that aren't in the "correct" set
        return !correct.includes(c);
    })
}


export const QuizMap = ({endGame, started=false, autoPlay=false, initialStudyTime=30, studyTime=15, numberStudies=3, children}) => {
    const [selected, setSelected] = useState("");
    const [guess, setGuess] = useState("");
    const [correct, setCorrect] = useState([]);
    const [revealed, setRevealed] = useState(false);
    const [duration, setDuration] = useState(0);

    const [inputRef, setInputFocus] = useFocus()

    const mapRef = useRef(null);

    const seperateCountries = splitFeatures(africa);
    const countryNames = countryList(africa);

    if (guessMatchName(guess, selected)) {
        setCorrect([...correct, selected]);
        if (correct.length < countryNames.length) {
            const toPickFrom = leftoverCountries(correct, countryNames).filter((c) => { return c !== selected });
            if (toPickFrom.length > 0) {
                const next = toPickFrom[Math.floor(toPickFrom.length * Math.random())];
                setSelected(next);
            }
        }
        
        setGuess("");
    }

    useEffect(() => {
        if (correct.length == countryNames.length) {
            endGame(
                {
                    hello: "world",
                    named: correct.length,
                    total: countryNames.length,
                    duration: duration,
                }
            );
        }
    }, [correct])

    useEffect(() => {
        if (autoPlay && selected !== "") {
            const intId = setTimeout(() => {
                setGuess(selected)
            }, 300);
            return () => { clearTimeout(intId) }
        }
    }, [selected, autoPlay]);
    
    useEffect(() => {
        if (started) {
            const intId = setInterval(() => {
                setDuration(duration + 1000);
            }, 1000);
            return () => { clearTimeout(intId) }
        }
    }, [started, duration])

    return <>
        <div className="width-60p height-100v float-left" onKeyDown={(e) => {
            if (e.key === "Tab" && started) {
                e.preventDefault();
                const countryNames = countryList(africa);
                if (correct.length < countryNames.length) {
                    const toPickFrom = leftoverCountries(correct, countryNames);
                    const next = toPickFrom[Math.floor(toPickFrom.length * Math.random())];
                    setSelected(next);
                    setGuess("");
                    setInputFocus();
                }
            }
        }} >
            {children}
            <Map
                mapRef={mapRef}
                countryFeatures={seperateCountries}
                selected={selected}
                setSelected={setSelected}
                setGuess={setGuess}
                setInputFocus={setInputFocus}
                correct={correct}
                revealed={revealed} />

            <input type="button" value="recenter" onClick={() => {
                mapRef.current && mapRef.current.setView([0, 20], 3.5, { animate: true, duration: 0.5});
            }} />

            <input type="text" ref={inputRef} disabled={revealed || !started} value={guess} onChange={(k) => {
                setGuess(k.target.value);
            }} />
            
            <div>
            { started && <StudyControl setReveal={setRevealed} startingTimeLimit={initialStudyTime} timeLimit={studyTime} startingStudies={numberStudies} started /> }
            </div>
            
            <input type="button" value="Give up :(" onClick={() => {
                endGame(
                    {
                        hello: "world",
                        named: correct.length,
                        total: countryNames.length,
                        duration: duration,
                        lost: true
                    }
                );
            }} />
            
        </div>
        <QuizStatus allCountries={countryList(africa)} correct={correct} duration={duration} className="float-left" />
    </>
}
