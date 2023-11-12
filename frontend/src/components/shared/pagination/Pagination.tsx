import React, {FC, useEffect} from 'react';
import classes from './Pagination.module.scss'

interface IPagination {
    onChangePage: (currentPage: number) => void
    currentPage: number
    length: number
}

const Pagination: FC<IPagination> = ({onChangePage, currentPage, length}) => {

    const productsPerPage = 6
    const totalPages = Math.ceil(length / productsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            onChangePage(1);
        }
    }, [length, currentPage, onChangePage, totalPages]);

    const pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const goToPage = (page: number) => {
        if (page === currentPage || page < 1 || page > pages.length) return;
        onChangePage(page);
    };

    return (
        <div className={classes.pagination}>
            <button className={currentPage === 1 ? classes.disabled : ''}
                    onClick={() => goToPage(currentPage - 1)}>&lt;</button>
            {pages.map((page, i) => (
                <button className={page === currentPage ? classes.active : ''} key={i}
                        onClick={() => goToPage(page)}>{page}</button>
            ))}
            <button className={currentPage === pages.length ? classes.disabled : ''}
                    onClick={() => goToPage(currentPage + 1)}>&gt;</button>
        </div>
    );
};

export default Pagination;