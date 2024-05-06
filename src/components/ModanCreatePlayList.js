import React, {useContext, useEffect, useState} from 'react';
import {Modal} from 'antd';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
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
            <Modal width={1000} title="Tạo bài hát mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
                                <ErrorMessage style={{color: 'red'}} className={'formik-error-message'}
                                              name="name" component="div"/>
                                <Field name="name" type="text" id="input" className="form-control"/><br/>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary">Thêm</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};

export default ModalCreatePlayList;