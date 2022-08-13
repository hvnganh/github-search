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

    const debounceData = useDebounce(inputText, 500);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await request.get(`/search/users?q=${debounceData ? debounceData : {}}&page=1`);
                const datas = await response.data.items;
                startTransition(() => {
                    setInformation(datas);
                });
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchApi();
    }, [debounceData]);

    console.log(information);

    const handleScroll = (e) => {};

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    console.log(information);

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
                                repos_url={data.repos_url}
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
        </div>
    );
}

export default GithubItems;
