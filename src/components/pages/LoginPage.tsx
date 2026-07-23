import {useState} from "react";

type LoginPageProps = {
    user: string;
    onSubmit: (user: string) => void;
}

function LoginPage({user, onSubmit}: LoginPageProps) {
    const [currentUser, setCurrentUser] = useState<string>('')

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!currentUser.trim()) {
                        return
                    }
                    onSubmit(currentUser.trim())
                }}
            >
                <p>Currently logged in as {user}. Please enter your name if that is not you.</p>
                <label htmlFor='user'>Username</label>
                <div>
                    <input
                        id='user'
                        name='user'
                        type='text'
                        placeholder='Username'
                        required={true}
                        value={currentUser}
                        onChange={(e) => setCurrentUser(e.target.value)}
                    />
                    <button type='submit'>Set username</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage