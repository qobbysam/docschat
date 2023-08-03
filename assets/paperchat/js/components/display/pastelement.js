import React, { useEffect, useRef, useState } from "react";


const TitleElement = ({ title }) => {

    return (
        <>
            <span>{title}</span>

        </>
    )
}

const ResponseElement = ({ response }) => {

    return (
        <>
            <span>{response}</span>
        </>
    )
}

const SourcesElement = ({ sources }) => {
    const [showDetail, setShowDetail] = useState(false);

    function handleShow() {
        setShowDetail(!showDetail);
    }

    return (
        <div className="card-link">
            <button onClick={handleShow}>
                {showDetail ? 'Close' : 'Display'} sources
            </button>
            {showDetail && <div className="detail text-info">{sources}</div>}
        </div>
    );
};


const ThoughtElement = ({ thought }) => {

    return (
        <>
        </>
    )
}


const CompositionElement = ({ composition }) => {

    return (
        <>

        </>
    )
}

const DetailWrapper = ({ title, elementToshow }) => {
    const [showDetail, setShowDetail] = useState(false);

    function handleShow() {
        setShowDetail((prevShowDetail) => !prevShowDetail);
    }

    return (
        <>
            <div className="options">
                <button onClick={handleShow}>
                    {showDetail ? 'Close' : 'Display'} {title}
                </button>
            </div>
            {showDetail && (
                <div className="detail">
                    {elementToshow}
                </div>
            )}
        </>
    );
};


const PastElement = ({ chat_transaction }) => {


    return (
        <>

            <div className="peers fxw-nw">
                <div className="peer mR-20">
                    <img className="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/11.jpg" alt="" />
                </div>
                <div className="peer peer-greed">
                    <div className="layers ai-fs gapY-5">


                        <div className="layer">
                            <div className="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                <div className="peer mR-10">
                                </div>
                                <div className="peer-greed">
                                    {chat_transaction.prompt && (<TitleElement title={chat_transaction.prompt} />)}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="peers fxw-nw ai-fe">
                <div className="peer ord-1 mL-20">
                    <img className="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/12.jpg" alt="" />
                </div>
                <div className="peer peer-greed ord-0">
                    <div className="layers ai-fe gapY-10">
                        <div className="layer">
                            <div className="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                <div className="peer mL-10 ord-1">
                                    {chat_transaction.sources && (
                                        <small>
                                            <SourcesElement sources={chat_transaction.sources} />
                                        </small>)}
                                </div>
                                <div className="peer-greed ord-0">
                                    {chat_transaction.response && (<ResponseElement response={chat_transaction.response} />)}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

    // return (
    //     <>

    //         <div className="row">
    //             <div className="col">
    //                 <div className="card">

    //                     <div className="card-body">
    //                         <div className="card-title text-danger">
    //                             {chat_transaction.prompt  && (<TitleElement title={chat_transaction.prompt} />)}
    //                         </div>

    //                         <div className="card-text">

    //                             {chat_transaction.response && (<ResponseElement response={chat_transaction.response}/>)}

    //                         </div>

    //                         {chat_transaction.sources && (
    //                             <div className="card-link">
    //                                     <SourcesElement sources={chat_transaction.sources} />
    //                             </div>)}

    //                             {chat_transaction.thought && (
    //                             <div className="card-link">
    //                                 <DetailWrapper title="thought">
    //                                     <ThoughtElement thought={chat_transaction.thought} />
    //                                 </DetailWrapper>
    //                             </div>)}

    //                             {chat_transaction.composition && (
    //                             <div className="card-link">
    //                                 <DetailWrapper title="composition">
    //                                     <CompositionElement composition={chat_transaction.composition} />
    //                                 </DetailWrapper>
    //                             </div>)}


    //                     </div>
    //                 </div>
    //             </div>
    //         </div>

    //     </>
    // )

};

export default PastElement