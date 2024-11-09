import { useState } from "react";
import { QuizMap } from "./QuizMap";
import { GameOverlay } from "./GameOverlay";

export const BEFORE_START = "BeforeStart";
export const PLAYING = "Playing";
export const GAME_FINISHED = "GameFinished";

export const QuizGame = ({ }) => {

    const [gameState, setGameState] = useState(BEFORE_START);
    const [geo, setGen] = useState(0);
    const [initStudyTime, setInitStudyTime] = useState(30000);
    const [numberStudies, setNumberStudies] = useState(3);
    const [studyTime, setStudyTime] = useState(15000);
    const [gameData, setGameData] = useState({});

    const startGame = () => {
        setGameState(PLAYING);
    }

    const newGame = () => {
        setGameState(BEFORE_START);
        setGen(geo + 1);
    }

    const endGame = (data) => {
        setGameData(data)
        setGameState(GAME_FINISHED);
    }

    return <QuizMap key={geo} started={gameState === PLAYING} endGame={endGame} autoPlay={true} initialStudyTime={initStudyTime} numberStudies={numberStudies} studyTime={studyTime}>
        <GameOverlay startGame={startGame} newGame={newGame} gameState={gameState} setInitialStudyTime={setInitStudyTime} setNumberStudies={setNumberStudies} setStudyTime={setStudyTime} gameData={gameData}/>
    </QuizMap>;
};
