import React from 'react';

import classes from './Header.module.scss';

type Props = {
  children?: React.ReactNode | Iterable<React.ReactNode>;
  title: string;
};

const Header: React.FC<Props> = ({ children, title }) => {

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <div className="tools">{children}</div>
    </header>
  );
};

export default Header;