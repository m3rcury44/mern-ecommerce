import React, {FC, HTMLProps} from 'react';
import classes from './EmptyComponent.module.scss'

interface IEmptyComponentProps extends HTMLProps<HTMLDivElement> {
    text: string;
}

const EmptyComponent: FC<IEmptyComponentProps> = ({text, ...props}) => {
    return (
        <div {...props} className={classes.empty}>
            Your {text} is empty :(
        </div>
    );
};

export default EmptyComponent;