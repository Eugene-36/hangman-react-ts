import React from 'react';
import PropTypes from 'prop-types';
interface HangManWordProps {
  gussedLetters: string[];
  wordToGuess: string;
  reveal?: Boolean;
}

const HangmanWord = ({
  gussedLetters,
  wordToGuess,
  reveal = false,
}: HangManWordProps) => {
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
              visibility:
                gussedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
              color:
                !gussedLetters.includes(letter) && reveal ? 'red' : 'black',
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
