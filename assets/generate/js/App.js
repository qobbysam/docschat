import React, { useEffect, useState } from "react";
import { socket } from "../../websocket/js";
import axios from "axios";
import styles from './app.module.css';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const FormElement = ({ handleSubmit }) => {
    const [formData, setFormData] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleLocalSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
        const formD = new FormData();

        formD.append('topic', formData.topicInput)
        formD.append('numsections', formData.sectionsInput)
        formD.append('layers', formData.layersInput)

        handleSubmit(formD)

        setFormData({
            topicInput: '',
            sectionsInput: 0,
            layersInput: 0
        });
    };

    return (

        <div className="my-3">
            <form onSubmit={handleLocalSubmit}>
                <div className="mb-3">
                    <label for="topicInput" className="form-label">What would you like a review on?</label>
                    <input type="text" name="topicInput" value={formData.topicInput} onChange={handleChange} className="form-control" id="topicInput" aria-describedby="topicHelp" required />
                    <div id="topicHelp" className="form-text">Enter a topic.</div>
                </div>

                <div className="mb-3">
                    <label for="sectionsInput" className="form-label">How many sections to generate?</label>
                    <input type="number" onwheel="return false;" name="sectionsInput" value={formData.sectionsInput} onChange={handleChange} className="form-control" id="sectionsInput" aria-describedby="sectionsHelp" required />
                    <div id="sectionsHelp" className="form-text">Enter the number of sections to generate.</div>
                </div>

                <div className="mb-3">
                    <label for="layersInput" className="form-label">How many layers to generate?</label>
                    <input type="number" onwheel="return false;" name="layersInput" value={formData.layersInput} onChange={handleChange} className="form-control" id="layersInput" aria-describedby="layersHelp" required />
                    <div id="layersHelp" className="form-text">A layer is a complexity score that is assigned to each section as it is generated.</div>
                </div>


                <button type="submit" className="btn btn-primary">Generate</button>

            </form>
        </div>
    );
};

const AnimationElement = ({ fileInfo, statusMessage }) => {
    const [minimizeAnimation, setMinimizeAnimation] = useState(true);

    const handleMinimize = () => {
        setMinimizeAnimation(!minimizeAnimation);
    };

    useEffect(() => {

        console.log(fileInfo, statusMessage)
    }, [fileInfo, statusMessage])
    return (
        <div class="accordion" id="accordionPricing">
            <div className="accordion-item" >
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Report Generation Status
                    </button>

                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionPricing">
                    <div className="accordion-body">
                        <div class="table-responsive">
                            <table class="table table-centered table-nowrap mb-0 rounded">
                                <thead class="thead-light">
                                    <tr>
                                        <th class="border-0 rounded-start">#</th>
                                        <th class="border-0">Topic</th>
                                        <th class="border-0">Status</th>
                                        <th class="border-0">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fileInfo.map((info, index) => (
                                        <tr key={index}>
                                            <td>{index}{info.status}</td>
                                            <td>{info.message.location}</td>
                                            <td>{info.message.status}</td>
                                            {info.message.status === 'complete' && <td><a href={`/dashboard/download/report/${info.message.reportid}`}>Download</a></td>}

                                            {info.message.status != 'complete' && <td>
                                                <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            </td>}

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        Report Generation Progress
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionPricing">
                    <div className="accordion-body">

                        <div class="row">
                            <div class="col-12 col-lg-10">
                                <div class="card notification-card border-0 shadow">
                                    <div class="card-header d-flex align-items-center">
                                        <h2 class="fs-5 fw-bold mb-0">Status Update</h2>

                                    </div>
                                    <div class="card-body">
                                        <div class="list-group list-group-flush list-group-timeline">

                                            {
                                                statusMessage.map((info, index) => (
                                                    <>


                                                        {
                                                            info.message.status != 'complete' && (
                                                                <div key={index} class="list-group-item border-0">
                                                                    <div class="row ps-lg-1">
                                                                        <div class="col-auto">
                                                                            <div class="icon-shape icon-xs icon-shape-primary rounded">
                                                                                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col ms-n2 mb-3">
                                                                            <h3 class="fs-6 fw-bold mb-1">{info.message.status}</h3>
                                                                            <p class="mb-1">{info.message.location}</p>
                                                                            <div class="d-flex align-items-center">
                                                                                <svg class="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                                                                                <span class="small"> minutes ago</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            info.message.status === 'complete' && (
                                                                <div key={index} class="list-group-item border-0">
                                                                    <div class="row ps-lg-1">
                                                                        <div class="col-auto">
                                                                            <div class="icon-shape icon-xs icon-shape-purple rounded">
                                                                                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col ms-n2 mb-3">
                                                                            <h3 class="fs-6 fw-bold mb-1">{info.message.status}</h3>
                                                                            <p class="mb-1">{info.message.location}</p>
                                                                            <div class="d-flex align-items-center">
                                                                                <svg class="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                                                                                <span class="small"> minute ago</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                ))
                                            }






                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};


const App = () => {
    const [showAnimation, setShowAnimation] = useState(false);
    const [showUploadError, setShowUploadError] = useState(false);
    const [submitInfo, setSubmitInfo] = useState([]);
    const [statusInfo, setStatusInfo] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    function extractRelevantInfo(data) {

        const submitCopy = [...submitInfo]

        submitCopy.push(data);

        setSubmitInfo(submitCopy);
        console.log(submitCopy)
        setShowAnimation(true);

    }

    const handleProgressEvent = (progressEvent) => {
        console.log("Progress called")

        var progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        console.log(progress)

        setUploadProgress(progress);

    };

    function sendForm(formData) {
        const csrfToken = getCookie('csrftoken');

        axios.post("/dashboard/generate/", formData, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken,
            },
            onUploadProgress: (progressEvent) => {
                handleProgressEvent(progressEvent);
            },
        })
            .then((response) => {
                console.log('Request sent');
                console.log(response);
                //const data = JSON.parse(response.data);
                extractRelevantInfo(response.data);
            })
            .catch((error) => {
                console.error('Error occurred during upload:', error);
                setShowUploadError(true);
            });
    }

    function handleSubmit(formData) {
        //const formData = new FormData();

        // for (let i = 0; i < files.length; i++) {
        //     formData.append('files', files[i]);
        // }
        sendForm(formData);
    }

    function handleComplete(msg) {

        if (msg.message.status === 'complete') {
            const copy_submit = [...submitInfo]

            const foundIndex = copy_submit.findIndex((obj) => obj.message.reportid === msg.message.reportid);

            if (foundIndex !== -1) {
                copy_submit[foundIndex].message.status = msg.message.status;

            } else {
                console.log('not found');
                copy_submit.push(msg)
            }

            setSubmitInfo(copy_submit)
        }
    }

    function handleReceivedMessage(data) {
        console.log('Received message:', data);

        const msg = JSON.parse(data);

        if (msg.type === "report_status_update") {
            const update_msg = JSON.parse(msg.message);
            const statusMessageCopy = Array.from(statusInfo);

            statusMessageCopy.push(update_msg)
            handleComplete(update_msg)
            setStatusInfo(statusMessageCopy);
        }
    }

    useEffect(() => {
        socket.socket.onmessage = (event) => {
            const data = event.data;
            handleReceivedMessage(data);
        };
    }, [submitInfo, statusInfo]);

    return (
        <>
            <FormElement handleSubmit={handleSubmit} />

            <div className="row justify-content-between">

                {uploadProgress > 0 && <p class="text-center my-2 text-success" id="statusText">Starting...</p>}
                {showAnimation && <AnimationElement fileInfo={submitInfo} statusMessage={statusInfo} />}
                {showUploadError && <div>Error Uploading Files</div>}
            </div>

        </>
    );
};

export default App;
