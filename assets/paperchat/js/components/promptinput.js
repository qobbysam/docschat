

import React, { useEffect, useState } from "react"

import FreePromptBuilder from './prompt/freeprompt'
import PaperPrompt from "./prompt/paperprompt"

const availablemodes = [{
    id: 1,
    text: "free"
},

{ id: 2, text: "paperchat" }
]





const PromptInput = ({ session, handlePrompt, chatstate }) => {

    const [selectedMode, setSelectedMode] = useState('2');

    const [availableoptions, setAvailableoptions] = useState([]);

    const handleChange = (event) => {
        setSelectedMode(event.target.value);
    };

    const handlePaperPrompt = (promptData) => {

        //const prompt = ""

        handlePrompt(promptData)
    }

    useEffect(() => {
        if (session.mode === 'free') {
            setAvailableoptions([{
                id: 1,
                text: "free"
            }])

        }

        else if (session.mode === 'paper') {
            setAvailableoptions([{ id: 2, text: "paperchat" }
            ])

        }

        else {
            setAvailableoptions(availablemodes)
        }
    }, [session])


    return (
        <>
            <div className="layer w-100">

                <div className="p-20 bdT bgc-white">
                    <div className="row">
                        <div className="col">
                            <div>Choose Query Builder</div>
                            {availableoptions.map((option) => (
                                <label key={option.id}>
                                    <input
                                        type="radio"
                                        name="option"
                                        value={option.id.toString()} // Convert to string
                                        checked={selectedMode === option.id.toString()} // Convert to string

                                        onChange={handleChange}
                                    />
                                    {option.text}
                                </label>
                            ))}
                        </div>
                    </div>
                    {selectedMode === "1" && (
                        <>
                            <FreePromptBuilder session={session} handlePrompt={handlePrompt} chatstate={chatstate} />
                        </>
                    )}
                    {selectedMode === "2" && (
                        <>
                            <PaperPrompt session={session} handlePaperPrompt={handlePaperPrompt} chatstate={chatstate}/>
                        </>
                    )}
                    {/* <div className="pos-r">
                        <input type="text" className="form-control bdrs-10em m-0" placeholder="Say something..." />
                        <button type="button" className="btn btn-primary bdrs-50p w-2r p-0 h-2r pos-a r-1 t-1 btn-color">
                            <i className="fa fa-paper-plane-o"></i>
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    )

    // return (
    //     <>

    //         <div className="row">
    //             <div className="col">
    //                 <div>
    // <div>Choose Query Builder</div>
    // {availableoptions.map((option) => (
    //     <label key={option.id}>
    //         <input
    //             type="radio"
    //             name="option"
    //             value={option.id.toString()} // Convert to string
    //             checked={selectedMode === option.id.toString()} // Convert to string

    //             onChange={handleChange}
    //         />
    //         {option.text}
    //     </label>
    // ))}
    //                 </div>
    //             </div>
    //         </div>




    // {selectedMode === "1" && (
    //     <>
    //         <FreePromptBuilder session={session} handlePrompt={handlePrompt} />
    //     </>
    // )}

    // {selectedMode === "2" && (
    //     <>
    //         <PaperPrompt session={session} handlePaperPrompt={handlePaperPrompt} />
    //     </>
    // )}
    //     </>
    // )
}

export default PromptInput;