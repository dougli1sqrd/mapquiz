import { CopyToClipboard } from 'react-copy-to-clipboard';

export const GameOverPanel = ({ newGame, gameData = null }) => {

    return <>
        <h1> {gameData && (gameData.lost ? "Game Over Too Bad" : "Winner Congratulations!")} </h1>
        <input type="button" value="Restart!" onClick={() => {
            newGame();
        }} />
        {gameData &&
            <>
                <p>Elapsed Time: {gameData["duration"] / 1000} seconds!</p>
                <p>Named {gameData["named"]} of {gameData["total"]} Countries!</p>
                <CopyToClipboard text={
                    `Named ${gameData["named"]}/${gameData["total"]} African Countries in ${gameData["duration"] / 1000}s!\n
${"🌍".repeat(5 * gameData["named"] / gameData["total"])}\n
${window.location.href}`
                }>
                    <input type="button" value="share" />
                </CopyToClipboard>
            </>}
    </>
}