import React, { FC } from 'react';
import './Header.css';

const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p className="description">{description}</p>
    </header>
  );
};

export interface HeaderProps {
  readonly title: string;
  readonly description: string;
}

export default Header;
