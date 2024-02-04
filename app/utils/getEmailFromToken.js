export function getEmailFromToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.email;
    } catch (error) {
        console.error(error);
        return null;
    }
}