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
    const [playlistCheck, setPlaylistCheck] = useState([]);
    const {isFlag} = useContext(AppContext);
    const {toggleFlag} = useContext(AppContext);

    useEffect(() => {
        axios.get('http://localhost:8080/playlists').then(res => {
            setPlaylistCheck(checkName(res.data));
        })
    }, [ isFlag]);

    function checkName(data) {
        let namePlayList = [];
        for (let i = 0; i < data.length; i++) {
            namePlayList.push(data[i].name)
        }
        return namePlayList;
    }

    const [isModalOpen, setIsModalOpen] = useState(true);

    const  handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate("/")
    };
    return (
<>
            <Modal className="bg-blue-300" width={400} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Formik initialValues={{
                    name: "",
                    appUser: {
                        id: id_user
                    }
                }}
                        validationSchema={
                            require("yup").object().shape({
                                name: require("yup")
                                    .string()
                                    .required("Vui lòng nhập tên Playlist").test('unique', 'Playlist đã tồn tại', (value) => {
                                        return !playlistCheck.includes(value);
                                    }),
                            })
                        }
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            axios.post("http://localhost:8080/playlists/create", values).then(() => {
                                toast.success("Tạo playlist thành công", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                                // navigate("/showPlaylist")
                               toggleFlag()
                            })
                        }}>
                    <Form>
                        <div className="row g-3 align-items-center"
                             style={{width: 400, marginLeft: 20, display: 'align-items-center'}}>
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col-form-label"></label>
                            </div>
                            <div className="col-auto">
                                <h5>Tên PlayList</h5>
                                <ErrorMessage style={{color:'red'}}  className={'formik-error-message mb-2 text-f'} name="name" component="div"/>
                                <Field name="name" type="text" className="form-control text-f rounded-full w-full"
                                       placeholder="Nhập tên playlist"/><br/>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="text-f rounded-full w-50 h-10">Tạo mới</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};

export default ModalCreatePlayList;