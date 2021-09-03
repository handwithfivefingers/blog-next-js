import React from 'react';

const About: React.FC = () => {
  const renderListSlider = () => {
    let xhtml = [];
    for (var i = 1; i < 4; i++) {
      let style = {
        '--offset': i,
        width: '100%',
        height: '400px',
      } as React.CSSProperties;
      xhtml.push(<div className="slide" style={style} />);
    }
    return xhtml;
  };
  const renderDotSlider = () => {
    let xhtml = [];
    for (var i = 1; i < 4; i++) {
      let style = { '--offset': i } as React.CSSProperties;
      xhtml.push(<div className="dot-slide" style={style} />);
    }
    return xhtml;
  };
  return (
    <>
      <div className="carousel">
        <div className="sliders">{renderListSlider()}</div>
        <div className="dot-slider">{renderDotSlider()}</div>
      </div>
      <div className="row" style={{ margin: 0 }}>
        <div className="about-page" style={{ minHeight: '100vh' }}>
          <h2>Technologies:</h2>
          <ul>
            <li>Reactjs</li>
            <li>NextJs</li>
            <li>Graphql</li>
            <li>Apolo Client</li>
            <li>Skeleton Loading</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
