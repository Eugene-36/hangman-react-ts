import React from 'react';
import PropTypes from 'prop-types';
interface HangManWordProps {
  gussedLetters: string[];
  wordToGuess: string;
}

const HangmanWord = ({ gussedLetters, wordToGuess }: HangManWordProps) => {
  console.log('wordToGuess', wordToGuess);

  return (
    <div
      style={{
        display: 'flex',
        gap: '.25em',
        fontSize: '6rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
      }}
    >
      {wordToGuess.split('').map((letter, index) => (
        <span style={{ borderBottom: '.1em solid black' }} key={index}>
          <span
            style={{
              visibility: gussedLetters.includes(letter) ? 'visible' : 'hidden',
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
