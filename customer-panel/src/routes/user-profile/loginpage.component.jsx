import BottomNav from '../../component/bottom-nav/bottom-nav.component'
import Loginregister from '../../component/account-component/login.component';
import Topbar from '../../component/topbar/topbar.component';

const LoginPage = () => {
    return (
        <div>
            <Topbar />
            <Loginregister />
            <BottomNav />
        </div>
    )
}

export default LoginPage;