import React from 'react'
import axios from 'axios'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../redux/auth';


const ProtectedRoutes = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const userLogin = useSelector(state => state.auth.userProfile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation().pathname

    const AuthVerify = () => {
        const token = localStorage.getItem('token');
        const dateNow = Date.now()
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            if ((decodedToken.exp*1000) < dateNow) {
                window.localStorage.removeItem('token')
            }
        }
    }

    const onLoginRegister = async () => {
        if (!Object.keys(userLogin).length !== 0) {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.get("https://be-kel1.herokuapp.com/whoami", {
                    headers: {
                        Authorization: token,
                    }
                }).then(res => {
                    dispatch(setUserProfile(res.data))
                    setIsLoading(false)
                    navigate('/')
                }).catch(err => {
                    console.log(err);
                })
            } else {
                navigate('/login')
                setIsLoading(false)
            }
        }
    }

    const getAuth = () => {
        if (!Object.keys(userLogin).length !== 0) {
            const token = localStorage.getItem('token');
            if (token) {
                axios.get("https://be-kel1.herokuapp.com/whoami", {
                    headers: {
                        Authorization: token,
                    }
                }).then(res => {
                    dispatch(setUserProfile(res.data))
                    setIsLoading(false)
                }).catch(err => {
                    console.log(err);
                })
            } else {
                navigate('/')
                setIsLoading(false)
            }
        }
    }

    React.useEffect(() => {
        AuthVerify()
        if (location === '/login' || location === '/register') {
            setTimeout(() => {
                onLoginRegister()
            }, 1500);
        } else {
            setTimeout(() => {
                getAuth()
            }, 1500);
        }
    }, [])
    return (
        <>
            {isLoading ?
                <Loading />
                :
                userLogin ?
                    <Outlet />
                    :
                    <Navigate to='/' />
            }
        </>
    )
}

export default ProtectedRoutes