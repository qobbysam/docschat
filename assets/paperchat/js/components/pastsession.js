
import React, { useEffect, useState } from "react"
import { getNewSession, getRecentSessions } from "../Api";

const PastSection = ({ session, handleSetSession, isSidebarOpen, chatstate }) => {

    const [pastSection, setPastSection] = useState([]);
    const [currentSection, setCurrentSection] = useState({})

    const pullPast = async () => {

        try {
            const res = await getRecentSessions(currentSection.id);

            const filterd = res.data.filter(obj => obj.used === true)
            setPastSection(filterd)
        } catch (error) {
            console.error(error)
        }

    }

    const handleNewSession = async () => {
        try {
            const res = await getNewSession()

            console.log(res.data);
            handleSetSession(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSetMain = (id) => {
        console.log("setting main: ...", id)

        var currentsession = pastSection.find((obj) => id === obj.id);

        handleSetSession(currentsession)
    }

    useEffect(() => {
        setCurrentSection(session)
        pullPast()
    }, [session])
    return (
        <>
            <div className={`${isSidebarOpen ? 'open' : ''} peer bdR `} id="chat-sidebar">
                <div className="layers h-100">
                    <div className="bdB layer w-100">
                        <button className="btn btn-success" onClick={handleNewSession}>New Session</button>

                    </div>

                    <div className="layer w-100 fxg-1 scrollable pos-r">
                        {pastSection && pastSection.map((obj, index) => (


                            <div className="peers fxw-nw ai-c p-20 bdB bgc-white bgcH-grey-50 cur-p" key={index} onClick={() => handleSetMain(obj.id)}>
                                <div className="peer">
                                    {/* <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="" className="w-3r h-3r bdrs-50p"> */}
                                </div>
                                <div className="peer peer-greed pL-20">
                                    <h6 className="mB-0 lh-1 fw-400">{obj.id}</h6>
                                    <small className="lh-1 c-green-500">Online</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>

            {/* <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>

                <ul classNameName="">
                    <li>
                    </li>
                    {pastSection && pastSection.map((obj, index) => (
                        <li key={index} classNameName="my-2">
                            <div>{obj.id}  :   <span> <button onClick={() => handleSetMain(obj.id)}>Set Main</button> </span> </div>
                        </li>
                    ))}
                </ul>
            </div> */}
        </>
    )
}

export default PastSection