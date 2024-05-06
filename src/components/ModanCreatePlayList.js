import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import {AiOutlinePlus} from "react-icons/ai";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import {IoAddOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../Context/AppContext";

const ModalCreatePlayList = () => {

    const navigate = useNavigate();
    const id_user = localStorage.getItem("idUser")
    const [listPlaylistCheck, setPlaylistCheck] = useState([]);
    const {isFlag} = useContext(AppContext);
    const {toggleFlag} = useContext(AppContext);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/playLists').then(res => {
    //         setPlaylistCheck(findPlaylist(res.data)) ;
    //     })
    // }, [ isFlag]);

    function findPlaylist (data) {
        let a = [];
        for (let i = 0; i < data.length; i++) {
            a.push(data[i].namePlayList)
        }
        return a;
    }

    const [isModalOpen, setIsModalOpen] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const  handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate("/")
    };
    return (

            <Modal className="bg-blue-300" width={400} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Formik initialValues={{
                    namePlayList: "",
                    id_users: {
                        id: id_user
                    }
                }}
                        validationSchema={
                            require("yup").object().shape({
                                namePlayList: require("yup")
                                    .string()
                                    .required("Vui lòng nhập tên Playlist").test('unique', 'Playlist đã tồn tại', (value) => {
                                        return !listPlaylistCheck.includes(value);
                                    }),
                            })
                        }
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            console.log("value playlist:", values)
                            axios.put("http://localhost:8080/playLists", values).then((res) => {
                                if (res.data === false){
                                    toast.error('Không thể tạo')
                                }
                                toast.success("Tạo playlist thành công", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                                navigate("/showPlaylist")
                               toggleFlag()
                            }).catch(() =>{
                                toast.error(" Bạn cần đăng nhập")
                                navigate("/login")
                            })
                        }}>
                    <Form>
                        <div className="row g-3 align-items-center p-4 bg-blue-300" style={{display:'align-items-center'}}>
                            <div>
                                <label htmlFor="inputPassword6" className="col-form-label"></label>
                            </div>
                            <div className="w-full">
                                <h5 className="text-xl mb-4 text-f">Tạo PlayList mới</h5>
                                <ErrorMessage style={{color:'red'}}  className={'formik-error-message mb-2 text-f'} name="namePlayList" component="div"/>
                                <Field name="namePlayList" type="text" className="form-control text-f rounded-full w-full"
                                       placeholder="Nhập tên playlist"/><br/>
                                <div className="text-center">
                                    <button type="submit" className="text-f rounded-full w-50 h-10">Tạo mới</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>

    );
};

export default ModalCreatePlayList;