
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined");
}
if(!process.env.JWT_EXPIRES_IN){
    throw new Error("JWT_EXPIRES_IN is not defined");
}

if(!process.env.JWT_REFRESH_SECRET){
    throw new Error("JWT_REFRESH_SECRET is not defined");
}

if(!process.env.JWT_REFRESH_EXPIRES_IN){
    throw new Error("JWT_REFRESH_EXPIRES_IN is not defined");
}
export default {
    PORT : process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN : process.env.JWT_REFRESH_EXPIRES_IN

}