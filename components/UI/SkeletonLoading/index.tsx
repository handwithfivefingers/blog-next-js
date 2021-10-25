import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import UserContext from '../../../helper/Context';

const SkeletonLoading = () => {
  const { rowLayout } = useContext<any>(UserContext);
  if (rowLayout)
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4">
        <Skeleton style={{ paddingBottom: '75%' }} duration={2} />
        <Skeleton duration={2} />
        <Skeleton count={4} duration={2} />
      </div>
    );
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-3" style={{ paddingRight: 0 }}>
          <Skeleton style={{ paddingBottom: '150px' }} />
        </div>
        <div className="col-9">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Skeleton count={2} />
            <Skeleton count={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
