import React, { useEffect, useRef } from 'react'
import './Header.scss'

import { useLocation, Link } from 'react-router-dom'

const headerNav = [
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TVs',
        path: '/tv'
    },
    {
        display: 'Favourite',
        path: '/favourite'
    },
]

const Header = () => {

    const { pathname } = useLocation()

    const headerRef = useRef(null)

    const active = headerNav.findIndex(x => x.path === pathname)

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                headerRef.current.classList.add('shrink')
            }
            else {
                headerRef.current.classList.remove('shrink')
            }
        }
        window.addEventListener("scroll", shrinkHeader)

        return () => {
            window.removeEventListener("scroll", shrinkHeader)
        }
    }, [])

    return (
        <div className='header' ref={headerRef}>
            <div className="container header__wrap">
                <div className="header__logo">
                    <Link to="/">Trailerrr</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((item, index) => (
                            <li key={index} className={`${index === active ? 'active' : ''}`}>
                                <Link to={item.path}>{item.display}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div >
    )
}

export default Header
