import Matches from '@/pages/accueil/matches'
import SideBar from '@/pages/accueil/sideBar'
import { useDispatch, useSelector } from 'react-redux'
import styles from '@/styles/Layout.module.css'
import Messages from '@/pages/accueil/messages'
import { useEffect } from 'react'
import { setSocket } from '@/redux/features/socketSlice'
import { useSocket } from '@/redux/context/SocketContext'
import { getConversations, getTest } from '@/redux/features/sideBarSlice'
import Loading from './ui/loading'


export default function Layout({ children }) {
    const loading = useSelector((state: any) => state.loading.loading)
    // const loading = useSelector((state: any) => state.sideBar.loading);
  const activeTab = useSelector((state: any) => state.sideBar.tab)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTest())
    }, [dispatch])

    if (loading) return <Loading />
    return (
        <div className={styles.container}>
            <div className={styles.sidebarFrame}>
                <SideBar />
            </div>
            <main className={styles.mainContent}>
                {activeTab === 'matches' && <Matches />}
                {activeTab === 'messages' && <Messages />}
                {activeTab === 'default' && children}
            </main>
        </div>
    )
}
