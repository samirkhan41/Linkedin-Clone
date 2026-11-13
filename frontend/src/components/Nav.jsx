import React, { useContext, useState } from 'react'
import linkedinImage from "../assets/linkedin.png"
import { IoMdSearch } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import dpImage from "../assets/dp.png"
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Nav = () => {


    const [showPopup, setshowPopup] = useState(false)
    const { userData, setUserData } = useContext(userDataContext)

    const { serverUrl } = useContext(authDataContext)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const response = await axios.get(serverUrl + "/api/auth/logout", {
                withCredentials: true
            })

            console.log(response)
            setUserData(null)
            navigate("/login")
        }
        catch (error) {
            console.log(error.message)
            console.log("error from the logout frontend side ", error)
        }
    }
    return (
        <div className='w-full min-h-[60px] bg-white fixed top-0 left-0 z-50 border-b border-[#e0dfdc] flex justify-center'>

            <div className='w-full max-w-[1128px] min-h-[60px] flex items-center justify-between gap-2 px-3 sm:px-4 md:px-5'>

                {/* Left section */}

                <div className='flex items-center gap-2 sm:gap-3 shrink min-w-0'>

                    <div className='shrink-0'>
                        <img
                            className='h-[34px] w-[34px] sm:h-[38px] sm:w-[38px]'
                            src={linkedinImage}
                            alt="LinkedIn"
                        />
                    </div>

                    <form className='hidden sm:flex items-center gap-1 bg-[#edf3f8] hover:bg-[#e2eaf2] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0a66c2] rounded-md px-2 h-[34px] w-[clamp(150px,25vw,280px)] transition-colors'>
                        <IoMdSearch className='text-[22px] text-[#191919] shrink-0' />

                        <input
                            className='outline-none border-none bg-transparent w-full min-w-0 text-[14px] text-[#191919] placeholder:text-[#666666]'
                            type="text"
                            placeholder='Search'
                        />
                    </form>

                </div>

                {/* Right section */}

                <div className='flex items-center justify-end flex-1 min-w-0 h-[60px] gap-0 sm:gap-1 md:gap-3 relative'>

                    {/* //it is the small div when someone click the profile  */}

                    {showPopup&& <div className='absolute top-[60px] right-0 z-50 w-[280px] max-w-[calc(100vw-24px)] rounded-xl border border-[#e0dfdc] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.15)] mt-2'>

                        <div className='flex flex-col items-center gap-3'>

                            <img
                                className='h-14 w-14 rounded-full border border-gray-200 object-cover shrink-0'
                                src={dpImage}
                                alt="Profile"
                            />

                            <div className='text-center text-base font-semibold text-[#191919]'>
                                {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
                            </div>

                            <button className='w-full h-10 rounded-full border border-[#0a66c2] text-sm font-semibold text-[#0a66c2] transition-colors hover:bg-[#eaf4fe]'>
                                View Profile
                            </button>

                            <div className='my-1 h-px w-full bg-[#e0dfdc]'></div>

                            <button
                                onClick={() => {
                                    logout()
                                }

                                }
                                className='w-full h-10 rounded-full border border-[#cc1016] text-sm font-semibold text-[#cc1016] transition-colors hover:bg-[#fff0f0]'>
                                Sign Out
                            </button>

                        </div>

                    </div>}


                    {/* Home */}

                    <div className='flex flex-col items-center justify-center gap-[3px] text-[#666666] hover:text-[#191919] cursor-pointer h-[60px] flex-1 min-w-0 max-w-[90px] px-1 border-b-2 border-transparent hover:border-[#191919] transition-colors'>
                        <FaHome className='text-[20px] sm:text-[22px] shrink-0' />
                        <div className='text-[10px] sm:text-[12px] leading-[14px]'>Home</div>
                    </div>

                    {/* My Network */}

                    <div className='flex flex-col items-center justify-center gap-[3px] text-[#666666] hover:text-[#191919] cursor-pointer h-[60px] flex-1 min-w-0 max-w-[105px] px-1 border-b-2 border-transparent hover:border-[#191919] transition-colors'>
                        <FaUsers className='text-[20px] sm:text-[22px] shrink-0' />
                        <div className='text-[10px] sm:text-[12px] leading-[14px] text-center whitespace-nowrap'>My Network</div>
                    </div>

                    {/* Notifications */}

                    <div className='flex flex-col items-center justify-center gap-[3px] text-[#666666] hover:text-[#191919] cursor-pointer h-[60px] flex-1 min-w-0 max-w-[110px] px-1 border-b-2 border-transparent hover:border-[#191919] transition-colors'>
                        <IoIosNotifications className='text-[21px] sm:text-[23px] shrink-0' />
                        <div className='text-[10px] sm:text-[12px] leading-[14px] text-center'>Notifications</div>
                    </div>

                    {/* Profile */}

                    <div
                    onClick={()=>
                    {
                        setshowPopup(prev=>!prev)
                    }
                    }
                     className='flex flex-col items-center justify-center gap-[3px] text-[#666666] hover:text-[#191919] cursor-pointer h-[60px] flex-1 min-w-0 max-w-[65px] px-1 border-b-2 border-transparent hover:border-[#191919] transition-colors'>
                        <img
                            className='rounded-full h-[23px] w-[23px] sm:h-[25px] sm:w-[25px] object-cover shrink-0'
                            src={dpImage}
                            alt="Profile"
                        />
                        <div className='text-[10px] sm:text-[12px] leading-[14px]'>Me</div>
                    </div>

                </div>

            </div>

            {/* Mobile search bar */}

            <form className='absolute top-[60px] left-0 w-full bg-white px-3 py-2 border-b border-[#e0dfdc] flex items-center sm:hidden'>
                <div className='flex items-center gap-2 bg-[#edf3f8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0a66c2] rounded-md px-3 h-[36px] w-full'>
                    <IoMdSearch className='text-[22px] text-[#191919] shrink-0' />
                    <input
                        className='outline-none border-none bg-transparent w-full min-w-0 text-[14px] text-[#191919] placeholder:text-[#666666]'
                        type="text"
                        placeholder='Search'
                    />
                </div>
            </form>

        </div>
    )
}

export default Nav