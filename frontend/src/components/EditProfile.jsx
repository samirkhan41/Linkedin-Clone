import React, { useContext } from 'react'
import { IoClose } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import dp from "../assets/dp.png"
import { IoCameraOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import { IoIosClose } from "react-icons/io";


const EditProfile = () => {
    const { edit, setEdit } = useContext(userDataContext)
    const { userData, setUserData } = useContext(userDataContext)

    const [firstName, setFirstName] = useState(userData.firstName || "")
    const [lastName, setLastName] = useState(userData.lastName || "")
    const [username, setUsername] = useState(userData.userName || "")
    const [headline, setHeadline] = useState(userData.headline || "")
    const [location, setLocation] = useState(userData.location || "")
    const [gender, setGender] = useState(userData.gender || "")
    const [skills, setSkills] = useState(userData.skills || [])
    const [newSkill, setNewSkill] = useState('')
    const [education, setEducation] = useState(userData.education || [])
    const [newEducation, setNewEducation] = useState(
        {
            college: "",
            degree: "",
            fieldOfStudy: "",
        }
    )

    const addnewSkill = () => {


        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill])
        }

        setNewSkill('')
    }

    //add newEducation
    const addNewEducation = () => {
        if (newEducation.college && newEducation.degree && newEducation.fieldOfStudy) {
            setEducation([...education, newEducation])
        }
        setNewEducation({
            college: "",
            degree: "",
            fieldOfStudy: "",
        })

    }

    // remove eduction
const removeEducation = (edu)=>
{
    if(education.includes(edu))
    {
        setEducation(education.filter((e)=> e!==edu))
    }
}

    // deleting skills 

    const removeSkill = (skill) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter(
                (s) => s !== skill)
            ) 
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">

            {/* yaha se small div start hai samjha bhai */}
            <div className="relative h-[500px] w-[400px] rounded-xl bg-white p-1 shadow-xl overflow-auto">

                <div className="relative h-[200px] w-full rounded-lg bg-gray-600 flex justify-center items-center">
                    <IoCameraOutline className=" text-3xl cursor-pointer " />
                </div>

                <IoClose
                    onClick={() => setEdit(false)}
                    className="absolute right-4 top-[8px] cursor-pointer text-2xl text-white transition-all duration-300 hover:rotate-90 hover:text-red-500" />



                <div className='relative top-[-35px] left-[40px] cursor-pointer'>
                    <img src={dp} alt="" className='h-[60px] w-[60px] rounded-full ' />
                    <div className='bg-blue-500 h-[16px] w-[16px] flex justify-center items-center rounded-full relative top-[-30px] left-[44px]'>
                        <FaPlus className='text-white' />
                    </div>

                </div >



                {/* yaha se from start ho raha hai  */}
                <div className='flex justify-center items-center w-full'>

                    <div className='flex flex-col gap-2 mt-[-25px] px-4 justify-center items-center w-full'>

                        <input type="text" placeholder='First Name'
                            value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' />

                        <input type="text" placeholder='Last Name'
                            value={lastName} onChange={(e) => setLastName(e.target.value)}
                            className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' />

                        <input type="text" placeholder='Username'
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' />

                        <input type="text" placeholder='Headline'
                            value={headline} onChange={(e) => setHeadline(e.target.value)}
                            className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' />

                        <input type="text" placeholder='Location'
                            value={location} onChange={(e) => setLocation(e.target.value)}
                            className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' />

                        <input type="text" placeholder='Gender (Male/Female/Other)'
                            value={gender} onChange={(e) => setGender(e.target.value)}
                            className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' />

                        {/* yaha se mere skill section start hai  */}

                        <div className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500 gap-2'>
                            <h1 className='font-bold'>Skills</h1>

                            {/* yaha per maine array map kiya hai  */}

                            {skills && <div>

                                {skills.map((skill, index) => {
                                    return <div className='w-full  border-gray-100 border-2 p-1.5 bg-gray-300 rounded-[6px] flex justify-between' key={index}><span>{skill}</span> <IoIosClose onClick={() => {
                                        removeSkill(skill)
                                    }
                                    } className='text-red-400 text-2xl cursor-pointer hover:text-red-600 ' /> </div>
                                })}
                            </div>}
                            {/* yaha per maine array map band kiya hai  */}

                            <div
                                onClick={(e) => {
                                    addnewSkill(e)
                                }
                                } className='gap-2 flex flex-col justify-center items-center w-full'>
                                <input className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' type="text" placeholder='Add a new Skill' value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
                                <button className='bg-blue-500 w-full text-white px-4 py-2 rounded-md' type='submit'>Add Skills</button>
                            </div>
                        </div>
                        {/* yaha per skill seciton end ho raha hai */}



                        {/* here is the education section start  */}


                        <div className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500 gap-2'>
                            <h1 className='font-bold'>Education</h1>

                            {/* yaha per maine array map kiya hai  */}

                            {education && <div>

                                {education.map((edu, index) => {
                                    return <div className='w-full gap-2   p-1.5  rounded-[6px] flex justify-between items-center' key={index}>

                                        
                                        <div className='flex flex-col gap-1 w-full'>
                                            <div className='w-full bg-gray-200 text-start border-1 p-2 '>College: {edu.college}</div>
                                            <div className='w-full bg-gray-200 text-start border-1 p-2 '> Degree: {edu.degree}</div>
                                            <div className='w-full bg-gray-200 text-start border-1 p-2'>Field of Study :{edu.fieldOfStudy}</div>

                                        </div>
                                        <IoIosClose onClick={() => removeEducation(edu)} className='text-red-600 text-3xl cursor-pointer hover:text-red-600 hover:bg-red-400 rounded-xl' />

                                    </div> 
                                })} 
                            </div>}
                            {/* yaha per maine array map band kiya hai  */}

                            <div
                                className='gap-2 flex flex-col justify-center items-center w-full'>

                                <input className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' type="text" placeholder='Add a new college' value={newEducation.college} onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })} />
                                <input className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' type="text" placeholder='Add a new Degree' value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} />
                                <input className='w-full px-3 py-2 text-sm rounded-md border border-gray-300 outline-none focus:border-blue-500' type="text" placeholder='Add a new fieldOfStudy' value={newEducation.fieldOfStudy} onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })} />
                                <button onClick={addNewEducation} className='bg-blue-500 w-full text-white px-4 py-2 rounded-md' type='submit'>Add Education</button>
                            </div>


                        </div>

                        {/* // here is the education section end */}
                    </div>
                </div>

            </div>

            {/* end of the gray div  */}

        </div>
    )
}

export default EditProfile 

