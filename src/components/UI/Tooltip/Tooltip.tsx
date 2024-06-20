import React from 'react';

import classes from './Tooltip.module.scss';

type Props = {
    children?: React.ReactNode | Iterable<React.ReactNode>;
    title?: string;
    imgUrl?: string;
};

const Tooltip:React.FC<Props> = ({children, title, imgUrl}) => {
    return (
        <div className={classes.tooltip}>
            <div className={classes.header}>
                {imgUrl && <img className={classes.img} src={imgUrl} alt={title} />}
                <div className={classes.title}>{title}</div>
            </div>
            <div className={classes.main}>
                {children}
            </div>
        </div>
    );
};

export default Tooltip;