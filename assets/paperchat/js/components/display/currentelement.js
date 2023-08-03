import React, { useEffect, useRef, useState } from "react";

const Typewriter = ({ text, speed, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const typewriterRef = useRef(null);

    useEffect(() => {
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            if (currentIndex === text.length) {
                clearInterval(intervalId);
                onComplete(); // Call the onComplete function

                return;
            }

            setDisplayText(prevText => prevText + text[currentIndex]);
            currentIndex++;
        }, speed);

        typewriterRef.current.focus();

        return () => clearInterval(intervalId);
    }, [text, speed]);

    return (
        <span tabIndex={-1} ref={typewriterRef}>
            {displayText}
        </span>
    );
};


const CurrentElement = ({ cPrompt, textComplete }) => {

    return (
        <>

            <div className="peers fxw-nw ai-fe">
                <div className="peer ord-1 mL-20">
                    <img className="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/12.jpg" alt="" />
                </div>
                <div className="peer peer-greed ord-0">
                    <div className="layers ai-fe gapY-10">
                        <div className="layer">
                            <div className="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                <div className="peer mL-10 ord-1">
                                </div>
                                <div className="peer-greed ord-0">
                                    <span>{cPrompt.prompt}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {cPrompt && cPrompt.response && (
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
                                            <Typewriter text={cPrompt.response} speed={50} onComplete={textComplete} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
    // return (
    //     <>
    //         <div className="row ">
    //             <div className="col">
    //                 <div className="card">
    //                     <div className="card-body text-info">
    //                         {cPrompt.prompt}
    //                     </div>
    //                 </div>
    //             </div>

    //         </div>

    //         {cPrompt && cPrompt.response && (
    //             <>
    //                 <div className="row">
    //                     <div className="col">
    //                         <div className="card">
    //                             <div className="card-body text-success">
    //                                 <Typewriter text={cPrompt.response} speed={50} onComplete={textComplete} />
    //                             </div>
    //                         </div>
    //                     </div>

    //                 </div>
    //             </>
    //         )}

    //     </>
    // )
}


export default CurrentElement;