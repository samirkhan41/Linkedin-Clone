import React, { useContext } from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.png"
import { FaPlus } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import { RiPencilAi2Line } from "react-icons/ri";
import EditProfile from '../components/EditProfile';


const Home = () => {

  const { userData, setUserData, edit, setEdit } = useContext(userDataContext)
  return (
    <div className='w-full min-h-[100vh] bg-gray-400 pt-[80px] gap-6 flex justify-center items-start px-[20px] flex-col lg:flex-row'>
      {edit && <EditProfile />}
      <Nav />

      {/* first div */}
      <div className=' w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg p-[10px] '>
        <div onClick={() => {
          setEdit(true)
        }
        } className='w-[100%] h-[100px] flex justify-center items-center bg-gray-400 rounded-lg cursor-pointer '>
          <img src="" alt="" className='w-full' />
          <IoCameraOutline className="w-[100px]  top-[-45px] left-[30px] cursor-pointer" />
        </div>

        <div
          onClick={() => {
            setEdit(true)
          }
          } className='relative top-[-35px] left-[40px] cursor-pointer'>
          <img src={dp} alt="" className='h-[60px] w-[60px] rounded-full ' />
          <div className='bg-blue-500 h-[16px] w-[16px] flex justify-center items-center rounded-full relative top-[-30px] left-[44px]'>
            <FaPlus className='text-white' />
          </div>

        </div>

        {/* // it is for name  */}
        <div>{` ${userData.firstName}  ${userData.lastName}`}</div>
        <div>{userData.headline || ""}</div>

        <div>{userData.location}</div>

        <button
          onClick={() => {
            setEdit(true)
          }
          } className="w-full h-10 rounded-full border border-[#0a66c2] text-sm font-semibold text-[#0a66c2] transition-colors flex items-center justify-center gap-2 cursor-pointer hover:bg-[#eaf4fe] mb-4">
          Edit Profile <RiPencilAi2Line />
        </button>

      </div>



      {/* second div */}
      <div className='w-full lg:w-[50%] min-h-[200px] bg-white shadow-lg'>

      </div>
      {/* third div */}
      <div className='w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg'>

      </div>
    </div>
  )
}

export default Home
