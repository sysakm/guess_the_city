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
        <div>
            <header>
                <div>
                    <h1>GUESS THE CITY GAME</h1>
                </div>
                <nav>
                    {navItems.map((item) => {
                        return (
                            <button
                                className={activePage === item.page ? 'active' : ''}
                                key={item.page}
                                onClick={() => onPageChange(item.page)}
                                type='button'
                            >{item.label}</button>
                        )
                    })}
                </nav>
            </header>
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
