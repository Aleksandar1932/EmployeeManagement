export default function authHeader() {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    if (authorization) {
        return {Authorization: authorization.toString()};
    } else {
        return {};
    }
}