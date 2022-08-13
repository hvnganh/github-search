import classNames from 'classnames/bind';
import styles from './GithubDetail.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '~/apis/request';
import GithubDetail from './GithubDetail';

const cx = classNames.bind(styles);

function GithubDetails() {
    const nameParam = useParams();
    const name = nameParam.name;

    const [listRepos, setListRepos] = useState([]);
    const [avt, setAvt] = useState({});

    useEffect(() => {
        const fetchRepos = async () => {
            const response = await request.get(`/users/${name}/repos`);
            const datas = await response.data;
            setListRepos(datas);
        };
        fetchRepos();
    }, [name]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await request.get(`/search/users?q=${name}`);
            const datas = await response.data.items;
            setAvt(datas[0]);
        };
        fetchApi();
    }, [name]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('github-wrapper')}>
                <div className={cx('row')}>
                    <div className={cx('infor')}>
                        <div className={cx('col c-12')}>
                            <div className={cx('img-wrapper')}>
                                <img className={cx('img')} src={avt.avatar_url} alt="avt" />
                            </div>
                            <div className={cx('name-wrapper')}>
                                <h1 className={cx('name')}>{avt.login}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('githubdetail-wrapper')}>
                        {listRepos.map((repo) => (
                            <div key={repo.id} className={cx('col c-6')}>
                                <div className={cx('githubdetail')}>
                                    <GithubDetail
                                        name={repo.name}
                                        visibility={repo.visibility}
                                        nameUser={repo.owner.login}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GithubDetails;
