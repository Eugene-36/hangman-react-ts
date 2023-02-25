import { useState, useEffect, useCallback } from 'react';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';
import word from './wordList.json';

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return word[Math.floor(Math.random() * word.length)];
  });
  const [gussedLetters, setGuessedWord] = useState<string[]>([]);

  const inCorrectLetters = gussedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (gussedLetters.includes(letter)) return;

      setGuessedWord((currentLetter) => [...currentLetter, letter]);
    },
    [gussedLetters]
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
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>Lose Win</div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord gussedLetters={gussedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
