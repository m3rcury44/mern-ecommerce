import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import classes from './Filters.module.scss';
import {Link} from 'react-router-dom';
import MyInput from '../../../UI/input/MyInput';
import MyButton from '../../../UI/buttons/my-button/MyButton';
import {ICatalog} from '../../../../types/category.interface';
import FilterIcon from "../../../UI/svg-icons/filter-icon/FilterIcon";
import {
    setCurrentPage,
    setFilters,
    setSearchByMaxPrice,
    setSearchByMinPrice,
    setSortByBrand,
    setSortByPrice
} from "../../../../store/filter/filter.slice";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import qs from "qs";
import debounce from "lodash.debounce";

interface IFilters {
    href: string
    category: ICatalog | undefined;
    categoryList: ICatalog[];
    selectedBrands: string[]
    setSelectedBrands: (selectedBrands: string[]) => void
}

interface ISortItem {
    sort: string;
    title: string;
}

const sortList: ISortItem[] = [
    {
        sort: 'asc',
        title: 'By min price',
    },
    {
        sort: 'desc',
        title: 'By max price',
    },
];

const Filters: FC<{ Filters: IFilters }> = ({Filters}) => {

    const {
        href,
        category,
        categoryList,
        selectedBrands,
        setSelectedBrands,
    } = Filters

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false);
    const [sortPrice, setSortPrice] = useState('');
    const [searchMinPrice, setSearchMinPrice] = useState('')
    const [searchMaxPrice, setSearchMaxPrice] = useState('')

    useEffect(() => {
        const handleResize = () => {
            const isFiltersOpen = window.innerWidth >= 791;
            setIsOpen(isFiltersOpen);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            dispatch(setFilters({
                ...params
            }))
        } else {
            dispatch(setCurrentPage(1));
            dispatch(setSortByPrice(''));
            dispatch(setSortByBrand([]));
            dispatch(setSearchByMinPrice('0'));
            dispatch(setSearchByMaxPrice('999999'));
            setSelectedBrands([]);
        }
    }, [dispatch, href])

    const onChangeMinPrice = useCallback(debounce((minPrice: string) => {
        dispatch(setSearchByMinPrice(minPrice))
    }, 250), [dispatch])

    const onChangeMaxPrice = useCallback(debounce((maxPrice: string) => {
        dispatch(setSearchByMaxPrice(maxPrice))
    }, 250), [dispatch])

    const handleSortByPrice = (sort: string) => {
        setSortPrice(sortPrice === sort ? '' : sort);
        dispatch(setSortByPrice(sortPrice === sort ? '' : sort))
    };

    const handleSortByBrand = (brand: string) => {
        const newSelectedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
            : [...selectedBrands, brand];

        setSelectedBrands(newSelectedBrands);
        dispatch(setSortByBrand(newSelectedBrands))
        dispatch(setCurrentPage(1));
    };

    const handleSearchByMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchMinPrice(value)
        if (value === '') {
            onChangeMinPrice('0')
        } else {
            onChangeMinPrice(value)
        }
    }

    const handleSearchByMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchMaxPrice(value)
        if (value === '') {
            onChangeMaxPrice('999999')
        } else {
            onChangeMaxPrice(value)
        }
    }

    useEffect(() => {
        setSelectedBrands([]);
        setSortByPrice('')
        setSearchMinPrice('')
        setSearchMaxPrice('')
    }, [category !== undefined]);

    const handleResetFilters = () => {
        setSortByPrice('')
        setSortPrice('')
        setSearchMinPrice('')
        setSearchMaxPrice('')
        dispatch(setSortByPrice(''))
        dispatch(setSortByBrand([]))
        setSelectedBrands([])
        onChangeMinPrice('0')
        onChangeMaxPrice('999999')
    };

    return (
        <aside className={classes.filters}>
            <div onClick={() => setIsOpen((prev) => !prev)} className={classes.filtersTitle}>
                <h5>Filters</h5>
                <div className={classes.svgIcon}>{!isOpen ? <FilterIcon/> :
                    <FilterIcon style={{rotate: '180deg'}}/>}</div>
            </div>
            {isOpen && (
                <>
                    <div className={classes.category}>
                        <h6>Category</h6>
                        {categoryList.map((item) => (
                            <Link key={item._id} onClick={() => item.href !== href ? handleResetFilters() : ''}
                                  to={`/category/${item.href}`}>
                                {item.href}
                            </Link>
                        ))}
                    </div>
                    <div className={classes.brand}>
                        <h6>Brands</h6>
                        <div>
                            {category?.brands.map((item, i) => (
                                <label key={i} className={classes.brandSort}>
                                    <input
                                        onChange={() => handleSortByBrand(item)}
                                        type="checkbox"
                                        checked={selectedBrands.includes(item)}
                                    />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={classes.priceSort}>
                        <h6>Sort by price</h6>
                        <div className={classes.priceSortBtns}>
                            {sortList.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSortByPrice(item.sort)}
                                    className={item.sort === sortPrice ? classes.active : ''}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                        <div className={classes.setPriceSort} style={{display: 'flex', gap: '10px'}}>
                            <div>
                                <p>Min</p>
                                <MyInput
                                    value={searchMinPrice}
                                    onChange={handleSearchByMinPrice}
                                    type="text"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <p>Max</p>
                                <MyInput
                                    value={searchMaxPrice}
                                    onChange={handleSearchByMaxPrice}
                                    type="text"
                                    placeholder="999999"
                                />
                            </div>
                        </div>
                        <MyButton onClick={handleResetFilters} style={{marginBottom: '15px', color: '#0D6EFD'}}>
                            Reset
                        </MyButton>
                    </div>
                </>
            )}
        </aside>
    );
};

export default Filters;
