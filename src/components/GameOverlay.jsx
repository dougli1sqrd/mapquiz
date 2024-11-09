import { GameOverPanel } from "./GameOverPanel";
import { BEFORE_START, GAME_FINISHED, PLAYING } from "./QuizGame";
import { StartPanel } from "./StartPanel";

export const GameOverlay = ({gameState=BEFORE_START, gameData=null, startGame, newGame, setInitialStudyTime, setNumberStudies, setStudyTime }) => {

    const vis = gameState === PLAYING ? "invisible" : "visible";
    const color = gameState === BEFORE_START ? "start-overlay-style" : "end-overlay-style";

    const panel = {
        [BEFORE_START]: <StartPanel startGame={startGame} setInitialStudyTime={setInitialStudyTime} setNumberStudies={setNumberStudies} setStudyTime={setStudyTime}/>,
        [GAME_FINISHED]: <GameOverPanel newGame={newGame} gameData={gameData}/>,
    }

    return <div className={`start-overlay-${vis} ${color}`}>
        { gameState !== PLAYING ? panel[gameState] : null }
    </div>
}
