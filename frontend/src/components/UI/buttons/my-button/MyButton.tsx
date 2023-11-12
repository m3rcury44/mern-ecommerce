import React, {ButtonHTMLAttributes, FC} from 'react';
import classes from "./MyButton.module.scss";

const MyButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({...props}) => {
    return (
        <button {...props} className={classes.myBtn}>

        </button>
    );
};

export default MyButton;