//handle(string)
// returns: 1,2 positional array & string
module.exports = function (string, arrayonly) {
    
    let arg = string.slice(1).split(/ +/);
    let cmd = arg.shift();
    if (arrayonly) {
        return arg
    } else {
        return cmd
    }
    return arg,cmd;
}