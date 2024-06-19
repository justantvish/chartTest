import React from 'react';

import classes from './Main.module.scss';

type Props = {
  children?: React.ReactNode | Iterable<React.ReactNode>;
};

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main className={classes.main}>{children}</main>
  );
};

export default Main;