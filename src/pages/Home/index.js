import classNames from 'classnames/bind';
import GithubItems from '../GithubComponents/GithubItems';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { SearchContext } from '../Context/SearchContext';

const cx = classNames.bind(styles);

function Home() {
    const [searchInput, setSearchInput] = useState('');

    const handleChangeSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <SearchContext.Provider value={searchInput}>
            <div className={cx('wrapper')}>
                <div className={cx('component')}>
                    <div className={cx('input-wrapper')}>
                        <div className={cx('input')}>
                            <input
                                value={searchInput}
                                onChange={handleChangeSearchInput}
                                type="text"
                                className={cx('input-text')}
                                placeholder="Search or jump to..."
                            />
                        </div>
                        <div className={cx('icon-wrapper')}>
                            <FontAwesomeIcon className={cx('icon-search')} icon={faSearch} />
                        </div>
                    </div>
                </div>
                <div className={cx('component')}>
                    <GithubItems />
                </div>
            </div>
        </SearchContext.Provider>
    );
}

export default Home;
