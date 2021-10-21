import React, { useState, useEffect } from 'react';
import CardPostStyle1 from '../CardPost/CardPostStyle1';
import VideoPost from '../VideoPost';
import styles from './Carousel.module.scss';

/**
 * @function renderCarousel
 * @param {  id,title,image,categories,link,views} item
 * @param { number } column
 * @param { null } typpe
 * @returns { Carousel }
 */
const Carousel = ({ item, column, type = null }) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [winWidth, setWidth] = useState(null);
  // const [winMatches, setWindowMatches] = useState(false);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [winWidth]);

  // useEffect(() => {
  //   matchScreenSize();
  // }, []);
  const renderListSlider = () => {
    let xhtml = [];
    if (!type) {
      for (let i = 0; i < item.length; i++) {
        let style = {
          '--offset': i - current,
          '--dir': column,
        } as React.CSSProperties;
        xhtml.push(
          <div className={styles.slide} style={style} key={i}>
            <div className={styles.slide_wrapper}>
              <CardPostStyle1
                id={item[i].id}
                title={item[i].title}
                image={item[i].featuredImage?.node.sourceUrl}
                categories={item[i].categories}
                link={item[i].uri}
                views={item[i].views}
              />
            </div>
          </div>,
        );
      }
    } else if (type === 'link') {
      for (let i = 0; i < item.length; i++) {
        let style = {
          '--offset': i - current,
          '--dir': column,
        } as React.CSSProperties;
        xhtml.push(
          <div className={styles.slide} style={style} key={i}>
            <div className={styles.slide_wrapper}>
              {/* <CardPostStyle1 type="link" link={item[i]?.section2LinkItem} /> */}
              <VideoPost link={item[i]?.section2LinkItem} />
            </div>
          </div>,
        );
      }
    } else if (type === 'banner') {
      for (let i = 0; i < item.length; i++) {
        let style = {
          '--offset': i - current,
          '--dir': column,
        } as React.CSSProperties;
        xhtml.push(
          <div className={styles.slide} style={style} key={i}>
            <div className={styles.slide_wrapper}>
              <CardPostStyle1
                id={item[i].id}
                title={item[i].title}
                image={item[i].featuredImage?.node.sourceUrl}
                categories={item[i].categories}
                link={item[i].uri}
                views={item[i].views}
              />
            </div>
          </div>,
        );
      }
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
            return prevState;
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
    // Desktop low and high resolution
    if (column === 2 && winWidth > 990) {
      return 2;
    } else if (column === 3 && winWidth > 990) {
      return 3;
    } else if (column === 4 && winWidth > 990) {
      return 4;
    } else if (column === 5 && winWidth > 990) {
      return 5;
    }
    // Tablet high resolution
    else if (column > 2 && winWidth <= 990 && winWidth > 768) {
      return 2;
    } else if (column === 2 && winWidth <= 990 && winWidth > 768) {
      return 2;
    }
    // Tablet low resolution
    else if (column > 1 && winWidth <= 768 && winWidth > 550) {
      return 2;
    } else if (column === 1 && winWidth <= 768 && winWidth > 550) {
      return 1;
    }
    // Mobile
    else if (column >= 1 && winWidth <= 550) {
      return 1;
    }
  };
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    let width = touchStart - touchEnd;
    let touchmove = touchEnd;

    if (touchStart - touchEnd > 75) {
      // do your stuff here for left swipe
      // console.log(touchStart - touchEnd);
      nextEvent(width);
    }

    if (touchStart - touchEnd < -75) {
      // do your stuff here for right swipe
      // console.log(touchStart - touchEnd);

      prevEvent(width);
    }
  };

  // const matchScreenSize = () => {
  //   const handler = (e) => setWindowMatches(e.matches);
  //   window.matchMedia('(max-width: 1300px)').addListener(handler);
  // };
  // console.log(item);
  return (
    <div className={styles.row}>
      {/** Slide Render  */}
      <div className={styles.carousel}>
        <div
          className={styles.sliders}
          onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
          onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
          onTouchEnd={(e) => handleTouchEnd(e)}
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

export default Carousel;
