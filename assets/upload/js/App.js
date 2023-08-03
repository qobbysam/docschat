import React, { useEffect, useState } from "react";
import { socket } from "../../websocket/js";
import axios from "axios";
import { Document, Page, pdfjs } from 'react-pdf';

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

const TableRow = ({ data, openModal, handleDelete }) => {
    return (
        <>
            <tr>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.status}</td>
                <td>
                    <button className="btn btn-link" onClick={() => openModal(data.file)}>
                        <i className="bi bi-file-earmark-pdf"></i> View PDF
                    </button>
                    <button class="btn btn-primary" onClick={() => handleDelete(data.id)}>Delete</button>

                </td>
            </tr>
        </>
    );
};

const PdfModal = ({ pdfUrl, closeModal, showModal }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const handleCloseModal = () => {
        closeModal();
    };



    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    useEffect(() => {
        const url = pdfUrl

        pdfjs.GlobalWorkerOptions.workerSrc =
            `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


        /*To Prevent right click on screen*/
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

        /*When document gets loaded successfully*/






    }, [pdfUrl])

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">PDF Preview</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">

                       
                        <div className="row">
                            <div className="col">
                                <Document
                                    file={pdfUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                            </div>


                        </div>
                        </div>

                        <div className="modal-footer">
                                <div className="mT-30">
                                    <div className="pagec">
                                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                                    </div>
                                    <div className="buttonc">
                                        <button
                                            type="button"
                                            disabled={pageNumber <= 1}
                                            onClick={previousPage}
                                            className="Pre"

                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            disabled={pageNumber >= numPages}
                                            onClick={nextPage}

                                        >
                                            Next
                                        </button>
                                    </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};
const UploadElement = ({ handleUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileType, setFileType] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);
        setError('');
    };

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
        setError('');
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (selectedFiles.length === 0 || !fileType) {
            setError('Please select at least one PDF file and a file type.');
        } else {
            // Proceed with form submission or file upload
            console.log(selectedFiles);
            console.log(fileType);
            handleUpload(selectedFiles, fileType)
            setTimeout(() => { setSelectedFiles([]) }, 3000)

            setError(''); // Clear the error message after successful submission
        }
    };


    return (

        <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
                <label htmlFor="fileInput" className="form-label">
                    Select PDF files (multiple files allowed)
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="fileTypeSelect" className="form-label">
                    Select file type
                </label>
                <select
                    className="form-select"
                    id="fileTypeSelect"
                    value={fileType}
                    onChange={handleFileTypeChange}
                >
                    <option value="">Select a file type</option>
                    <option value="SCIENCE">Science</option>
                    <option value="LAW">Law</option>
                </select>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                    Upload Files
                </button>
                {error && <div className="alert alert-danger my-2">{error}</div>}

            </div>

        </form>
    );
};


const AnimationElement = ({ relevantInfo }) => {
    const [minimizeAnimation, setMinimizeAnimation] = useState(true);

    const handleMinimize = () => {
        setMinimizeAnimation(!minimizeAnimation);
    };

    return (
        <div className="accordion" id="accordionPricing">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        View File Progres
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionPricing">
                    <div className="accordion-body">
                        {relevantInfo.map((info) => (
                            <div key={info.fileid}>
                                {info.status === 'processing' &&
                                    <div>
                                        <p> Name: {info.name} <span className="text-info">Status: {info.status}</span></p>
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>

                                }

                                {info.status === 'complete' &&
                                    <div>

                                        <p> Name: {info.name} <span className="text-success">Status: {info.status}</span></p>

                                    </div>

                                }

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    );
};


const UploadsTable = () => {

    const [nexturl, setNexturl] = useState(null);
    const [previousurl, setPreviousurl] = useState(null);
    const [pdfList, setPdfList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');

    const openModal = (pdfUrl) => {
        setShowModal(true);
        setPdfUrl(pdfUrl);
    };

    const closeModal = () => {
        setShowModal(false);
        setPdfUrl('');
    };
    const handleDelete = (id) => {

    }



    useEffect(() => {
        searchPdf("")
    }, [])


    const handlePdfs = (pdflist) => {

        // setPdfList(prevlist => [...prevlist, pdfList]);
        if (pdflist.next) {
            setNexturl(pdflist.next);
        }
        if (pdflist.previous) {
            setPreviousurl(pdflist.previous);
        }
        setPdfList(pdflist.results);
    }
    const searchPdf = (query) => {
        const url = "/api/search-pdf/";

        const csrfToken = getCookie('csrftoken'); // Replace this with your actual CSRF token

        axios.get(url, {
            params: {
                q: query,
            },
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken,
            },

        })
            .then(response => {
                // Handle the response data here
                console.log(response.data);
                handlePdfs(response.data)
            })
            .catch(error => {
                // Handle any errors here
                console.error(error);
            });
    }
    return (
        <>
            <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0 table-sm rounded">
                    <thead class="thead-light">
                        <tr>
                            <th class="border-0 rounded-start">#</th>
                            <th class="border-0">Title</th>
                            <th class="border-0">Status</th>
                            <th class="border-0">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {pdfList && pdfList.length > 0 && pdfList.map((obj, index) => (
                            <>
                                <TableRow key={index} data={obj} openModal={openModal} handleDelete={handleDelete} />
                            </>
                        ))}

                        {pdfList && pdfList.length <= 0 && (<p>No uploads yet...</p>)}



                    </tbody>
                </table>
                <PdfModal pdfUrl={pdfUrl} closeModal={closeModal} showModal={showModal} />

                <div class="row justify-content-center ">
                    <div class="col-12">
                        <div class="pagination text-center">
                            <span class="step-links">

                                {previousurl && (
                                    <>
                                        <a href="?page={{ page_obj.previous_page_number }}">previous</a>

                                    </>)}


                                {nexturl && (
                                    <a href="?page={{ page_obj.next_page_number }}">next</a>

                                )}

                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

const App = () => {
    const [showAnimation, setShowAnimation] = useState(false);
    const [showUploadError, setShowUploadError] = useState(false);
    const [relevantInfo, setRelevantInfo] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    function extractRelevantInfo(data) {
        if (data.length > 0) {
            console.log(data)

            setRelevantInfo(Array.from(data));
            setShowAnimation(true);
        }
    }

    const handleProgressEvent = (progressEvent) => {
        console.log("Progress called")

        var progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        console.log(progress)

        setUploadProgress(progress);

    };

    function sendFiles(formData) {
        const csrfToken = getCookie('csrftoken');

        axios.post("/api/upload/", formData, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken,
            },
            onUploadProgress: (progressEvent) => {
                handleProgressEvent(progressEvent);
            },
        })
            .then((response) => {
                console.log('Upload complete');
                console.log(response);
                const data = JSON.parse(response.data.data);
                extractRelevantInfo(data);
            })
            .catch((error) => {
                console.error('Error occurred during upload:', error);
                setShowUploadError(true);
            });
    }

    function handleUpload(files, filetype) {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('filetype', filetype)
        sendFiles(formData);
    }

    function handleReceivedMessage(data) {
        console.log('Received message:', data);

        const msg = JSON.parse(data);

        if (msg.type === "file_upload_update") {
            const update_msg = JSON.parse(msg.message);
            const relevantInfoCopy = Array.from(relevantInfo);

            console.log("relevantcopy", relevantInfoCopy)
            console.log(update_msg)
            const foundIndex = relevantInfoCopy.findIndex((obj) => obj.fileid === update_msg.fileid);

            if (foundIndex !== -1) {
                relevantInfoCopy[foundIndex].status = update_msg.status;
            } else {
                console.log('not found');
            }

            setRelevantInfo(relevantInfoCopy);
        }
    }

    useEffect(() => {
        socket.socket.onmessage = (event) => {
            const data = event.data;
            handleReceivedMessage(data);
        };
    }, [relevantInfo]);

    return (
        <>
            <div className="row gap-20 masonry pos-r">
                <div class="masonry-sizer col-md-8 col-lg-10"></div>
                <div class="masonry-item col-md-8 col-lg-10">
                    <div class="bgc-white p-20 bd">
                        <h6 class="c-grey-900">Upload Form</h6>
                        <div class="mT-30">
                            <UploadElement handleUpload={handleUpload} />

                        </div>
                    </div>
                </div>

                <div class="masonry-item col-md-6 col-lg-10">
                    <div class="bgc-white p-20 bd">
                        <div class="mT-30">
                            <div className="row justify-content-between">

                                {uploadProgress > 0 && <p class="text-center my-2 text-success" id="statusText">Uploading... {uploadProgress.toFixed(2)}%</p>}
                                {showAnimation && <AnimationElement relevantInfo={relevantInfo} />}
                                {showUploadError && <div>Error Uploading Files</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="masonry-item col-md-6 col-lg-10">
                    <div class="bgc-white p-20 bd">
                        <div class="mT-30">
                            <UploadsTable />

                        </div>
                    </div>
                </div>


            </div>




        </>
    );
};

export default App;
