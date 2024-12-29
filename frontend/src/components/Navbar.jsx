import { useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo"

const Navbar = ({ userInfo }) => {
    const isToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
            <h2 className='font-logo text-5xl font-semibold tracking-tight text-primary select-none'>Travel Story</h2>

            {isToken && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
        </div>
    )
}

export default Navbar
