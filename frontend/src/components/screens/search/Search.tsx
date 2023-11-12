import React from 'react';
import classes from './Search.module.scss'
import {useAppSelector} from "../../../hooks/useAppSelector";
import SearchItem from "./search-item/SearchItem";

const Search = () => {

    const {data} = useAppSelector(state => state.search)

    return (
        <div className={classes.searchResults}>
            {!data?.length ?
                <div className={classes.notFound}>Nothing
                    was found</div> :
                <div className={classes.searchList}>
                    {data.map(item => (
                        <SearchItem key={item._id} item={item}/>
                    ))}
                </div>
            }
        </div>
    );
};

export default Search;