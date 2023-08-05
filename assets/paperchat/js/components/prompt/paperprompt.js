
import React, { useEffect, useState } from "react";

import { getTopics, getUrl, sendPaperPrompt } from "../../Api";


const SearchComponent = ({ setValues, handleLoading }) => {
    const [searchinput, setSearchinput] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()

        handleLoading(true)

        try {

           var  search_string = `title:${searchinput}`
            const res = await getTopics(search_string)

            console.log(res.data)
            setValues(res)
            handleLoading(false)
        } catch (error) {
            handleLoading(false)
        }

    }
    const handleChange = (event) => {
        setSearchinput(event.target.value);
    };
    return (
            <div className="row">
                <div className="col-lg-6 col-md-6">
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between">
                    <input className="form-control" type="text" value={searchinput} onChange={handleChange} />
                    <input type="submit" className="btn btn-primary" value="search" />
                </div>

            </form>
            </div>
            </div>
    )
}


const MultiSelect = ({ options, onChange, selectedOptions, setSelectedOptions }) => {

    const handleCheckboxChange = (option) => {
        const isSelected = selectedOptions.find((selectedOption) => selectedOption.id === option.id);

        if (isSelected) {
            const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption.id !== option.id);
            setSelectedOptions(updatedOptions);
        } else {
            const updatedOptions = [...selectedOptions, option];
            setSelectedOptions(updatedOptions);
        }
    };

    React.useEffect(() => {
        onChange(selectedOptions);
    }, [selectedOptions, onChange]);

    return (
        <div>
            {options.filter((option) => (option.title?.trim() || '') !== "").map((option) => (

                <div key={option.id}>
                    <input
                        type="checkbox"
                        id={option.id}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                    <label className="label small" htmlFor={option.id}>{option.title}</label>
                </div>

            ))}
        </div>
    );
};

const PaperPromptBuilder = ({ session, handlePaperPrompt, selectedElements, cansend }) => {
    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const resolveSucess = (resdata) => {
        console.log(resdata);
        handlePaperPrompt(resdata);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        var promptData = {
            prompt: formData.textInput,
            session: session.id,
            mode: "paper",
            selected: selectedElements,
            extra: {chattype: chatstate.name}
        }
        console.log(promptData)
        try {
            const res = await sendPaperPrompt(promptData)
            resolveSucess(res.data)
            setFormData({ textInput: '' })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!cansend) {
            setLoading(true)
        } else {
            setLoading(false)
        }

    }, [cansend])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input id="textInput" disabled={loading} type="text" className="form-control bdrs-10em m-0" placeholder="Ask somethin in paper mode" name="textInput" value={formData.textInput} onChange={handleChange} required />
                <button id="submit" disabled={loading} type="submit" className="btn btn-primary bdrs-50p w-2r p-0 h-2r pos-a r-1 t-1 btn-color" value="Send" >
                    <i className="fa fa-paper-plane-o"></i>
                </button>


            </form>
        </>
    )
}

const SelectedLoader = ({ session }) => {
    const [selectedinfo, setSelectedInfo] = useState([]);
    useEffect(() => {

        if (session.selected != null || session.selected != "") {

            const selected = JSON.parse(session.selected)

            setSelectedInfo(selected)
        }
    }, [session])

    return (
        <>
            <h2>Chatting about these pappers</h2>
            {selectedinfo && selectedinfo.length > 0 && (
                selectedinfo.map((v) => (<>
                    <div className="small">
                        <p>{v.id}</p>
                        <p>{v.title}</p>
                    </div>
                </>))
            )}
        </>
    )

}
const PaperPrompt = ({ session, handlePaperPrompt, chatstate }) => {

    const [dataElements, setDataElement] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedElements, setSelectedElements] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showLoaded, setShowloaded] = useState(false);
    const [cansend, setCansend] = useState(false);
    const [nexturl, setNexturl] = useState("");
    const [prevurl, setPrevurl] = useState("");


    const setValues = (values) => {
        handleResponse(values)
        //setDataElement(values)
    }
    // const handleCheckboxChange = (event) => {
    //     const { value, checked } = event.target;

    //     if (checked) {
    //         setSelectedElements((prevSelectedElements) => [...prevSelectedElements, value]);
    //     } else {
    //         setSelectedElements((prevSelectedElements) => prevSelectedElements.filter((element) => element !== value));
    //     }
    //     console.log(selectedElements)
    // };

    const setup = async () => {
        const params = ""
        setLoading(true);
        try {
            const res = await getTopics(params);
            console.log(res);
            handleResponse(res);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleResponse = (res) => {
        setNexturl(res.data.next);
        setPrevurl(res.data.previous);
        setDataElement(res.data.results);
    }
    const handleNext = async () => {
        setLoading(true);
        try {
            const res = await getUrl(nexturl)
            handleResponse(res);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handlePrev = async () => {
        try {
            const res = await getUrl(prevurl);
            handleResponse(res);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSelectionChange = (selectedOptions) => {
        console.log(selectedOptions);
        // Perform any additional logic here with the selected options
        setSelectedElements(selectedOptions)
    };

    const handleLoading = (value) => {
        setLoading(value)
    }
    useEffect(() => {
        setup();

    }, [])

    useEffect(() => {

        if (session.mode === 'paper' && session.selected) {

            if (session.selected != "") {

                setShowloaded(true)
                const selected_el = JSON.parse(session.selected)
                setSelectedElements(selected_el)
            }
        }
        if (!session.locked && selectedElements.length > 0) {
            setCansend(true)
        } else {
            setCansend(false)
        }

    }, [session, selectedElements])
    return (
        <>

            <div className="pos-r">


                {!showLoaded && (<div className="row my-1">
                    <div className="col">
                        <SearchComponent setValues={setValues} handleLoading={handleLoading} />
                    </div>
                </div>)}

                {!showLoaded && (<div className="row my-1">
                    <div className="col">
                        <div className="d-flex justify-content-between">
                            {prevurl && <button onClick={handlePrev}>Previous</button>}
                            {nexturl && <button onClick={handleNext}>Next</button>}

                        </div>

                    </div>
                </div>)}
                {loading && (<div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>)}

                {!showLoaded && !loading && (<div className="row my-1">
                    <div className="col">
                        <div className="checkbox-component">
                            <MultiSelect options={dataElements} onChange={handleSelectionChange} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                        </div>

                    </div>

                </div>)}

                {showLoaded && (<SelectedLoader session={session} />)}


                <div className="row">
                    <div className="col">
                        <PaperPromptBuilder session={session} handlePaperPrompt={handlePaperPrompt} selectedElements={selectedElements} cansend={cansend} />
                    </div>
                </div>
            </div>
        </>

    );


}




export default PaperPrompt;