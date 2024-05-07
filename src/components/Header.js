import icons from "../untis/icons";
import Search from "./Search";
import {useNavigate} from "react-router-dom";
import MenuLogin from "./MenuLogin";
import "../css_component/menuSetting.css"
import MenuSetting from "./MenuSetting";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import MenuLogOut from "./MenuLogOut";
import MenuAdmin from "./MenuAdmin";
import {FaRegCircleUser} from "react-icons/fa6";
import {AppContext} from "../Context/AppContext";

const {IoIosArrowRoundBack, IoIosArrowRoundForward, AiOutlineSearch} = icons
const Header = () => {
    const {isFlag } = useContext(AppContext);

    const navigate = useNavigate()
    const id = localStorage.getItem("idUser")
    let [user, setUser] = useState({})
    let [img,setImg] = useState('');

    useEffect(() => {
        if (id !== null){
            axios.get('http://localhost:8080/users/' + id).then((res) => {
                console.log(res.data)
                setUser(res.data)
                setImg(localStorage.getItem("avatar"));
            })}else {
            navigate("/")
        }
    }, [isFlag])

    const [check, setCheck] = useState(false)
    const handleCheck = (isCheck) => {
        setCheck(isCheck);
    }
    // console.log(localStorage.getItem("role"))
    if (localStorage.getItem("idUser") !== null) {
        if (localStorage.getItem("role") === "ROLE_ADMIN") {
            return (
                <div className={' flex justify-between w-full items-center border-none'}
                     style={{zIndex: 100}}>
                    <div className={'flex gap-6 w-full items-center'}>
                        <div className={'flex text-gray-400 gap-4'}>
                            <button onClick={() => navigate(-1)}><IoIosArrowRoundBack style={{fill: "white"}} size={24}/></button>
                            <button onClick={() => navigate(1)}><IoIosArrowRoundForward style={{fill: "white"}} size={24}/></button>
                        </div>
                        <div className={'w-1/2'}>
                            <Search/>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className="dev_logout">
                            <button onClick={() =>{
                                setCheck(!check)
                            }

                            }>
                                <img src={img}
                                     style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 5,
                                    marginLeft: 2,
                                    marginRight: 30,
                                    borderRadius: 20
                                }}/>
                            </button>
                        </div>
                    </div>
                    <div className="form_menu" >
                        <div style={{marginTop: "149px" , position : 'absolute' , marginLeft: '-14%' ,height :'0px'}}> {check ? <MenuAdmin handler={handleCheck}></MenuAdmin> : <></>}</div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div className={' flex justify-between w-full items-center'}
                         style={{zIndex: 100}}>
                        <div className={'flex gap-6 w-full items-center'}>
                            <div className={'flex text-gray-400 gap-4'}>
                                <button onClick={() => navigate(-1)}><IoIosArrowRoundBack style={{fill: "white"}} size={24}/></button>
                                <button onClick={() => navigate(1)}><IoIosArrowRoundForward style={{fill: "white"}} size={24}/></button>
                            </div>
                            <div className={'w-1/2'}>
                                <Search/>
                            </div>
                        </div>
                        <div style={{display: "flex"}}>
                            <div className="dev_logout">
                                <button onClick={() =>{
                                    setCheck(!check)
                                }}>
                                    <img src={img} style={{
                                        width: 40,
                                        height: 40,
                                        marginTop: 5,
                                        marginLeft: 2,
                                        marginRight: 30,
                                        borderRadius: 20
                                    }}/>
                                </button>
                            </div>
                        </div>
                        <div className="form_menu" >
                            <div style={{marginTop: "149px" , position : 'absolute' , marginLeft: '-14%' ,height :'0px'}}> {check ? <MenuLogOut handler={handleCheck}></MenuLogOut> : <></>}</div>
                        </div>
                    </div>
                </>
            )
        }
    } else {
        return (
            <div className={' flex justify-between w-full items-center border-none'} style={{zIndex: 100}}>
                <div className={'flex gap-6 w-full items-center'}>
                    <div className={'flex text-gray-400 gap-4'}>
                        <button onClick={() => navigate(-1)}><IoIosArrowRoundBack style={{fill: "white"}} size={24}/></button>
                        <button onClick={() => navigate(1)}><IoIosArrowRoundForward style={{fill: "white"}} size={24}/></button>
                    </div>
                    <div className={'w-1/2'}>
                        <Search/>
                    </div>
                </div>
                <div style={{display: "flex"}}>
                    <div className="dev_logout items-center mt-2 ml-2">
                        <button onClick={() => {
                            setCheck(!check)
                        }

                        }><span className={'text-white'}><FaRegCircleUser size={35}/></span>
                            <div/>

                        </button>
                    </div>
                </div>
                <div className="form_menu" >
                    <div style={{marginTop: "19px" , position : 'absolute' , marginLeft: '-17%' ,height :'0px'}}> {check ? <MenuLogin handler={handleCheck}></MenuLogin> : <></>}</div>
                </div>
            </div>
        )
    }
}

export default Header
