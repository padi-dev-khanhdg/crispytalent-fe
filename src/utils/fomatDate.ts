export const formatDateFull = (dateTime: any) => {
    if (dateTime) {
        if (dateTime.split(" ").length - 1 > 0) {
            const date = dateTime.split(" ")[0].split("/").reverse().join('/');
            const time = dateTime.split(" ")[1]
            return `${date} ${time}`
        } else {
            return dateTime.split(" ")[0].split("/").reverse().join('/')
        }

    }
}