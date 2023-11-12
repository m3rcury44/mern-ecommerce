import React, {FC, InputHTMLAttributes} from 'react';
import classes from "./MyInput.module.scss";

const MyInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({...props}) => {
    return (
        <input {...props} className={classes.myInput}>

        </input>
    );
};

export default MyInput;