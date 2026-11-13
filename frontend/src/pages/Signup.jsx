
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import linkedinImage from "../assets/linkedin.png"

const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState("")

    const { userData, setUserData } = useContext(userDataContext)

    const [loading, setLoading] = useState(false)

    let { serverUrl } = useContext(authDataContext)


    const [show, setShow] = useState(false)

    const formHandler = (e) => {
        e.preventDefault();
        setLoading(true)
    }

    const apiata = async () => {
        try {


            const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

            if (!emailPattern.test(email.trim())) {
                setErr("Please enter a valid Gmail address");
                setLoading(false)
                return;
            }
            const response = await axios.post(serverUrl + "/api/auth/signup", {
                firstName,
                lastName,
                userName,
                email,
                password
            }, { withCredentials: true })
            setErr("")
            navigate("/")
            setUserData(response.data)
             setLoading(false)
            window.location.reload();
            console.log(response.data)

        } catch (error) {
            setLoading(false)
            setErr(error.response.data.message)

            console.log("it is the erro from the frontend in login.jsx")

            console.log("Error message:", error.message);
            console.log("Backend error:", error.response?.data);
            console.log("Status code:", error.response?.status);
            console.log(error.message)

        }

    }


    return (
        <div className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-[#f3f2ef]">
            <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 py-3 sm:px-6 sm:py-4">

                {/* Logo */}
                <header className="shrink-0">
                    <img
                        src={linkedinImage}
                        alt="LinkedIn"
                        className="h-7 w-7 sm:h-8 sm:w-8"
                    />
                </header>

                {/* Main content */}
                <main className="flex flex-1 flex-col items-center justify-center py-2">



                    <section className="w-full max-w-[400px] rounded-lg bg-white p-4 shadow-sm sm:p-6">

                        <h1 className="mb-5 text-center text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
                            Sign<span className="text-[#0a66c2]">Up</span>
                        </h1>
                        <form onSubmit={formHandler}

                            className="flex flex-col gap-2.5 sm:gap-3">

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                                    First name
                                </label>
                                <input
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }
                                    }
                                    type="text"
                                    placeholder="First name"
                                    className="h-10 w-full rounded border border-gray-400 px-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                                    Last name
                                </label>
                                <input
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }
                                    }
                                    type="text"
                                    placeholder="Last name"
                                    className="h-10 w-full rounded border border-gray-400 px-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                                    User name
                                </label>
                                <input
                                    value={userName}
                                    onChange={(e) => {
                                        setUserName(e.target.value)
                                    }
                                    }
                                    type="text"
                                    placeholder="Last name"
                                    className="h-10 w-full rounded border border-gray-400 px-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }
                                    }
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-10 w-full rounded border border-gray-400 px-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
                                />
                            </div>

                            <div className="relative">
                                <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                                    Password
                                </label>
                                <input

                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }
                                    }



                                    type={show ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="h-10 w-full rounded border border-gray-400 px-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
                                />
                                <span onClick={() => {
                                    setShow(prev => !prev)
                                }
                                } className="absolute right-3 top-[38px] cursor-pointer text-sm text-blue-600">{show ? "hide" : "show"}</span>
                            </div>

                            <p className="text-center text-[10px] leading-4 text-gray-600 sm:text-xs">
                                By clicking Agree & Join, you agree to the applicable
                                terms and privacy policy for this demo.
                            </p>

                            {err && <p className="text-red-500">
                                *{err}
                            </p>}
                            <button
                                onClick={() => {
                                    apiata()
                                }
                                }
                                type="submit"
                                className="h-10 w-full rounded-full bg-[#0a66c2] px-3 text-sm font-semibold text-white hover:bg-[#004182]"
                            >
                                {loading ? "loading..." : "Agree & Join"}
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-gray-300" />
                                <span className="text-xs text-gray-500">or</span>
                                <div className="h-px flex-1 bg-gray-300" />
                            </div>

                            <button
                                type="button"
                                className="h-10 w-full rounded-full border border-gray-500 px-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Continue with Google
                            </button>

                        </form>

                        <p className="mt-3 text-center text-xs text-gray-700 sm:text-sm">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="font-semibold text-[#0a66c2] hover:underline cursor-pointer"
                            >
                                Log in
                            </button>
                        </p>

                    </section>
                </main>

                {/* Footer */}
                <footer className="flex shrink-0 flex-wrap justify-center gap-x-3 gap-y-1 py-2 text-[10px] text-gray-500 sm:gap-x-4 sm:text-xs">
                    <span>© 2026</span>
                    <span>About</span>
                    <span>Accessibility</span>
                    <span>Privacy & Terms</span>
                    <span>Help</span>
                </footer>

            </div>
        </div>
    );
};

export default Signup;
