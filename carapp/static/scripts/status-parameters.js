function updateStatus(message, status) {
    const statusElement = $('#status');
    statusElement.html(message);
    statusElement.attr('class', 'status-' + status);
}

function hideStatus() {
    const statusElement = $('#status');
    statusElement.html('');
}

function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
