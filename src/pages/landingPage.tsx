import React, { useRef, useEffect } from 'react';
import '../styles/landingPage.css';
import { useNavigate } from 'react-router-dom';


const pages = [
  {
    bg: '/assets/1.png',
    overlay: true,
    content: (
      <div className="trygve-center">
        <div className="trygve-logo">trygve</div>
        <div className="trygve-tagline">Trusted Guardian of Life</div>
      </div>
    ),
    showDots: false,
    showActions: false,
  },
  {
    bg: '/assets/2.png',
    overlay: true,
    content: (
      <>
        <div className="onboard-title">"Your Health, Our Priority"</div>
        <div className="onboard-subtitle">
          Trusted doctors and care at your doorstep.
        </div>
      </>
    ),
    showDots: true,
    showActions: true,
  },
  {
    bg: '/assets/3.png',
    overlay: true,
    content: (
      <>
        <div className="onboard-title">"Seamless Care Delivered"</div>
        <div className="onboard-subtitle">
          Consult, treat, and heal—hassle-free.
        </div>
      </>
    ),
    showDots: true,
    showActions: true,
  },
  {
    bg: '/assets/4.png',
    overlay: true,
    content: (
      <>
        <div className="onboard-title">"Affordable Healthcare for Everyone"</div>
        <div className="onboard-subtitle">
          Quality care for every budget.
        </div>
      </>
    ),
    showDots: true,
    showActions: false,
    showGetStarted: true,
  },
];


function LandingPage() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(0);
  const [, setDummy] = React.useState({});

  // Auto-advance from first page after 3 seconds
  useEffect(() => {
    if (currentPage.current === 0) {
      const timer = setTimeout(() => {
        goToPage(1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line
  }, [currentPage.current]);

  function goToPage(idx: number) {
    currentPage.current = idx;
    setDummy({});
    if (pageRef.current) {
      pageRef.current.classList.remove('fade-in');
      void pageRef.current.offsetWidth;
      pageRef.current.classList.add('fade-in');
    }
  }

  function handleNext() {
    if (currentPage.current < pages.length - 1) {
      goToPage(currentPage.current + 1);
    }
  }

  function handleBack() {
    if (currentPage.current > 1) {
      goToPage(currentPage.current - 1);
    }
  }

  function handleSkip() {
    goToPage(pages.length - 1);
  }

  
    function handleGetStarted() {
  navigate('/welcome');
}
  

  const page = pages[currentPage.current];

  return (
    <div
      className="onboard-bg"
      style={{ backgroundImage: `url('${page.bg}')` }}
    >
      <div className="onboard-overlay">
        <div className="onboard-content fade-in" ref={pageRef}>
          {page.content}
            
            {page.showDots && (
            <div className="onboard-dots">
                {pages.slice(1).map((_, i) => (
                <span
                    key={i}
                    className={`dot${currentPage.current - 1 === i ? ' active' : ''}`}
                    onClick={() => goToPage(i + 1)}
                    style={{ cursor: 'pointer' }}
                ></span>
                ))}
            </div>
            )}

         
          
            {page.showActions && (
            <>
                <button
                className="onboard-skip fixed-bottom"
                onClick={handleSkip}
                >
                Skip
                </button>
                <button
                className="onboard-next fixed-bottom"
                onClick={handleNext}
                >
                Next <span className="arrow">→</span>
                </button>
            </>
            )}

          {page.showGetStarted && (
            <div className="onboard-actions">
              <div></div>
              <button className="onboard-getstarted" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;