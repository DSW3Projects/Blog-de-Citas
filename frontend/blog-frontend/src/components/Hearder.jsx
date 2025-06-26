import { FaHeart } from 'react-icons/fa';

const Header = () =>{
    return(
        <header className="fixed top-0 left-0 z-50 w-full py-4 px-6 shadow-md text-2xl  font-bold text-pink-500 bg-black/35 backdrop-blur">
            <div className="flex items-center space-x-2">
                <FaHeart className="text-red-500 text-2xl heartbeat" />
                <span>Amor en línea</span>
            </div>
        </header>
    );
};
export default Header;