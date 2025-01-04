import { useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo"
import SearchBar from "./Input/SearchBar";

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
    const isToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        handleClearSearch();
        setSearchQuery("");
    };

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
            <h2 className='font-logo text-5xl font-semibold tracking-tight text-primary select-none'>Travel Story</h2>

            {isToken && <>
                <SearchBar 
                    value={searchQuery}
                    onChange={({target}) => {
                        setSearchQuery(target.value);
                    }}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </>}
        </div>
    )
}

export default Navbar
