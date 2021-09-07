import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
export default function TransitionLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeOut');
  useEffect(() => {
    setTransitionStage('fadeIn');
  }, []);
  useEffect(() => {
    if (children !== displayChildren) setTransitionStage('fadeOut');
  }, [children, setDisplayChildren, displayChildren]);
  return (
    <div
      onTransitionEnd={() => {
        if (transitionStage === 'fadeOut') {
          console.log('fading out');
          setDisplayChildren(children);
          setTransitionStage('fadeIn');
        }
      }}
      className={`${styles.content} ${styles[transitionStage]}`}
    >
      {displayChildren}
    </div>
  );
}
