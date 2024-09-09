import Matches from "@/pages/accueil/matches";
import SideBar from "@/pages/accueil/sideBar";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/Layout.module.css";
import Messages from "@/pages/accueil/messages";
import { useEffect } from "react";
import { setSocket } from "@/redux/features/socketSlice";
import { useSocket } from "@/redux/context/SocketContext";
import { getConversations } from "@/redux/features/sideBarSlice";


export default function Layout({ children }) {

  // useEffect(() => {
  //   dispatch(getConversations);
    
  // }, [dispatch]);
  const activeTab = useSelector((state: any) => state.sideBar.tab);

  return (
      <div className={styles.container}>
        <div className={styles.sidebarFrame}>
          <SideBar />
        </div>
      <main className={styles.mainContent}>
        {activeTab === "matches" && <Matches />}
        {activeTab === "messages" && <Messages />}
        {activeTab === "default" && children}
      </main>
    </div>
  )
}