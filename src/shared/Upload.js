import React from "react";
import { Text, Button } from "../elements";
import { storage } from './firebase';
import styled from 'styled-components';

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import { apis } from "./api";
import axios from "axios";
const Upload = (props) => {
    
    const dispatch = useDispatch();
    const is_uploading = useSelector((state) => state.image.uploading);
    const fileInput = React.useRef();
    console.log(props);
    // console.log(props.is_edit);
    const selectFile = (e) => {
        console.log("작성처음으로 넘어오겠지요");
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(imageActions.setPreview(reader.result));
        };
        const formData = new FormData();
        formData.append('file',file);
        
        apis.addPost(formData)
            .then((res)=>{
                console.log('upload 성공');
                console.log(formData);
                console.log(res);
                console.log(typeof(res.data.postId));
                props.setNewPostId(res.data.postId);
            })
            .catch((error)=>{
                console.log(error.response.data.errorMessage);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.response.data);
            // window.alert(error.response.data.errorMessage);  
            })
            .then()
    }
    const changeFile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];
        console.log("씨발되라고");
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(imageActions.setPreview(reader.result));
        };
        const formData = new FormData();
        formData.append('file',file);
        
        apis.editPost(props.post_id,formData)
            .then((res)=>{
                console.log('사진바꾸기 성공');
                console.log(formData);
                console.log(res);
                console.log(typeof(res.data.postId));
                props.setNewPostId(res.data.postId);
            })
            .catch((error)=>{
                // console.log(error.response.data.errorMessage);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.response.data);
            // window.alert(error.response.data.errorMessage);  
            })
            .then()
    }

    const uploadFB = () => {
        let image = fileInput.current.files[0];
        
        dispatch(imageActions.uploadImageFB(image));
    }


    if(props.is_edit){
    return (
        <React.Fragment>
            <Label className="input-file-button" htmlFor="input-image">
            <Text size='24px' bold>👉 사진을 선택해주세요 👈</Text>
            </Label>
            <input id='input-image' onChange={changeFile} type="file" ref={fileInput} disabled={is_uploading} style={{display:"none"}}/>
            {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
        </React.Fragment>
        )
    }
    else{
        return (
            <React.Fragment>
                <Label className="input-file-button" htmlFor="input-image">
                <Text size='24px' bold>👉 사진을 선택해주세요 👈</Text>
                </Label>
                <input id='input-image' onChange={selectFile} type="file" ref={fileInput} disabled={is_uploading} style={{display:"none"}}/>
                {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
            </React.Fragment>
            )
        
    }
}

const Label = styled.label`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    border: none;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
        text-underline-position: under;
        cursor: pointer;
      }
`;

export default Upload;