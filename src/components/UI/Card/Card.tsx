import React from 'react';

import classes from './Card.module.scss';

type Props = {
    children?: React.ReactNode | Iterable<React.ReactNode>;
};

const Card: React.FC<Props> = ({ children }) => {
    return (
        <div className={classes.card}>{children}</div>
    );
};

export default Card;