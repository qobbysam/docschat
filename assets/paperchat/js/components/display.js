import React, { Fragment,useEffect, useRef, useState } from "react"
import { getSessionChatHistory } from "../Api"
import CurrentElement from "./display/currentelement";
import PastElement from "./display/pastelement";

import './display.css';




const CurrentPrompt = ({ currentPrompt, textComplete }) => {

    const [cPrompt, setCurrentPrompt] = useState({})

    useEffect(() => {
        setCurrentPrompt(currentPrompt)
    }, [currentPrompt])
    return (
        <>
            <div></div>
            <CurrentElement cPrompt={cPrompt} textComplete={textComplete}/>

        </>

    )
}

const PastPrompt = ({ pastPrompts }) => {


    return (
        <>
            <div></div>

            {pastPrompts && pastPrompts.map((obj, index) => (
                <Fragment key={index}>
                    <PastElement chat_transaction={obj}/>
                </Fragment>
            ))}
        </>
    )
}

const DisplaySection = ({ session, currentPrompt, destroyCurrent, refreshPast }) => {
    const [pastPrompts, setPastPrompts] = useState([]);
    
    const currentPromptRef = useRef(null);

    const addCurrentToPast = () => {

        setTimeout(() => {
            setPastPrompts(prevPrompts => [...prevPrompts, currentPrompt]);
            destroyCurrent();
            currentPromptRef.current.focus();

        }, 5000)

    };
    const pullPast = async () => {

        try {
            const res = await getSessionChatHistory(session.id);
            setPastPrompts(res.data)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        if (refreshPast) {
            pullPast()
        }
    
    //    currentPromptRef.current.focus();


    }, [refreshPast, session])

    return (
        <>

            <PastPrompt pastPrompts={pastPrompts} />

            <CurrentPrompt   currentPromptRef={currentPromptRef} currentPrompt={currentPrompt} textComplete={addCurrentToPast} />
        </>
    )
}

export default DisplaySection