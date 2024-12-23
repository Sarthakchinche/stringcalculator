function Add(numbers) {
    if (numbers === "") {
        return 0;
    }
    debugger
    if (numbers.startsWith("//")) {
        let delimLineEnd = numbers.indexOf("\n");
        let delimLine = numbers.slice(2, delimLineEnd);

        let delims = [];
        if (delimLine.startsWith("[")) {
            let endIndex = delimLine.lastIndexOf("]");
            delimLine = delimLine.slice(1, endIndex);
            delims = delimLine.split("][");
        } else {
            // Single delim case
            delims.push(delimLine);
        }

        let numbersPart = numbers.slice(delimLineEnd + 1);

        let regex = new RegExp(delims.map(d => escapeRegExp(d)).join("|"), "g");
        numbersPart = numbersPart.replace(regex, ",");

        return calculateNumbers(numbersPart);
    }

    return calculateNumbers(numbers);
}

function calculateNumbers(numbers) {
    let numberArray = numbers.split(/[\n,]+/);
    
    // for negative numbers and throw an error 
    let negatives = [];
    let sum = 0;
    
    for (let num of numberArray) {
        let number = parseInt(num);
        
        if (number < 0) {
            negatives.push(number);
        } else if (number <= 1000) {
            sum += number;
        }
    }

    if (negatives.length > 0) {
        throw new Error("negatives not allowed: " + negatives.join(", "));
    }

    return sum;
}

function escapeRegExp(str) {
    return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&");
}

module.exports = { Add };

