import LoginForm from "../components/LoginForm"
// import { useAuth } from "../hooks/useAuth"

function Login() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
            <div className="card w-96 border border-base-200">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-2">Login</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login