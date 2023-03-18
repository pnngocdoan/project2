import React from 'react';
import { useState } from 'react';

const Card = (props) => {
    const [isFlipped, flipCard] = useState(false);
    const handleFlip = () => flipCard (!isFlipped);
    return (
        <div className={`card ${isFlipped ? "is-flipped" : ""}`} onClick={handleFlip}>
            <div className='front'>
                <h3>{props.question}</h3>
                <h4>{props.answer}</h4>
                <pre>
                    <code>{props.code}</code>
                </pre>
            </div>
            <div className='back'>
                <h3>{props.isTrue}</h3>
            </div>
        </div>
    )
}

export default Card;
