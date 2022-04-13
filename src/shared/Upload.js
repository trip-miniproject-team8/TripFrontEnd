import React from "react";
import { Button } from "../elements";
import { storage } from './firebase';

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import { apis } from "./api";
import axios from "axios";
const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector((state) => state.image.uploading);
    const fileInput = React.useRef();

    const selectFile = (e) => {

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);
        // console.log('file :: ', file)
        // console.log('reader ::', reader)

        reader.onloadend = () => {
            // console.log('reader.result :: ', reader.result);
            dispatch(imageActions.setPreview(reader.result));
        };
        // document.getElementById('input-image').src=file;
        const formData = new FormData();
        formData.append('file',file);
        apis.addPost(formData)
        .then((res)=>{
            console.log(formData);
            console.log(res);
        })
        .catch((error)=>{
            // console.log(error.response.data.errorMessage);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
        // window.alert(error.response.data.errorMessage);
        })
        
    }

    const uploadFB = () => {
        let image = fileInput.current.files[0];
        
        dispatch(imageActions.uploadImageFB(image));
    }

    
    return (
        <React.Fragment>
            <input id='input-image' onChange={selectFile} type="file" ref={fileInput} disabled={is_uploading}/>
            {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
        </React.Fragment>
    )
}

export default Upload;