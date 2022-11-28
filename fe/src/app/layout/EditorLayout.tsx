import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

type Props = {
};

const EditorLayout: React.FC<Props> = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
};

export default React.memo(EditorLayout);
