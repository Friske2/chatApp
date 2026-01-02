import { useState } from "react"
import useAuth from "../hooks/useAuth"

function LoginForm() {
    const [email, setEmail] = useState('jane.smith@example.com')
    const [password, setPassword] = useState('1234')
    const [errorMessage, setErrorMessage] = useState('')

    const { mutate: login, isPending: loading } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        // validate username and password
        if (!email || !password) {
            setErrorMessage('Please enter email and password')
            return
        }
        // validate email format with regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email')
            return
        }
        // call login function
        login({ email, password }, {
            onError: (err) => {
                setErrorMessage(err.message)
            }
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
export default LoginForm