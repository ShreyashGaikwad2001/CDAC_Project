export const setToken = (token) => sessionStorage.setItem("token", token);
export const getToken = () => sessionStorage.getItem("token");
export const removeToken = () => sessionStorage.removeItem("token");

export const isLoggedIn = () => {
    const token = getToken();
    return token !== null;
};
