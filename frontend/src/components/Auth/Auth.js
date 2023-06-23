import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';

const Auth = () => {
    const dispatch = useDispatch();


    const onResRecieved = (data) => {
        console.log(data);
        if (localStorage.getItem('adminId')) {
            localStorage.removeItem('adminId');
        }
        dispatch(userActions.login())
        localStorage.setItem("userId", data.id);
    }
    const getData = (data) => {
        console.log("from auth");
        console.log(data)
        sendUserAuthRequest(data.inputs, data.signup)
            .then(onResRecieved)
            .catch((er) => console.log(er));
    }
    return (
        <div>
            <AuthForm onSubmit={getData} isAdmin={false} />
        </div>
    )
}

export default Auth
