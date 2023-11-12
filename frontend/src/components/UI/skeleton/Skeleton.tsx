import React, {FC, HTMLAttributes} from 'react';
import classes from './Skeleton.module.scss'

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => {
    return (
        <div {...props} className={classes.skeleton} title='Loading...'>

        </div>
    );
};

export default Skeleton;