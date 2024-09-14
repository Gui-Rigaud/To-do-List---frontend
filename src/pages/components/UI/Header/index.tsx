import Link from 'next/link'
import style from './style.module.scss'

import { FiLogOut, FiList } from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export function Header() {

    const {signOut, user} = useContext(AuthContext)

    return (
        <header>
            <div className={style.headerContainter}>
                <div className={style.headerContent}>
                    <Link href='/home'>
                        <FiList color='#f0f0f0' size={20}/>
                    </Link>

                    <nav className={style.menuNav}>

                        <div className={style.userInfo}>
                            <label>Signed as:</label>
                            <h4>{user?.nome}</h4>
                        </div>

                        <label>Sair</label>
                        <button onClick={signOut}>
                            <FiLogOut color='#FFF' size={20} />
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}