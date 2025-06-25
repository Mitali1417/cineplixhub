/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export const CustomCursor = ({ 
  size = 40,
  borderWidth = 2,
  hoverScale = 1.5,
  normalColor = '#374151',
  hoverColor = '#ffffff',
  hoverTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'DIV', 'BUTTON', 'LABEL', 'IMAGE'],
  transitionDuration = 200,
  enableCustomScales = true,
  targetSection = null
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentScale, setCurrentScale] = useState(1);
  const [isInSection, setIsInSection] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (targetSection) {
        const sectionElement = document.querySelector(targetSection);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const inSection = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          );
          setIsInSection(inSection);
          
          if (inSection) {
            document.body.style.cursor = 'none';
          } else {
            document.body.style.cursor = 'auto';
            setIsHovering(false);
          }
        }
      } else {
        setIsInSection(true);
        document.body.style.cursor = 'none';
      }
    };

    const handleMouseOver = (e) => {
      const shouldTrigger = !targetSection || isInSection;
      
      if (shouldTrigger && (hoverTags.includes(e.target.tagName) || e.target.innerText?.trim() !== '')) {
        setIsHovering(true);
        
        if (enableCustomScales && e.target.dataset.cursorScale) {
          const customScale = parseFloat(e.target.dataset.cursorScale);
          setCurrentScale(customScale);
        } else {
          setCurrentScale(hoverScale);
        }
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCurrentScale(1);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = 'auto';
    };
  }, [hoverTags, hoverScale, enableCustomScales, targetSection, isInSection]);

  if (targetSection && !isInSection) {
    return null;
  }

  return (
    <div
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] transition-all ease-out"
      style={{
        transform: `translate(${position.x - size/2}px, ${position.y - size/2}px) scale(${isHovering ? currentScale : 1})`,
        mixBlendMode: isHovering ? 'difference' : 'normal',
        transitionDuration: `${transitionDuration}ms`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `${borderWidth}px solid ${isHovering ? hoverColor : normalColor}`,
        backgroundColor: isHovering ? hoverColor : 'transparent',
      }}
    />
  );
};
