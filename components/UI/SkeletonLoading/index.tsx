import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import UserContext from '../../../helper/Context';

const SkeletonLoading = () => {
  const { rowLayout } = useContext<any>(UserContext);
  switch (rowLayout) {
    case true:
      return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
          <Skeleton style={{ paddingBottom: '75%' }} duration={2} />
          <Skeleton duration={2} />
          <Skeleton count={4} duration={2} />
        </div>
      );
    case false:
      return (
        <div className="col-md-12 mb-4">
          <div className="row">
            <div className="col-md-3">
              <Skeleton style={{ paddingBottom: '150px' }} />
            </div>
            <div className="col-md-9">
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
    default:
      return null;
  }
};

export default SkeletonLoading;
