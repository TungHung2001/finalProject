import React from 'react';
import {Loader} from 'semantic-ui-react';

function HomeLoading() {
  return (
    <>
      <div className="w1160">
        <Loader active inline="centered"/>
      </div>
    </>
  );
}

export default HomeLoading;
