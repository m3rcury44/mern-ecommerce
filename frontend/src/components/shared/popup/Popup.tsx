import React, {FC, MouseEventHandler, useRef, useState} from 'react';
import classes from './Popup.module.scss'
import {useOutsideClick} from "../../../hooks/useOutsideClick";

export interface IPopup {
    firstBtn: {
        onClick: MouseEventHandler<HTMLLIElement>;
        text: string;
    };
    secondBtn: {
        onClick: MouseEventHandler<HTMLLIElement>;
        text: string;
    };
}

const Popup: FC<{ popupData: IPopup }> = ({popupData}) => {

    const {firstBtn, secondBtn} = popupData

    const [isOpen, setIsOpen] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)

    useOutsideClick(popupRef, setIsOpen, isOpen)

    return (
        <div ref={popupRef}
             style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', userSelect: 'none'}}>
            <div onClick={() => setIsOpen(!isOpen)}
                 className={!isOpen ? classes.popupMenu : `${classes.popupMenu} ${classes.open}`}>
                <span className={classes.popupBar}></span>
                <span className={classes.popupBar}></span>
                <span className={classes.popupBar}></span>
            </div>
            <ul className={!isOpen ? classes.menu : `${classes.menu} ${classes.active}`}>
                <li onClick={firstBtn.onClick}>
                    <button>{firstBtn.text}</button>
                </li>
                <li onClick={secondBtn.onClick}>
                    <button>{secondBtn.text}</button>
                </li>
            </ul>
        </div>
    );
};

export default Popup;