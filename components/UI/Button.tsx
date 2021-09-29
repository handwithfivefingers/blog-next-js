import React from 'react';

const Button = (props) => {
  const { children, ...rest } = props;
  return (
    <button className="btn" {...rest}>
      {children}
    </button>
  );
};

export default Button;
