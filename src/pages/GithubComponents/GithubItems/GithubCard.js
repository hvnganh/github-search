import classNames from 'classnames/bind';
import styles from './GithubItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function GithubCard(props) {
    const { name, avatar, linkGithub, repos_url } = props;

    return (
        <div className={cx('wrapper-card')}>
            <div className={cx('github-user')}>
                <div className={cx('img-wrapper')}>
                    <div className={cx('img')} style={{ backgroundImage: `url(${avatar})` }}></div>
                </div>
                <div className={cx('infor')}>
                    <div className={cx('name-wrapper')}>
                        <h3 className={cx('name')}>Name: {name}</h3>
                    </div>
                    <div className={cx('github-urls')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faGithub} />
                        <a className={cx('github-url')} href={linkGithub} target="_blank" rel="noreferrer">
                            {linkGithub}
                        </a>
                    </div>
                    <Link to={`/${name}/repos`}>
                        <div className={cx('link-repos')}>
                            <a className={cx('link')} href={repos_url}>
                                <FontAwesomeIcon className={cx('icon-repo')} icon={faLink} />
                                <h3 className={cx('view-repo')}>View Repos</h3>
                            </a>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GithubCard;
