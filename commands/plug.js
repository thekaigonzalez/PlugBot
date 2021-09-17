const fs = require("node:fs")
const tar = require('tar')
const https = require('https')

function download(url, out) {
    const file = fs.createWriteStream(out);
    const request = https.get(url, function(response) {
    response.pipe(file);
    });
}

function loadsrc() {
    let rawdata = fs.readFileSync('sources.json');
    let sources = JSON.parse(rawdata);
    return sources
}

const REPO_URL = loadsrc()["default"]
console.log("Default SOURCES: " + REPO_URL)
module.exports = {
    basic(scl, msgobj, argv) {
        if (argv[0] == "help") {
            msgobj.channel.send("Welcome to PLUG!\nThe default repo url is \nYou can use the following commands to install, remove, or change sources.")
            msgobj.channel.send("`plug install <package>`")
            msgobj.channel.send("`plug remove <package>`")
        } else if (argv[0] == "install") {
            let pck = argv[1];
            download(REPO_URL + pck + ".tar.gz", "./cmd.tar.gz");
            tar.extract({cwd: "./cmd"}, "./cmd.tar.gz")
        }
    }
}