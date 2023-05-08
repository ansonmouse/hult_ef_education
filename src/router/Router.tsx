import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllPrograms from '../pages/AllPrograms/AllPrograms';

const Router: FC<RouterProps> = (_props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPrograms />} />
      </Routes>
    </BrowserRouter>
  );
};

export interface RouterProps {}

export default Router;
