import { useEffect, useState } from 'react';
import './styles.css';

const AnimatedText = ({ hideContainer }: {hideContainer: boolean}) => {
  const [visibleLetters, setVisibleLetters] = useState<number[]>([]);
  
  const words = ['SIMPLE', 'MINDS'];
  const allLetters = words.flatMap((word, wi) => 
    word.split('').map((letter, li) => ({
      char: letter,
      position: wi === 0 ? li : words[0].length + li,
    }))
  );

  useEffect(() => {
    const timeouts = allLetters.map((_, i) => {
      return setTimeout(() => {
        setVisibleLetters(prev => [...prev, i]);
      }, 500 + i * 250);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  const getTransform = (position: number) => {
    const direction = position % 4;
    switch(direction) {
      case 0: return 'translateX(-100vw)';
      case 1: return 'translateY(-100vh)';
      case 2: return 'translateX(100vw)';
      case 3: return 'translateY(100vh)';
      default: return 'translateX(0)';
    }
  };

  return (
    <div className="container">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="word"  style={{ opacity: hideContainer ? 0 : 1}}>
          {word.split('').map((letter, letterIndex) => {
            const position = wordIndex === 0 
              ? letterIndex 
              : words[0].length + letterIndex;
            const isVisible = visibleLetters.includes(position);

            return (
              <span
                key={letterIndex}
                className="letter"
                style={{
                  transform: isVisible ? 'translate(0)' : getTransform(position),
                  opacity: isVisible ? 1 : 0,
                  transition: `all 5s ease ${position * 0.05}s`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;