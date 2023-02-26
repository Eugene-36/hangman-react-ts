import { useState, useEffect, useCallback } from 'react';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';
import word from './wordList.json';

function getWord() {
  return word[Math.floor(Math.random() * word.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [gussedLetters, setGuessedWord] = useState<string[]>([]);

  const inCorrectLetters = gussedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every((letter) => gussedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (gussedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedWord((currentLetter) => [...currentLetter, letter]);
    },
    [gussedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [gussedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== 'Enter') return;

      e.preventDefault();
      setWordToGuess(getWord());
      setGuessedWord([]);
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isLoser && 'Try again! - Refresh to try again'}
        {isWinner && 'Winner! - Refresh to try again'}
      </div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        gussedLetters={gussedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabledAll={isWinner || isLoser}
          activeLetter={gussedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetter={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
