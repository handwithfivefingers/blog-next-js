import React, { useState, useContext } from 'react';
import { FaTh, FaThList } from 'react-icons/fa';
import UserContext from '../../../helper/Context';
import styles from './style.module.scss';

const PageHeader = (props) => {
  const { rowLayout, SetRow } = useContext<any>(UserContext);
  return (
    <div className={`row ${styles.pageHeader}`}>
      <div className="col-6">
        <h2
          style={{ fontSize: '22px', fontWeight: 400 }}
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
