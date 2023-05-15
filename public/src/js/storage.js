function saveFormData(formdata) {
    //localStorage.setItem('formdata', JSON.stringify(formdata));
}

function getFormData() {
    const formData = localStorage.getItem('formdata');
    return formData ? JSON.parse(formData) : null;
}

function clearFormData() {
    localStorage.removeItem('formdata');
}