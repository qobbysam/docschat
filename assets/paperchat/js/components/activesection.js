
import DisplaySection from "./display";
import PromptInput from "./promptinput";
import { socket } from "../websocket";
import React, { useEffect, useState } from "react";


const ActiveSection = ({ currentsession, refreshPast, handleSessionChangeNoRefresh, handleRefresh, handleSidebar }) => {

    const [currentPrompt, setCurrentPrompt] = useState({})
    const [locRefresh, setLocRefresh] = useState(false)

    function handleReceivedMessage(data) {
        console.log('Received message:', data);

        const msg = JSON.parse(data);

        const message = JSON.parse(msg.message);

        console.log(msg)
        console.log(message.message.transaction)
        const prompt = message.message.transaction;
        console.log("promd", prompt.id)
        console.log("curprm", currentPrompt.id)
        if (String(prompt.id) === String(currentPrompt.id)) {
            setCurrentPrompt(prompt)

            setTimeout(() => {
                console.log("running timeout", prompt)
                handlePrompt(prompt)
                setCurrentPrompt({})
            }, 5000)
        } else {
            handlePrompt(prompt)

        }
        //setCurrentSession(msg.transaction.session)
    }

    useEffect(() => {
        setLocRefresh(refreshPast)
    }, [refreshPast])

    useEffect(() => {

        socket.connect()
        socket.socket.onmessage = (event) => {
            const data = event.data;
            handleReceivedMessage(data);
        };
        return () => {
            //socket.socket.onmessage = null;
            socket.close();
        };
    }, [])

    function destroyCurrent() {

        setCurrentPrompt({})
    }

    function handlePrompt(prompt) {
        handleRefresh(false);
        setCurrentPrompt(prompt)
        handleSessionChangeNoRefresh(prompt.session)

    }
    return (
        <div className="peer peer-greed" id="chat-box">
            <div className="layers h-100">
                <div className="layer w-100">
                    <div className="peers fxw-nw jc-sb ai-c pY-20 pX-30 bgc-white">
                        <div className="peers ai-c">
                            <div className="peer d-n@md+">
                                <span onClick={handleSidebar} title="" id="chat-sidebar-toggle" className="td-n c-grey-900 cH-blue-500 mR-30">
                                    <i className="ti-menu"></i>
                                </span>
                            </div>
                            <div className="peer mR-20">
                                <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="" className="w-3r h-3r bdrs-50p" />
                            </div>
                            <div className="peer">
                                <h6 className="lh-1 mB-0">John Doe</h6>
                                <i className="fsz-sm lh-1">Typing...</i>
                            </div>
                        </div>
                        {/* <div className="peers">
                            <a className="peer td-n c-grey-900 cH-blue-500 fsz-md mR-30" title="">
                                <i className="ti-video-camera"></i>
                            </a>
                            <a href="" className="peer td-n c-grey-900 cH-blue-500 fsz-md mR-30" title="">
                                <i className="ti-headphone"></i>
                            </a>
                            <a href="" className="peer td-n c-grey-900 cH-blue-500 fsz-md" title="">
                                <i className="ti-more"></i>
                            </a>
                        </div> */}
                    </div>
                </div>

                <div className="layer w-100 fxg-1 bgc-grey-200 scrollable pos-r">

                    <div className="p-20 gapY-15">
                        <DisplaySection session={currentsession} currentPrompt={currentPrompt} destroyCurrent={destroyCurrent} refreshPast={locRefresh} />

                        {/* <div className="peers fxw-nw">
                            <div className="peer mR-20">
                                <img className="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/11.jpg" alt="" />
                            </div>
                            <div className="peer peer-greed">
                                <div className="layers ai-fs gapY-5">
                                    
                                    
                                    <div className="layer">
                                        <div className="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                            <div className="peer mR-10">
                                                <small>10:00 AM</small>
                                            </div>
                                            <div className="peer-greed">
                                                <span>Lorem Ipsum has been the industry's</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}


                        {/* <div className="peers fxw-nw ai-fe">
                            <div className="peer ord-1 mL-20">
                                <img className="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/12.jpg" alt="" />
                            </div>
                            <div className="peer peer-greed ord-0">
                                <div className="layers ai-fe gapY-10">
                                    <div className="layer">
                                        <div className="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                            <div className="peer mL-10 ord-1">
                                                <small>10:00 AM</small>
                                            </div>
                                            <div className="peer-greed ord-0">
                                                <span>Heloo</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <PromptInput session={currentsession} handlePrompt={handlePrompt} />

                    
                {/* <div className="layer w-100">

                    <div className="p-20 bdT bgc-white">
                        <div className="pos-r">
                            <input type="text" className="form-control bdrs-10em m-0" placeholder="Say something..." />
                            <button type="button" className="btn btn-primary bdrs-50p w-2r p-0 h-2r pos-a r-1 t-1 btn-color">
                                <i className="fa fa-paper-plane-o"></i>
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>

        /* <div classNameName="col-8">
            <div style={{ minHeight: '600px', maxHeight: '800px', overflowY: 'scroll' }}>

                <DisplaySection session={currentsession} currentPrompt={currentPrompt} destroyCurrent={destroyCurrent} refreshPast={locRefresh} />
            </div>
            <PromptInput session={currentsession} handlePrompt={handlePrompt} />

        </div> */
    )
}

export default ActiveSection;