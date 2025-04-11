import './styles.css';

const StaticText = ({ showContainer }: {showContainer: boolean}) => {
  const words = ['SIMPLE', 'MINDS'];
  return (
    <div className="container-static">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="word-static" style={{ opacity: showContainer ? 1 : 0}}>
          {word.split('').map((letter, letterIndex) => {

            return (
              <span
                key={letterIndex} 
                className="letter-static"
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

export default StaticText;