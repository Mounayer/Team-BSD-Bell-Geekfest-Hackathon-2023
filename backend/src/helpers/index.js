


module.exports.getFileExtension = function getFileExtension(filename) {
    const parts = filename.split('.');
    if (parts.length > 1) {
        return parts.pop();
    } else {
        return null; // or return an empty string or a default value if you prefer
    }
}
