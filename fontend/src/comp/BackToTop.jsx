import React, { useEffect, useRef, useState } from 'react';

const BackToTop = () => {
  const circleRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const radius = 49;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const offset = circumference - scrollPercent * circumference;

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = offset;
      }

      setIsAtTop(scrollTop === 0);
      setShowButton(scrollTop > 150);
    };

    const handleScroll = () => requestAnimationFrame(updateProgress);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [circumference]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      href="#Top"
      onClick={scrollToTop}
      className="back-to-top"
      style={{ display: showButton ? 'flex' : 'none' }}
    >
      <i className="ri-arrow-up-line"></i>
      <div className={`back-to-top-wrap ${!isAtTop ? 'active-progress' : ''}`}>
        <svg viewBox="-1 -1 102 102">
          <path
            ref={circleRef}
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
              transition: 'stroke-dashoffset 0.25s ease-out',
            }}
          />
        </svg>
      </div>
    </a>
  );
};

export default BackToTop;
