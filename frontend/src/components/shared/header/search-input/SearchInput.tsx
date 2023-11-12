import React, {ChangeEvent, KeyboardEventHandler, useCallback, useRef, useState} from 'react';
import classes from "./SearchInput.module.scss";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import debounce from "lodash.debounce";
import {Link, useNavigate} from "react-router-dom";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {fetchSearchQuery} from "../../../../store/search/search.action";
import {optimizedImg} from "../../../../utils/optimizedImg";
import ClearIcon from "../../../UI/svg-icons/clear-icon/ClearIcon";

const SearchInput = () => {

    const navigate = useNavigate()
    const {data} = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const searchRef = useRef<HTMLDivElement>(null)
    const [isWindowOpen, setIsWindowOpen] = useState(false);

    const updateSearchQuery = useCallback(debounce((str: string) => {
        dispatch(fetchSearchQuery(str))
        setIsWindowOpen(true)
    }, 200), [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDebouncedSearchQuery(e.target.value)
        updateSearchQuery(e.target.value)
    }

    const slicedSearchResults = data?.slice(0, 3)

    const handleItemClick = () => {
        setIsWindowOpen(false)
    };

    useOutsideClick(searchRef, setIsWindowOpen, isWindowOpen)

    const handleKeyPress: KeyboardEventHandler<HTMLLabelElement> = (e) => {
        if (e.key === 'Enter' && debouncedSearchQuery !== '' && window.location.pathname !== '/search') {
            navigate('/search')
            setIsWindowOpen(false)
        }
    }

    const clearSearch = () => {
        setDebouncedSearchQuery('')
        dispatch(fetchSearchQuery(''))
    }

    return (
        <div ref={searchRef} className={classes.searchContainer}>
            <label onKeyDown={handleKeyPress} className={classes.search}>
                <input
                    value={debouncedSearchQuery}
                    onChange={handleChange}
                    type="text"
                    placeholder='Search'
                />
                {debouncedSearchQuery &&
                    <ClearIcon onClick={clearSearch} className={classes.clearIcon}/>
                }
            </label>
            {/*{isLoading && <div>Loading...</div>}*/}
            {window.location.pathname !== '/search' && isWindowOpen && debouncedSearchQuery ? (
                debouncedSearchQuery.length < 20 && data?.length ? (
                    <ul onClick={handleItemClick} className={classes.popUpSearch}>
                        {slicedSearchResults?.map((item) => (
                            <li key={item._id}>
                                <Link to={`/category/${item.category}/${item.href}`}>
                                    <img src={optimizedImg(item.img)} alt={item.title}/>
                                    <p>{item.title}</p>
                                </Link>
                            </li>
                        ))}
                        <Link style={{justifyContent: 'center', display: 'flex', padding: '10px 0', fontWeight: '500'}}
                              to='/search'>
                            Show more
                        </Link>
                    </ul>
                ) : (
                    <div style={{padding: '20px', textAlign: 'center'}} className={classes.popUpSearch}>
                        <p>No results :(</p>
                    </div>
                )
            ) : null}
        </div>
    );
};

export default SearchInput;