import React, { useState, useEffect } from 'react';
import CardPostStyle1 from '../CardPost/CardPostStyle1';
import VideoPost from '../VideoPost';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
/**
 * @function renderCarousel
 * @param {  id,title,image,categories,link,views} item
 * @param { number } column
 * @param { null } typpe
 * @returns { Carousel }
 */
const CarouselBanner = ({ item, column }) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [winWidth, setWidth] = useState(null);
  // const [winMatches, setWindowMatches] = useState(false);
  const [autoSlide, setAutoSlide] = useState(null);
  useEffect(() => {
    setWidth(window.innerWidth);
    return () => clearInterval(autoSlide);
  }, [winWidth]);

  // useEffect(() => {
  //   matchScreenSize();
  // }, []);
  useEffect(() => {
    autoRun();
    return () => clearInterval(autoSlide);
  }, []);

  const autoRun = () => {
    const auto = setInterval(() => {
      nextEvent();
    }, 5000);
    setAutoSlide(auto);
  };

  const renderListSlider = () => {
    let xhtml = [];
    for (let i = 0; i < item.length; i++) {
      let style = {
        '--offset': i - current,
        '--dir': column,
      } as React.CSSProperties;
      xhtml.push(
        <div className={styles.slide} style={style} key={i}>
          <div className={styles.slide_wrapper}>
            <Image
              src={item[i].image}
              width={1200}
              height={300}
              layout="responsive"
              unoptimized={true}
              alt="..."
            />
          </div>
          <div className={styles.content}>
            <h2>{item[i].title}</h2>
            <p>{item[i].content}</p>
            <Link href={item[i]?.link}>
              <a className={`btn ${styles.custombtn}`}>Xem Thêm</a>
            </Link>
          </div>
        </div>,
      );
    }

    return xhtml;
  };
  const prevEvent = (width = null) => {
    if (current > 0) {
      if (width && width < -200) {
        let numState = Math.round(width / 200); // làm tròn số slide khi swipe
        setCurrent((prevState) => {
          if (prevState + numState > 0) {
            // state mới > 0 trả về state mới
            return prevState + numState;
          } else {
            return prevState - 1;
          }
        });
      } else {
        setCurrent((prevState) => prevState - 1);
      }
    } else {
      return;
    }
  };
  const nextEvent = (width = null) => {
    const columnCondition = condition();
    if (current + columnCondition >= item.length + 1) {
      return;
    } else {
      if (width && width >= 200) {
        let numState = Math.round(width / 200); // làm tròn số slide khi swipe
        setCurrent((prevState) => {
          if (prevState + numState < item.length - columnCondition) {
            return prevState + numState;
          } else {
            return item.length - columnCondition;
          }
        });
      } else {
        setCurrent((prevState) => {
          if (prevState >= item.length - columnCondition) {
            return 0;
          } else if (prevState + 1 === item.length - columnCondition) {
            return item.length - columnCondition;
          } else {
            return prevState + 1;
          }
        });
      }
    }
  };
  const condition = () => {
    return 1;
  };
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    let width = touchStart - touchEnd;
    if (touchStart - touchEnd > 75) {
      // do your stuff here for left swipe
      nextEvent(width);
    }

    if (touchStart - touchEnd < -75) {
      // do your stuff here for right swipe
      prevEvent(width);
    }
  };

  return (
    <div className={styles.row}>
      {/** Slide Render  */}
      <div className={styles.carousel}>
        <div
          className={styles.sliders}
          onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
          onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
          onTouchEnd={() => handleTouchEnd()}
          onMouseEnter={() => clearInterval(autoSlide)}
          onMouseLeave={() => autoRun()}
        >
          {renderListSlider()}
        </div>
      </div>

      {/** Arrow  */}
      <div className={styles.dot_slider}>
        {current <= 0 ? (
          ''
        ) : (
          <div className={`${styles.prev_btn}`} onClick={prevEvent}>{`<`}</div>
        )}
        {current >= item.length - condition() ? (
          ''
        ) : (
          <div className={styles.next_btn} onClick={nextEvent}>{`>`}</div>
        )}
      </div>
    </div>
  );
};

export default CarouselBanner;
