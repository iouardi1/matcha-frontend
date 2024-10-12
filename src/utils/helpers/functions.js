import { axiosInstance } from '@/_axios/instance'

export const removeByAttr = function (arr, attr, value) {
    var i = arr.length
    while (i--) {
        if (
            arr[i] &&
            arr[i].hasOwnProperty(attr) &&
            arguments.length > 2 &&
            arr[i][attr] === value
        ) {
            arr.splice(i, 1)
        }
    }
    return arr
}

export const findByAttr = function (arr, attr, value) {
    var i = arr.length
    while (i--) {
        if (
            arr[i] &&
            arr[i].hasOwnProperty(attr) &&
            arguments.length > 2 &&
            arr[i][attr] === value
        ) {
            return arr[i][attr]
        }
    }
}

export const generateId = function () {
    let result = 'image-'
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < 10) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
        counter += 1
    }
    return result
}

export const getImage = (path) => {
    if (!path) return null;

    if (path.startsWith("http")) {
        return path;
    }

    return `${process.env.BACKEND_LOCAL_DEV}/api/upload?path=${path}`;
};