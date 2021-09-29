import React from 'react';

const About: React.FC = () => {
  return (
    <>
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
