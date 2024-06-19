import React from 'react';
import classes from "./Wrapper.module.scss";

type Props = {
  children?: React.ReactNode | Iterable<React.ReactNode>;
};

const Wrapper: React.FC<Props> = ({ children }) => {

  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  );
};

export default Wrapper;