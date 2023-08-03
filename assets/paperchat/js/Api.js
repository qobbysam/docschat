import axios from "axios";


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

const csrfToken = getCookie('csrftoken');


const axiosInstance = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrfToken,
    },
})




function sendFiles(formData) {
    const csrfToken = getCookie('csrftoken');

    axios.post("/dashboard/upload/", formData, {
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

async function getNewSession(){

    return await axiosInstance.get('/paperchat/api-new-session/')
}

async function getRecentSessions(params){

    return await axiosInstance.get('/paperchat/api-recent-sessions/')
}

async function sendPrompt(promptData) {
    console.log(promptData)
    return await axiosInstance.post('/paperchat/api-send-prompt/',promptData)
}

async function sendSuperPrompt(promptData) {
    console.log(promptData)
    return await axiosInstance.post('/api/send-prompt/',promptData)
}

async function sendPaperPrompt(promptData) {
    console.log(promptData)
    return await axiosInstance.post('/api/send-prompt/',promptData)
}

async function getSessionChatHistory(params_id) {
    const url = `/paperchat/api-chat-history/${params_id}`
    return await axiosInstance.get(url)
}


async function getTopics(params) {

    const url = `/api/topics/?q=${params}`

    return await axiosInstance.get(url)
}


async function getUrl(url) {

    return await axiosInstance.get('', {baseURL: url})
}


export {getNewSession, getRecentSessions, sendPrompt, sendPaperPrompt,getSessionChatHistory, sendSuperPrompt,getTopics, getUrl}