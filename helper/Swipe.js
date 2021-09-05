import { useState } from 'react';

function SwipeEffect() {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      // do your stuff here for left swipe
      moveSliderRight();
    }

    if (touchStart - touchEnd < -150) {
      // do your stuff here for right swipe
      moveSliderLeft();
    }
  }
  return (touchStart - touchEnd);
}

// export default Swipe;
