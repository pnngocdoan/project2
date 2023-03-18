import React, {Component, useEffect, useState} from 'react';

const GuessBox = () => {
    const [guess, setGuess] = useState('');
    const handleChange = (event) => {
        const newGuess = event.target.value;
        setGuess(newGuess);
    }
    const [isCorrect, setIsCorrect] = useState(false);
    const handleSubmit = () => {};
    return (
        <div className="guess-container">
            <form className="guess-box" onSubmit={handleSubmit}>
                <label>Is it true or false? </label>
                <input type="text" value={guess} onChange={handleChange} />
                <input type="submit" value="Submit" className="submit-btn" />
            </form>
        </div>
    );
};

export default GuessBox;
