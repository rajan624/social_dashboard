const DEBUG = process.env.DEBUG;
console.log("🚀 ~ file: Logger.js:4 ~ DEBUG:", DEBUG)
const log = ({params }) => {
    if (DEBUG) {
        console.log(params);
    }
}
const info = ({...params}) => {
    if (DEBUG) {
        console.info(params);
    }
}
const warn = ({...params}) => {
    if (DEBUG) {
        console.warn(params);
    }
}
const error = ({...params}) => {
    if (DEBUG) {
        console.error(params);
    }
}


module.exports = {
    log , info , warn , error
}