import React, { useState, useContext } from 'react';
import { FaTh, FaThList } from 'react-icons/fa';
import UserContext from '../../../helper/Context';

const PageHeader = (props) => {
  const { rowLayout, SetRow } = useContext<any>(UserContext);
  return (
    <div className="row">
      <div className="col-6">
        <h2
          style={{ fontSize: '22px', paddingBottom: '50px', fontWeight: 400 }}
        >
          {props.title}
        </h2>
      </div>
      <div className="col-6" style={{ textAlign: 'end' }}>
        {rowLayout ? (
          <FaTh onClick={() => SetRow()} style={{ cursor: 'pointer' }} />
        ) : (
          <FaThList onClick={() => SetRow()} style={{ cursor: 'pointer' }} />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
