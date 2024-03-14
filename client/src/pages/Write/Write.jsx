import React, { useState } from 'react';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CategoryDropdown from '../../components/ui/CategoryDropdown/CategoryDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import { XMarkIcon } from '@heroicons/react/24/outline';
import './Write.css';

export default function Write() {
    const state = useLocation().state;

    // console.log('state: ', state);
    const [value, setValue] = useState(state?.desc || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');

    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post(
                'http://localhost:8800/api/upload',
                formData
            );
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleCategorySelect = (selectedCategory) => {
        setCat(selectedCategory);
        console.log('Selected category:', selectedCategory);
    };

    const handlePostPublish = async () => {
        const imgUrl = await upload();
        console.log('imgUrl: ', imgUrl);

        const token = Cookies.get('access_token');

        try {
            const res = state
                ? await axios.post(`http://localhost:8800/api/posts/update`, {
                      title,
                      desc: value,
                      cat,
                      img: file ? imgUrl : state.img,
                      token,
                      postId: state.id,
                  })
                : await axios.post(`http://localhost:8800/api/posts/`, {
                      title,
                      desc: value,
                      cat,
                      img: file ? imgUrl : '',
                      date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                      token,
                  });

            toast.success(res.data.message);
            navigate('/');
        } catch (err) {
            toast.error(err.response.data.error);
            console.log(err);
        }
    };

    return (
        <div className='write-main'>
            <div className='write-content'>
                <div className='container1'>
                    <div className='imgUploadBtn'>
                        <input
                            style={{ display: 'none' }}
                            type='file'
                            id='file'
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor='file'>Cover photo</label>
                        {file?.name && (
                            <>
                                <span className='img-name'>
                                    {file.name.split(' ').slice(0, 5).join(' ')}
                                </span>
                                <XMarkIcon
                                    className='XIcon'
                                    onClick={() => setFile(null)}
                                />
                            </>
                        )}
                    </div>
                    <input
                        className='input-title'
                        type='text'
                        placeholder=' Your blog title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='editorContainer'>
                    <ReactQuill
                        className='editor'
                        theme='snow'
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className='write-menu'>
                <CategoryDropdown onSelect={handleCategorySelect} />
                <button onClick={handlePostPublish}>
                    {state ? 'Update' : 'Publish'}
                </button>
            </div>
        </div>
    );
}
