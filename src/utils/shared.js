import printJS from "print-js";
export function sortDate(data, dateField) {
    return data.sort(sortDateComprator(dateField));
}
export function sortDateComprator(dateField) {
    return (first, second) => {
        const firstDate = first[dateField];
        const secondDate = second[dateField];
        if (firstDate == null) {
            return -1;
        }
        if (secondDate == null) {
            return 1;
        }
        const firstArr = firstDate.split("/");
        const secondArr = secondDate.split("/");
        const yearsDiff = +firstArr[0] - +secondArr[0];
        if (yearsDiff !== 0) {
            return yearsDiff;
        }
        const monthDiff = +firstArr[1] - +secondArr[1];
        if (monthDiff !== 0) {
            return monthDiff;
        }
        return +firstArr[2] - +secondArr[2];
    };
}
export function replacePersianArabicsNumbers(value) {
    if (value === null || value === undefined) {
        return value;
    }
    const persianCharCodeZero = "۰".charCodeAt(0);
    value = value.toString();
    value = value.replace(/[\u06f0-\u06f9]/g, (w) => {
        //[0-9] persian
        return (w.charCodeAt(0) - persianCharCodeZero).toString();
    });
    const arabicCharCodeZero = "٠".charCodeAt(0); //it look same as persian zero but nicode is different
    value = value.replace(/[\u0660-\u0669]/g, (w) => {
        // [0-9] arabic
        return (w.charCodeAt(0) - arabicCharCodeZero).toString();
    });
    return value;
}
export const persianCharRange = [
    "[\u06A9\u06AF\u06C0\u06CC\u060C",
    "\u067E\u0670\u0686\u0698",
    "\u0621-\u063A\u0641-\u0654]",
].join("");
export const Regexes = {
    mobile: /(\+98|0|0098)9\d{9}$/,
    // eslint-disable-next-line no-misleading-character-class
    persianName: 
    // eslint-disable-next-line no-misleading-character-class
    /^([\u06A9\u06AF\u06C0\u06CC\u060C\u067E\u0670\u0686\u0698\u0621-\u063A\u0641-\u0654]+[\s\u200C]?)+$/,
    password: /^(?=.*\d)(?=.*[A-Za-z])[\dA-Za-z!@#$%^&*\-()+=]{6,}$/,
    username: /^[\da-zA-z]*$/,
};
export function printResponse(fileName, response) {
    const url = URL.createObjectURL(response);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.pdf`;
    printJS({ printable: url, documentTitle: "test.pdf" });
    URL.revokeObjectURL(url);
}
