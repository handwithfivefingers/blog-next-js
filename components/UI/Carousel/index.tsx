import React, { useState } from 'react';
import CardPost from './../CardPost';
import styles from './Carousel.module.scss';
const data = [
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
  },
  {
    name: 'Tricks CSS',
    mediaItemUrl:
      'https://truyenmai.com/wp-content/uploads/2019/10/css-tricks-e1394062740966.png',
    id: 'cG9zdDoyNTc0',
    link: 'https://truyenmai.com/tricks-css/transform-thu-thuat-css-4/',
    title: 'Transform – Thủ Thuật CSS – 4',
    uri: '/tricks-css/transform-thu-thuat-css-4/',
  },
];
const Carousel = ({ item, column }) => {
  const [current, setCurrent] = useState(0);
  const renderListSlider = () => {
    let xhtml = [];
    for (let i = 0; i < 6; i++) {
      let style = {
        '--offset': i - current,
        '--dir': column,
      } as React.CSSProperties;
      xhtml.push(
        <div className={styles.slide} style={style}>
          <div className={styles.slide_wrapper}>
            <CardPost
              id={data[i].id}
              title={data[i].title}
              image={data[i].mediaItemUrl}
              categories={data[i].name}
              link={data[i].link}
            />
          </div>
        </div>,
      );
    }
    return xhtml;
  };
  const prevEvent = () => {
    if (current > 0) {
      setCurrent((prevState) => prevState - 1);
    } else {
      return;
    }
  };
  const nextEvent = () => {
    const columnCondition = condition();
    if (current + columnCondition >= 5) {
      return;
    } else {
      setCurrent((prevState) => prevState + 1);
    }
  };
  const condition = () => {
    switch (column) {
      case 2: {
        return 1;
      }
      case 3: {
        return 2;
      }
      case 4: {
        return 3;
      }
      case 5: {
        return 4;
      }
      default:
        return 2;
    }
  };
  return (
    <div className={styles.row}>
      <div className={styles.carousel}>
        <div className={styles.sliders}>{renderListSlider()}</div>
        <div className={styles.dot_slider}>
          {current <= 0 ? (
            ''
          ) : (
            <div
              className={`${styles.prev_btn}`}
              onClick={prevEvent}
            >{`<`}</div>
          )}
          {current + condition() >= 5 ? (
            ''
          ) : (
            <div className={styles.next_btn} onClick={nextEvent}>{`>`}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
