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
                    <img className="w-2r bdrs-50p" src="data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2064%2064%22%20enable-background%3D%22new%200%200%2064%2064%22%20xml%3Aspace%3D%22preserve%22%20fill%3D%22%23000000%22%3E%0A%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%2216%22%20r%3D%2212%22%20fill%3D%22%23FFC0CB%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2224%22%20y%3D%2228%22%20width%3D%2216%22%20height%3D%2224%22%20fill%3D%22%2300CED1%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M24%2C30c-3%2C3-3%2C9-3%2C9l-2-2c0%2C0-2-6%2C3-9h0c0%2C0%2C1.362%2C1.362%2C2%2C2S24%2C30%2C24%2C30z%22%20fill%3D%22%2300CED1%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M40%2C30c3%2C3%2C3%2C9%2C3%2C9l2-2c0%2C0%2C2-6-3-9h0c0%2C0-1.362%2C1.362-2%2C2S40%2C30%2C40%2C30z%22%20fill%3D%22%2300CED1%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M28%2C52c0%2C0-2%2C6%2C4%2C6s4-6%2C4-6l-2-8h-4L28%2C52z%22%20fill%3D%22%23CD853F%22%20%2F%3E%0A%3C%2Fsvg%3E" alt="" />
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
                        <img
                            className="w-2r bdrs-50p"
                            src="data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2064%2064%22%20enable-background%3D%22new%200%200%2064%2064%22%20xml%3Aspace%3D%22preserve%22%20fill%3D%22%23000000%22%3E%0A%20%20%3Crect%20x%3D%2216%22%20y%3D%2224%22%20width%3D%2232%22%20height%3D%2216%22%20fill%3D%22%23FF9800%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2224%22%20y%3D%228%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23FF5722%22%20%2F%3E%0A%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2212%22%20r%3D%222%22%20fill%3D%22%23FFFFFF%22%20%2F%3E%0A%20%20%3Ccircle%20cx%3D%2236%22%20cy%3D%2212%22%20r%3D%222%22%20fill%3D%22%23FFFFFF%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2230%22%20y%3D%220%22%20width%3D%224%22%20height%3D%228%22%20fill%3D%22%23FF5722%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2226%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%224%22%20fill%3D%22%23FF5722%22%20%2F%3E%0A%20%20%3Crect%20x%3D%228%22%20y%3D%2226%22%20width%3D%228%22%20height%3D%222%22%20fill%3D%22%23FF5722%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2248%22%20y%3D%2226%22%20width%3D%228%22%20height%3D%222%22%20fill%3D%22%23FF5722%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2216%22%20y%3D%2240%22%20width%3D%228%22%20height%3D%222%22%20fill%3D%22%23FF5722%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%228%22%20height%3D%222%22%20fill%3D%22%23FF5722%22%20%2F%3E%0A%3C%2Fsvg%3E"
                            alt="AI Logo"
                        />
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