import React, { useEffect, useState } from "react";
import PastSection from "./pastsession";
import { getNewSession } from "../Api";
import ActiveSection from "./activesection";

const RootLayout = () => {

    const [currentsession, setCurrentSession] = useState({})
    const [pageState, setPageState] = useState("loading")
    const [refreshPast, setRefreshPast] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

    function handleSidebar(){
        setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);

    }
    async function setupPage() {
        console.log("running setup")

        if (pageState === "ready") {
            return
        }

        try {
            const res = await getNewSession()

            console.log(res.data);
            setCurrentSession(res.data)
            setPageState("ready")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setupPage()
    }, [])

    return (
        <>
            <div className="row">
                {pageState === "ready" && (

                    <>

                        <div className="full-container">
                            <div className="peers fxw-nw pos-r">
                                <PastSection session={currentsession} handleSetSession={handleSessionChange} isSidebarOpen={isSidebarOpen}/>

                                <ActiveSection
                                    currentsession={currentsession}
                                    refreshPast={refreshPast}
                                    handleRefresh={handleRefresh}
                                    handleSessionChangeNoRefresh={handleSessionChangeNoRefresh}
                                    handleSidebar={handleSidebar}
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