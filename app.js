const express = require('express');
const dotenv = require('dotenv');
const swaggerConfig = require('./src/config/swagger.config');
const mainRouter = require('./src/app.routes');
const cookieParser = require('cookie-parser');
const NotFoundHandler = require('./src/common/excpetions/not-found.handler');
const AllExceptionHandler = require('./src/common/excpetions/all-exception.handler');
dotenv.config();

async function main(){
    const app = express();
    const PORT = process.env.PORT;
    require('./src/config/mongoose.config');
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    app.use(mainRouter);
    swaggerConfig(app);
    NotFoundHandler(app);
    AllExceptionHandler(app);
    
    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}`);
    })
}

main();