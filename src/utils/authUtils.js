export function getAuthDataFromLocal() {
    const authDataJson = localStorage.getItem('authData');
    if (!authDataJson) {
        return null;
    }
    const authData = JSON.parse(authDataJson);
    return authData;
}
export function updateAuthDataInLocal(updatedData) {
    let authData = getAuthDataFromLocal();
    if (authData) {
        authData = { ...authData, ...updatedData };
        setAuthDataInLocal(authData);
    }
}
export function setAuthDataInLocal(authData) {
    localStorage.setItem('authData', JSON.stringify(authData));
}
export function removeAuthDataFromLocal() {
    localStorage.removeItem('authData');
}
