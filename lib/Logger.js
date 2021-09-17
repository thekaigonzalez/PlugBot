//logger: init logs

module.exports = class {
    constructor(progname) {
        console.log(progname + ": initialized on " + Date.now())
    }
}