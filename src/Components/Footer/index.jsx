import React from 'react'
import './Footer.scss'

import { BsFacebook, BsGithub, BsInstagram } from 'react-icons/bs'

const Footer = () => {
    return (
        <div className="container">
            <div className="section">
                <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />
                <div className="container-footer">
                    <div className="container-footer--left" style={{ color: "#5a606b" }}>
                        <h3>THE END !</h3>
                        <p>I would like to say "Thank You" for spend time to look at my app. <br />
                            You're a flower on earth, let's make your life beautiful and meaningful (◕‿↼)</p>
                        <ul className='footer--left__list'>
                            <li>
                                <a href="https://www.facebook.com/Etienneee/" style={{ color: "#ffffff" }}>
                                    <BsFacebook size={22} />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Le-Huu-Loc" style={{ color: "#ffffff" }}>
                                    <BsGithub size={22} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/huuloc_271199/" style={{ color: "#ffffff" }}>
                                    <BsInstagram size={22} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div style={{ color: "5a606b" }} className="container-footer--right">
                        <h3>KEEP IN TOUCH</h3>
                        <ul>
                            <li>
                                <p className='footer--right__list'>
                                    <strong>Address:</strong> Hoài Ân, Bình Định
                                </p>
                            </li>
                            <li>
                                <a href="tel:+84983395820" className='footer--right__list'>
                                    <strong>Phone:</strong> +84983395820
                                </a>
                            </li>
                            <li>
                                <a href="mailto:huuloc271199@gmail.com" target="_top" className='footer--right__list'>
                                    <strong>
                                        <i className="fas fa-envelope"></i> Email:</strong> huuloc271199@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Footer
