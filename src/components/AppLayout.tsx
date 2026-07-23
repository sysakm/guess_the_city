import type {ReactNode} from "react";

export type AppPage = 'login' | 'game' | 'stats'

type AppLayoutProps = {
    activePage: AppPage;
    onPageChange: (page: AppPage) => void;
    children: ReactNode;
}

const navItems: Array<{page: AppPage, label: string}> = [
    {page: 'login', label: 'Account'},
    {page: 'game', label: 'Game'},
    {page: 'stats', label: 'Statistics'},
]

function AppLayout({ activePage, onPageChange, children }: AppLayoutProps) {
    return (
        <div className='app-shell'>
            <header className='app-header'>
                <span className='app-brand'>Guess the City</span>
                <nav className='app-nav' aria-label='Main navigation'>
                    {navItems.map((item) => {
                        return (
                            <button
                                className={`app-nav__button ${activePage === item.page ? 'active' : ''}`}
                                key={item.page}
                                onClick={() => onPageChange(item.page)}
                                type='button'
                                aria-current={activePage === item.page ? 'page' : undefined}
                            >{item.label}</button>
                        )
                    })}
                </nav>
            </header>
            <main>
                <div className='game-card__header'>
                    <p className='game-card__eyebrow'>Photo quiz</p>
                    <h1>Guess the City</h1>
                    <p className='game-card__subtitle'>Choose the city shown in the photo.</p>
                </div>
                {children}
            </main>
        </div>
    )
}

export default AppLayout
