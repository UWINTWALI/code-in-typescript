"use strict";
let formState = {
    email: "",
    password: "",
};
function handleFormChange(formState, field, value) {
    return Object.assign(Object.assign({}, formState), { [field]: value });
}
window.updateFormState = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    formState = handleFormChange(formState, "email", email);
    formState = handleFormChange(formState, "password", password);
    document.getElementById("output").textContent = JSON.stringify(formState, null, 2);
};
