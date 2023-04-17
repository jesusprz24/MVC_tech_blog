// code will export object using formate date
module.exports = {
// will return a string in localized format mm/dd/yyyy
    format_date: (date) => {
        return date.toLocaleDateString();
    },
};