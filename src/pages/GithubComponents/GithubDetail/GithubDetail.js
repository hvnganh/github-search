import classNames from 'classnames/bind';
import styles from './GithubDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import request from '~/apis/request';

const cx = classNames.bind(styles);

function GithubDetail(props) {
    const { name, visibility, nameUser } = props;
    const [language, setLanguage] = useState('');

    useEffect(() => {
        const fetchLanguages = async () => {
            const response = await request.get(`/repos/${nameUser}/${name}/languages`);
            const datas = response.data;
            setLanguage(Object.keys(datas)[0]);
        };
        fetchLanguages();
    }, [nameUser, name]);

    return (
        <div className={cx('wrapper-repodetail')}>
            <div className={cx('repos-info-wrapper')}>
                <div className={cx('line-1')}>
                    <div className={cx('repo-name-wrapper')}>
                        <h4 className={cx('repo-name')}>{name}</h4>
                    </div>
                    <div className={cx('repo-visibility-wrapper')}>
                        <p className={cx('repo-visibility')}>{visibility}</p>
                    </div>
                </div>
                <div className={cx('line-2')}>
                    <div className={cx('icon-wrapper')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCircle} />
                    </div>
                    <div className={cx('language-wrapper')}>
                        <p className={cx('language')}>{language}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GithubDetail;
