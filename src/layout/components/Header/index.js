import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav-header')}>
                <div className={cx('icon-wrapper')}>
                    <button onClick={handleBackHome} className={cx('btn-icon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faGithub} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
