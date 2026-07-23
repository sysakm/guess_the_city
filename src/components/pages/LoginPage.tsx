import {useState} from "react";

type LoginPageProps = {
    user: string;
    onSubmit: (user: string) => void;
}

function LoginPage({user, onSubmit}: LoginPageProps) {
    const [currentUser, setCurrentUser] = useState<string>('')

    return (
        <section className='login-card'>
            <div className='login-card__header'>
                <p className='login-card__eyebrow'>Player account</p>
                <h2>Welcome back</h2>
                <p>
                    Currently playing as <strong>{user}</strong>.
                    Enter another name to switch player.
                </p>
            </div>
            <form
                className='login-form'
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!currentUser.trim()) {
                        return
                    }
                    onSubmit(currentUser.trim())
                }}
            >
                <label className='login-form__label' htmlFor='user'>Username</label>
                <div className='login-form__controls'>
                    <input
                        className='login-form__input'
                        id='user'
                        name='user'
                        type='text'
                        placeholder='Username'
                        required={true}
                        value={currentUser}
                        onChange={(e) => setCurrentUser(e.target.value)}
                    />
                    <button className='login-form__submit' type='submit'>Set username</button>
                </div>
            </form>
        </section>
    )
}

export default LoginPage
