import React, { useEffect, useState } from "react";
import PastSection from "./pastsession";
import { getNewSession } from "../Api";
import ActiveSection from "./activesection";



const chatoptions = [
    {
        name: "LAW",
        key: "1"
    },
    {
        name: "SCIENCE",
        key: "2"
    },

    {
        name: "GENERAL",
        key: "3"
    }
]

// var { chatstate = undefined } = window.ConfigTemplateVars || "";

var chatstate = window.ConfigTemplateVars ?? undefined;

const RootLayout = () => {

    const [currentsession, setCurrentSession] = useState({})
    const [pageState, setPageState] = useState("loading")
    const [refreshPast, setRefreshPast] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedchat, setChatState] = useState(null)

    function handleSessionChange(session) {

        setCurrentSession(session)
        setRefreshPast(true)

    }

    function handleSessionChangeNoRefresh(session) {

        setCurrentSession(session)
        setRefreshPast(false)

    }

    function handleRefresh(refreshvalue) {

        setRefreshPast(refreshvalue);
    }

    function handleSidebar() {
        setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);

    }

async function setupPage() {
    console.log("running setup");
    console.log(chatstate)
    if (!chatstate || chatstate === "") {
      const default_state = chatoptions.find((obj) => obj.key === "3");
      setChatState(default_state);
    } else if (chatstate === "1") {
      const chat_state = chatoptions.find((obj) => obj.key === "1");
      setChatState(chat_state);
    } else if (chatstate === "2") {
      const chat_state = chatoptions.find((obj) => obj.key === "2");
      setChatState(chat_state);
    }
  
    if (pageState === "ready") {
      return;
    }
  
    try {
      const res = await getNewSession();
      console.log(res.data);
      setCurrentSession(res.data);
      setPageState("ready");
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(() => {
        setupPage()
    }, [chatstate])

    return (
        <>
            <div className="row">
                {pageState === "ready" && (

                    <>

                        <div className="full-container">
                            <div className="peers fxw-nw pos-r">
                                <PastSection 
                                session={currentsession} 
                                handleSetSession={handleSessionChange} 
                                isSidebarOpen={isSidebarOpen} 
                                chatstate={selectedchat}
                                />

                                <ActiveSection
                                    currentsession={currentsession}
                                    refreshPast={refreshPast}
                                    handleRefresh={handleRefresh}
                                    handleSessionChangeNoRefresh={handleSessionChangeNoRefresh}
                                    handleSidebar={handleSidebar}
                                    chatstate={selectedchat}
                                />

                            </div>

                        </div>



                    </>
                )}

            </div>
        </>
    )
}

export default RootLayout;