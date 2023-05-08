import React, { FC } from 'react';
import './Logo.css';

const Logo: FC<LogoProps> = (_props) => {
  return (
    <img alt="HULT/EF Logo" className="logo" src="/hultef-logo-black.svg" />
  );
};

export interface LogoProps {}

export default Logo;
