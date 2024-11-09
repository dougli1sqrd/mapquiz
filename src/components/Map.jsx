import { MapContainer, GeoJSON, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import variables from "../App.scss";

const variablesS = {
    $background: "#344568",
    $unknown: "#77285b",
    "$unknown-border": "#7a91e9",
    $selected: "#8a1d00",
    "$selected-border": "#ff859a",
    $correct: "#009a70",
    "$correct-border": "#005500",
    "$text-color": "#fff5ed"
}


function foo() {
    const flatCoords = c.geometry.coordinates.flat().reduce((accum, current) => {
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
}

const mapFillUnknown = {
    "fill-opacity": 1,
    fill: variablesS.$unknown,
    "border-color": variablesS["$unknown-border"]
};

const mapFillSelected = {
    "fill-opacity": 1,
    fill: variablesS.$selected,
    "border-color": variablesS["$selected-border"]
};

const mapFillCorrect = {
    "fill-opacity": 1,
    fill: variablesS.$correct,
    "border-color": variablesS["$correct-border"]
}

export const Map = ({ countryFeatures, selected, setSelected, setGuess, setInputFocus, correct, revealed, mapRef = null }) => {
    
    const selectedFeature = countryFeatures.find((c) => {
        return c.properties.NAME === selected;
    });

    const countriesWithSelected = selectedFeature ? [...countryFeatures, {...selectedFeature, name: `${selectedFeature.name}:selected`}] : countryFeatures

    return <div>
        <MapContainer
            className="map-container"
            style={{ background: variablesS.$background }}
            center={[0, 20]}
            zoomDelta={0.1}
            zoom={3.5}
            zoomSnap={0.1}
            wheelPxPerZoomLevel={80}
            minZoom={3.5}
            zoomAnimation={false}
            maxBounds={[[50, -35], [-42, 75]]}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            ref={mapRef}
            children={countriesWithSelected.map((c) => {
                var countryClass = "map-fill-unknown"
                var color = variablesS.$unknown;
                var border = variablesS["$unknown-border"];
                var selectClass = "";
                if (correct.includes(c.properties.NAME)) {
                    countryClass = "map-fill-correct"
                    color = variablesS.$correct;
                    border = variablesS["$correct-border"];
                } else if (c.properties.NAME === selected) {
                    countryClass = "map-fill-selected"
                    color = variablesS.$selected;
                    border = variablesS["$selected-border"];
                }
            
                const studyClass = !correct.includes(c.properties.NAME) && revealed ? "studying" : "";
                return <GeoJSON style={{ fillColor: color, fillOpacity: 1, color: border, className: `${selectClass}` }}  key={c.name} data={c}  eventHandlers={{
                    click: () => {
                        if (selected === c.properties.NAME) {
                            setSelected("");
                        } else if (!correct.includes(c.properties.NAME)) {
                            setSelected(c.properties.NAME);
                        }
                        setGuess("");
                        setInputFocus();
                    },
                }} >
                    {correct.includes(c.properties.NAME) || revealed ? (<Tooltip className={`country-label ${studyClass}`} direction="center" offset={[0, 0]} opacity={1} permanent >
                        {c.properties.NAME}
                    </Tooltip>) : null}
                </GeoJSON>
            })}
        />
    </div>
}
