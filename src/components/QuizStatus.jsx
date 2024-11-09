
export const QuizStatus = ({ correct, allCountries, duration=0, className }) => {
    return <div className={`info-panel ${className}`}>
        Named <span className="fake-digital">{correct.length}</span>/{allCountries.length} Countries!
        <p>Elapsed Time: <span className="fake-digital">{duration/1000}</span> seconds</p>
    </div>
}
