import { useState } from "react"
import { userLogin } from "../services/userServices"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"
const loginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('john.doe@example.com')
    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    // const { user, loading, isError, error } = useAuth({ username, password })
    const handleSubmit = (e) => {
        e.preventDefault()
        // validate username and password
        if (!email || !password) {
            alert('Please enter email and password')
            return
        }
        // validate email format with regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email')
            return
        }
        // call login function
        setLoading(true)
        userLogin({ email, password })
            .then((res) => {
                console.log(res)
                // redirect to /
                // set user in localStorage
                sessionStorage.setItem('user', JSON.stringify(res))
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setErrorMessage(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input className="input input-bordered w-full max-w-xs" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input className="input input-bordered w-full max-w-xs" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button disabled={loading} className="btn btn-primary w-full max-w-xs" type="submit">Login</button>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
    )
}
function Login() {
    return (
        <div>
            <div className="text-2xl font-bold">Login</div>
            <div className="mt-4">
                {loginForm()}
            </div>
        </div>
    )
}

export default Login