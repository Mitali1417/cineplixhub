/* eslint-disable react/prop-types */


const CircularTextRing = ({ 
  text = "Your text here! • ",
  radius = 5,
  fontSize = 2,
  animationDuration = 20,
  className = '',
  repeat = 2 
}) => {
  const repeatedText = Array(repeat).fill(text).join('');
  const characters = repeatedText.split('');
  const totalCharacters = characters.length;

  return (
    <div className="flex items-center justify-center">
      <section 
        className={`circular-text-container ${className}`}
        style={{ '--animation-duration': `${animationDuration}s` }}
      >
        <span 
          className="text-ring" 
          style={{
            '--total': totalCharacters,
            '--radius': radius,
            '--font-size': fontSize
          }}
        >
          <span aria-hidden="true">
            {characters.map((char, index) => (
              <span 
                key={index}
                style={{ '--index': index }}
              >
                {char}
              </span>
            ))}
          </span>
        </span>
      </section>
    </div>
  );
};

export default CircularTextRing;