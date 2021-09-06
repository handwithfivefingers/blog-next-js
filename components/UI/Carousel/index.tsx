import React, { useState, useEffect } from 'react';
import CardPost from './../CardPost';
import styles from './Carousel.module.scss';
const data = [
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://nextjs.truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
    views: 1,
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://nextjs.truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
    views: 1,
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://nextjs.truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
    views: 1,
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://nextjs.truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
    views: 1,
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://nextjs.truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
    views: 1,
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://nextjs.truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
    views: 1,
  },
];
const Carousel = ({ item, column }) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [winWidth, setWidth] = useState(null);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [winWidth]);
  const renderListSlider = () => {
    let xhtml = [];
    for (let i = 0; i < 6; i++) {
      let style = {
        '--offset': i - current,
        '--dir': column,
      } as React.CSSProperties;
      xhtml.push(
        <div className={styles.slide} style={style} key={i}>
          <div className={styles.slide_wrapper}>
            <CardPost
              id={data[i].id}
              title={data[i].title}
              image={data[i].mediaItemUrl}
              categories={data[i].name}
              link={data[i].link}
              views={data[i].views}
            />
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
    if (current + columnCondition >= data.length + 1) {
      return;
    } else {
      if (width && width >= 200) {
        let numState = Math.round(width / 200); // làm tròn số slide khi swipe
        setCurrent((prevState) => {
          if (prevState + numState < data.length - condition()) {
            return prevState + numState;
          } else {
            return data.length - condition();
          }
        });
      } else {
        setCurrent((prevState) => {
          if (prevState >= data.length - condition()) {
            return prevState;
          } else if (prevState + 1 === data.length - condition()) {
            return data.length - condition();
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
      {/* {current + '-' + condition() + '-' + data.length} */}
      <div className={styles.carousel}>
        <div
          className={styles.sliders}
          onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
          onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
          onTouchEnd={() => handleTouchEnd()}
        >
          {renderListSlider()}
        </div>
      </div>
      <div className={styles.dot_slider}>
        {current <= 0 ? (
          ''
        ) : (
          <div className={`${styles.prev_btn}`} onClick={prevEvent}>{`<`}</div>
        )}
        {current >= data.length - condition() ? (
          ''
        ) : (
          <div className={styles.next_btn} onClick={nextEvent}>{`>`}</div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
