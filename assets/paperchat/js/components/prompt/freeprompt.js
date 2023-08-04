import React, { useState } from "react";
import { sendSuperPrompt } from "../../Api";

const FreePromptBuilder = ({ session, handlePrompt, chatstate }) => {
    const [formData, setFormData] = useState([])
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const resolveSucess = (resdata) => {
        console.log(resdata)
        handlePrompt(resdata)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        var promptData = {
            prompt: formData.textInput,
            session: session.id,
            mode: "free",
            selected: [],
            extra: {chattype: chatstate.name}
        }
        console.log(promptData)
        try {
            const res = await sendSuperPrompt(promptData)
            resolveSucess(res.data)
            setFormData({ textInput: '' })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            {/* {session && !session.locked && (<>Running Query ...</>)} */}
            <div className="pos-r">
                <form onSubmit={handleSubmit}>
                    <input type="text" id="textInput" disabled={session.locked} className="form-control bdrs-10em m-0" placeholder="Ask a question in free mode" name="textInput" value={formData.textInput} onChange={handleChange} required />
                    <button id="submit" disabled={session.locked} type="submit" className="btn btn-primary bdrs-50p w-2r p-0 h-2r pos-a r-1 t-1 btn-color" value="Send">
                        <i className="fa fa-paper-plane-o"></i>
                    </button>
                </form>
            </div>

        </>
    )
}


export default FreePromptBuilder