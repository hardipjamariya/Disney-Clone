import React, { useEffect } from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"


function Header() {
    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/home")
            }
        })

    }, [])

    const signin = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                let user = result.user
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/home")
            })

    }
    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setSignOut());
                history.push("/")
            })
    }
    return (
        <Nav>
            <Logo src="/images/logo.svg" />
            {!userName ? (
                <LoginContaine>
                    <Login onClick={signin}>Login</Login>
                </LoginContaine>
            ) :
                <>
                    <NavMenu>
                        <a>
                            <img src="/images/home-icon.svg" />
                            <span>HOME</span>
                        </a>
                        <a>
                            <img src="/images/search-icon.svg" />
                            <span>SEARCH</span>
                        </a>
                        <a>
                            <img src="/images/watchlist-icon.svg" />
                            <span>WATCHLIST</span>
                        </a>
                        <a>
                            <img src="/images/original-icon.svg" />
                            <span>ORIGINALS</span>
                        </a>
                        <a>
                            <img src="/images/movie-icon.svg" />
                            <span>MOVIES</span>
                        </a>
                        <a>
                            <img src="/images/series-icon.svg" />
                            <span>SERIES</span>
                        </a>

                    </NavMenu>
                    <UserImg
                        onClick={signOut} img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDayi908YkawkLspCfYKAGaJ71-TEAcVuKjZKhrihrx_l_2WO1TIsbC0jo59DvEGU0jYg&usqp=CAU" />
                    <DropDown>
                        <span onClick={signOut}>Sign out</span>
                    </DropDown>
                </>
            }

        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`
const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
            display: flex;
            flex: 1;
            margin-left: 25px;
            align-items: center;

            a {
            display: flex;
            align-items: center;
            padding: 0 12px;
            cursor: pointer;

            img {
                height: 20px;
        }

            span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
            content: "";
            height: 2px;
            background: white;
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: -6px;
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform: scalex(0);

            }
        }

            &:hover {
                span:after {
                transform: scalex(1);
            opacity: 1;
            }
        }
    }

            `

const UserImg = styled.img`
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            `

const Login = styled.div`
            background-color: rgba(0, 0, 0, 0.6);
            padding: 8px 16px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border: 1px solid #f9f9f9;
            border-radius: 4px;
            transition: all 0.2s ease 0s;
            cursor: pointer;

            &:hover {
                background-color: #f9f9f9;
                color: #000;
                border-color: transparent;
    }
            `
const LoginContaine = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`
const DropDown = styled.div`
cursor: pointer;
margin-left:30px;
`