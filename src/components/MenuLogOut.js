import React from 'react';
import "../css_component/MenuLogoutCSS.css"
import {CiSettings} from "react-icons/ci";
import {TbPasswordUser} from "react-icons/tb";
import {HiOutlinePlus} from "react-icons/hi";
import {AiOutlineLogout} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {RiFolderMusicLine, RiSlideshow2Line} from "react-icons/ri";

const MenuLogOut = ({handler}) => {
    const navigate = useNavigate()
    function logOut() {
        handler(false);
        localStorage.clear()
        navigate("/")
    }
    function updatePassword(){
        handler(false);
        navigate("/updatePassword")
    }
    function updateProfile(){
        handler(false);
        navigate("/updateProfile")
    }

    function createSong(){
        handler(false);
        navigate("/create")
    }
    function showListSong(){
        handler(false);
        navigate('/showList')
    }

    function showList(){
        handler(false);
        navigate("/showPlaylist")
    }

    function createPlayList(){
        handler(false);
        navigate("/createPlayList")
    }

    return (
        <>
            <div className="menu-logout">
                <ul>
                    <li role="button" onClick={updateProfile}>
                        <div className="use-icon">
                            <CiSettings style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Sửa thông tin
                        </div>
                    </li>
                    <li role="button" onClick={updatePassword}>
                        <div className="use-icon">
                            <TbPasswordUser style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Thay đổi mật khẩu
                        </div>
                    </li>
                    <li role="button" onClick={createSong}>
                        <div className="use-icon">
                            <HiOutlinePlus style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Thêm bài hát
                        </div>
                    </li>
                    <li role="button" onClick={showListSong}>
                        <div className="use-icon">
                            <RiFolderMusicLine style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Nhạc của tôi
                        </div>
                    </li>
                    <li role="button" onClick={showList}>
                        <div className="use-icon">
                            <RiSlideshow2Line style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            D/S PlayList
                        </div>
                    </li>
                    <li role="button" onClick={createPlayList}>
                        <div className="use-icon">
                            <HiOutlinePlus style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            Thêm mới play list
                        </div>
                    </li>
                    <li role="button" onClick={logOut}>
                    <div className="use-icon">
                            <AiOutlineLogout style={{width: 20, height: 20}}/>
                        </div>
                        <div className="use-content">
                            LogOut
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MenuLogOut;