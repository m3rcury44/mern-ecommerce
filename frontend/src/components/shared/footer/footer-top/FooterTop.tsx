import React from 'react';
import classes from './FooterTop.module.scss'
import {Link} from "react-router-dom";

const FooterTop = () => {
    return (
        <div className={classes.footer}>
            <div style={{margin: '0 auto 0'}} className='container'>
                <div className={classes.footerInfo}>
                    <div className={classes.social}>
                        <Link to='/'>
                            <img src="/images/layout-icons/logo.svg" alt="logo"/>
                        </Link>
                        <p>Best information about the company<br/> is here but now lorem ipsum is</p>
                        <div className={classes.socialLinks}>
                            <Link to='https://github.com/m3rcury44'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                     fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M18.8953 9.99L17.4834 9.99094C16.3762 9.99094 16.1616 10.5169 16.1616 11.2884V12.9909H18.8025L18.4584 15.6581H16.1616V22.5H13.4081V15.6581H11.1056V12.9909H13.4081V11.025C13.4081 8.74219 14.8022 7.5 16.8375 7.5C17.8125 7.5 18.6506 7.57219 18.8953 7.605V9.99ZM15 0C6.71625 0 0 6.71531 0 15C0 23.2837 6.71625 30 15 30C23.2847 30 30 23.2837 30 15C30 6.71531 23.2847 0 15 0Z"
                                          fill="#505050"/>
                                </svg>
                            </Link>
                            <Link to='https://github.com/m3rcury44'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                     fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M20.9644 11.9409C20.97 12.0731 20.9738 12.2053 20.9738 12.3394C20.9738 16.4053 17.8781 21.0947 12.2175 21.0947C10.4794 21.0947 8.86219 20.5856 7.5 19.7128C7.74094 19.7409 7.98562 19.755 8.23406 19.755C9.67594 19.755 11.0025 19.2638 12.0562 18.4378C10.7091 18.4134 9.57281 17.5238 9.18094 16.3013C9.36938 16.3369 9.56156 16.3556 9.76031 16.3556C10.0406 16.3556 10.3125 16.3181 10.5712 16.2478C9.16313 15.9656 8.10281 14.7216 8.10281 13.2309C8.10281 13.2178 8.10281 13.2047 8.10281 13.1916C8.51719 13.4222 8.9925 13.5609 9.49687 13.5769C8.67094 13.0247 8.12719 12.0825 8.12719 11.0156C8.12719 10.4513 8.27906 9.9225 8.54437 9.46781C10.0622 11.3297 12.33 12.555 14.8875 12.6834C14.835 12.4584 14.8078 12.2231 14.8078 11.9822C14.8078 10.2825 16.1859 8.90438 17.8847 8.90438C18.7706 8.90438 19.5703 9.27844 20.1309 9.87656C20.8322 9.73875 21.4912 9.48281 22.0856 9.13031C21.8559 9.84844 21.3675 10.4513 20.7328 10.8328C21.3553 10.7578 21.9478 10.5928 22.5 10.3481C22.0875 10.965 21.5653 11.5069 20.9644 11.9409ZM15 0C6.71531 0 0 6.71531 0 15C0 23.2837 6.71531 30 15 30C23.2847 30 30 23.2837 30 15C30 6.71531 23.2847 0 15 0Z"
                                          fill="#505050"/>
                                </svg>
                            </Link>
                            <Link to='https://github.com/m3rcury44'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                     fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M22.5 22.4859H19.3922V17.6222C19.3922 16.4625 19.3716 14.9709 17.7769 14.9709C16.1597 14.9709 15.9131 16.2347 15.9131 17.5397V22.4859H12.8081V12.4847H15.7875V13.8525H15.8306C16.245 13.0659 17.2594 12.2362 18.7716 12.2362C21.9187 12.2362 22.5 14.3072 22.5 17.0006V22.4859ZM9.30375 11.1187C8.30531 11.1187 7.5 10.3106 7.5 9.31594C7.5 8.32125 8.30531 7.51312 9.30375 7.51312C10.2975 7.51312 11.1047 8.32125 11.1047 9.31594C11.1047 10.3106 10.2975 11.1187 9.30375 11.1187ZM10.8581 22.4859H7.74656V12.4847H10.8581V22.4859ZM15 0C6.71531 0 0 6.71531 0 15C0 23.2837 6.71531 30 15 30C23.2847 30 30 23.2837 30 15C30 6.71531 23.2847 0 15 0Z"
                                          fill="#505050"/>
                                </svg>
                            </Link>
                            <Link to='https://github.com/m3rcury44'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                     fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M16.0175 18.8948C17.6103 18.8948 18.9022 17.6067 18.9022 16.0167C18.9022 14.4276 17.6103 13.1395 16.0175 13.1395C14.4247 13.1395 13.1328 14.4276 13.1328 16.0167C13.1328 17.6067 14.4247 18.8948 16.0175 18.8948ZM19.3392 13.0694H21.367C21.5986 13.0694 21.787 12.8819 21.787 12.6512V10.6272C21.787 10.3966 21.5986 10.2091 21.367 10.2091H19.3392C19.1076 10.2091 18.9192 10.3966 18.9192 10.6272V12.6512C18.9192 12.8819 19.1076 13.0694 19.3392 13.0694ZM23.5 21.7206C23.5 22.7031 22.7022 23.5 21.7169 23.5H10.2831C9.29875 23.5 8.5 22.7031 8.5 21.7206V10.2784C8.5 9.29594 9.29875 8.5 10.2831 8.5H21.7169C22.7022 8.5 23.5 9.29594 23.5 10.2784V21.7206ZM16 1C7.71531 1 1 7.71531 1 16C1 24.2837 7.71531 31 16 31C24.2847 31 31 24.2837 31 16C31 7.71531 24.2847 1 16 1ZM20.5804 16.0171C20.5804 18.5268 18.5339 20.5696 16.0176 20.5696C13.5014 20.5696 11.4548 18.5268 11.4548 16.0171C11.4548 15.6008 11.5111 15.1967 11.617 14.8133H10.2136V21.3364C10.2136 21.568 10.4011 21.7555 10.6326 21.7555H21.4017C21.6342 21.7555 21.8217 21.568 21.8217 21.3364V14.8133H20.4183C20.5242 15.1967 20.5804 15.6008 20.5804 16.0171Z"
                                          fill="#505050"/>
                                </svg>
                            </Link>
                            <Link to='https://github.com/m3rcury44'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                     fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M22.5 15.5662C22.5 16.7803 22.35 17.9944 22.35 17.9944C22.35 17.9944 22.2038 19.0275 21.7537 19.4831C21.1838 20.0803 20.5444 20.0831 20.2509 20.1178C18.1519 20.2697 15 20.2744 15 20.2744C15 20.2744 11.1 20.2388 9.9 20.1244C9.56625 20.0616 8.81625 20.0803 8.24625 19.4831C7.79625 19.0275 7.65 17.9944 7.65 17.9944C7.65 17.9944 7.5 16.7803 7.5 15.5662V14.4281C7.5 13.2141 7.65 12.0009 7.65 12.0009C7.65 12.0009 7.79625 10.9669 8.24625 10.5113C8.81625 9.91406 9.45562 9.91125 9.74906 9.87656C11.8481 9.72469 14.9972 9.72469 14.9972 9.72469H15.0028C15.0028 9.72469 18.1519 9.72469 20.2509 9.87656C20.5444 9.91125 21.1838 9.91406 21.7537 10.5113C22.2038 10.9669 22.35 12.0009 22.35 12.0009C22.35 12.0009 22.5 13.2141 22.5 14.4281V15.5662ZM15 0C6.71531 0 0 6.71531 0 15C0 23.2837 6.71531 30 15 30C23.2847 30 30 23.2837 30 15C30 6.71531 23.2847 0 15 0ZM13.4514 16.9453L17.5042 14.8453L13.4505 12.7303L13.4514 16.9453Z"
                                          fill="#505050"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <ul className={classes.info}>
                        <li>
                            <Link to='https://github.com/m3rcury44'>About</Link>
                        </li>
                        <li>
                            <Link to='https://github.com/m3rcury44'>Partnership</Link>
                        </li>
                        <li>
                            <Link to='https://github.com/m3rcury44'>Information</Link>
                        </li>
                        <li>
                            <Link to='https://github.com/m3rcury44'>For users</Link>
                        </li>
                        <div className={classes.getApp}>
                            <li>
                                <Link to='https://github.com/m3rcury44'>Get app</Link>
                            </li>
                            <div className={classes.getAppImg}>
                                <Link to='https://github.com/m3rcury44'>
                                    <img src="/images/layout-icons/appstore.svg" alt="appstore"/>
                                </Link>
                                <Link to='https://github.com/m3rcury44'>
                                    <img src="/images/layout-icons/googleplay.svg"
                                         alt="googleplay"/>
                                </Link>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FooterTop;