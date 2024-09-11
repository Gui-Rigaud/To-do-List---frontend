import Link from 'next/link'
import style from './style.module.scss'

import { FiLogOut, FiList } from 'react-icons/fi'

export function Header() {

    return (
        <header>
            <div className={style.headerContainter}>
                <div className={style.headerContent}>
                    <Link href='/'>
                        <FiList color='#f0f0f0' size={20}/>
                    </Link>

                    <nav className={style.menuNav}>

                        <div className={style.userInfo}>
                            <label>Signed as:</label>
                            <h4></h4>
                        </div>

                        <label>Sair</label>
                        <button>
                            <FiLogOut color='#FFF' size={20} />
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}