import { useState } from 'react';

export const StartPanel = ({ startGame, setInitialStudyTime, setStudyTime, setNumberStudies }) => {

    const [visible, setVisible] = useState(true);


    return <div>
        <h1>Learn the Countries of Africa!</h1>

        <p>
            <label>Initial Study Time
                <select id="init-time" defaultValue={30000} onChange={(ev) => { setInitialStudyTime(ev.target.value) }}>
                    <option value={0}>None</option>
                    <option value={15000}>15 seconds</option>
                    <option value={30000}>30 seconds</option>
                    <option value={60000}>60 seconds</option>
                </select>
            </label>
        </p>

        <p>
            <label>Number of Studies
                <select id="studies" defaultValue={3} onChange={(ev) => { setNumberStudies(ev.target.value) }}>
                    <option value={0}>None</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </label>
        </p>

        <p>
            <label>Study Time
                <select id="study-time" defaultValue={15000} onChange={(ev) => { setStudyTime(ev.target.value) }}>
                    <option value={5000}>5 seconds</option>
                    <option value={10000}>10 seconds</option>
                    <option value={15000}>15 seconds</option>
                    <option value={30000}>30 seconds</option>
                    <option value={60000}>60 seconds</option>
                </select>
            </label>
        </p>


        <input type="button" value="Start!" onClick={() => {
            setVisible(!visible);
            startGame();
        }} />
    </div>
}
