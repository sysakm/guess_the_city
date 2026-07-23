import {useState} from "react";
import AppLayout, {type AppPage} from "./components/AppLayout.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import GamePage from "./components/pages/GamePage.tsx";
import {loadLogin, saveLogin} from "./storage/statsStorage.ts";

const DEFAULT_USERNAME = 'Username'

function App() {
    const [page, setPage] = useState<AppPage>('login');
    const [user, setUser] = useState<string>(() => loadLogin() ?? DEFAULT_USERNAME)

    function handleLoginSubmit(user: string) {
        setUser(user)
        saveLogin(user)
    }

    return (
        <AppLayout activePage={page} onPageChange={setPage}>
            {page === 'login' && <LoginPage user={user} onSubmit={handleLoginSubmit}/>}
            {page === 'game' && <GamePage user={user}/>}
            {/*{page === 'stats' && <StatsPage />}*/}
        </AppLayout>
    )
}

export default App
