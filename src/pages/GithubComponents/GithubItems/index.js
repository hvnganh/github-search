import GithubCard from './GithubCard';
import classNames from 'classnames/bind';
import styles from './GithubItems.module.scss';
import { useContext, useEffect, useState, useTransition } from 'react';
import request from '~/apis/request';
import { SearchContext } from '~/pages/Context/SearchContext';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function GithubItems() {
    const inputText = useContext(SearchContext);
    const [information, setInformation] = useState([]);
    const [isLoading, startTransition] = useTransition();
    const [currentPage, setCurrentPage] = useState(1);

    const debounceData = useDebounce(inputText, 500);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await request.get(
                    `/search/users?q=${debounceData ? debounceData : {}}&page=${currentPage}`,
                );
                const datas = await response.data.items;
                startTransition(() => {
                    setInformation(datas);
                });
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchApi();
    }, [debounceData, currentPage]);

    console.log(information);

    const handlePrevious = () => {
        setCurrentPage((state) => state - 1);
    };

    const handleNext = () => {
        setCurrentPage((state) => state + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('github-items')}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : information.length >= 1 ? (
                    information.map((data) => (
                        <div className={cx('github-item')} key={data.id}>
                            <GithubCard
                                name={data.login}
                                avatar={data.avatar_url}
                                linkGithub={data.html_url}
                                node_id={data.node_id}
                            />
                        </div>
                    ))
                ) : (
                    <div className={cx('no-user')}>
                        <img
                            className={cx('img-no-data')}
                            src="https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg"
                            alt="No data"
                        />
                    </div>
                )}
            </div>
            {information.length >= 1 ? (
                <div className={cx('paginate')}>
                    {currentPage === 1 ? (
                        <button className={cx('btn-paginate', 'btn-disabled')} disabled onClick={handlePrevious}>
                            Previous
                        </button>
                    ) : (
                        <button className={cx('btn-paginate')} onClick={handlePrevious}>
                            Previous
                        </button>
                    )}
                    <h1 className={cx('page-number')}>{currentPage}</h1>
                    <button className={cx('btn-paginate')} onClick={handleNext}>
                        Next
                    </button>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default GithubItems;
