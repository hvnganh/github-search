import config from '~/config';
import GithubDetails from '~/pages/GithubComponents/GithubDetail';
import Home from '~/pages/Home';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.githubRepo, component: GithubDetails },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
