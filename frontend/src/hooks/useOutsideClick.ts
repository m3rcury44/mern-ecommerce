import {Dispatch, RefObject, SetStateAction, useEffect} from "react";

export const useOutsideClick = (elementRef: RefObject<HTMLElement>, handler: Dispatch<SetStateAction<boolean>>, attached: boolean = true) => {
    useEffect(() => {
        if (!attached) return

        const handleClickOutside = (e: MouseEvent) => {
            if (!elementRef.current?.contains(e.target as Node)) {
                handler(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [elementRef, handler, attached])
}