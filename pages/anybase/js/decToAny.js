const DEC_IN = document.querySelector("#decimal-in");
const BASE_FROM = document.querySelector("#base-from");
const BASE_TO = document.querySelector("#base-to");
const OUT = document.querySelector("#result");
const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_DECIMAL = 100;

//TODO base to base conversion doesn't work when first base uses symbols over 9

function doConversion()
{
    let numberString = DEC_IN.value.toUpperCase();
    DEC_IN.value = numberString;
    let isNegative = false;
    if (numberString.substr(0,1) == "-")
    {
        isNegative = true;
        numberString = numberString.substr(1, numberString.length - 1);
    }
    const splitString = numberString.split(".");
    const intString = splitString[0];
    let integer = parseInt(intString);

    const baseFromString = validateBase(BASE_FROM);
    BASE_FROM.value = baseFromString;
    const baseFrom = parseInt(baseFromString);

    const baseString = validateBase(BASE_TO);
    BASE_TO.value = baseString;
    const base = parseInt(baseString);

    let result = "";

    if (baseFrom != 10)
    {
        let toDecString = intString;
        if (splitString.length > 1)
        {
            toDecString += "." + splitString[1];
        }

        const decNum = anyToDec(toDecString, baseFrom);
        const decNumSplit = decNum.split(".");
        result += decToAnyInt(parseInt(decNumSplit[0]), base);
        if (decNumSplit.length > 1)
        {
            result += "." + decToAnyFrac("." + parseFloat(decNumSplit[1]), base, MAX_DECIMAL);
        }

    }else {

        result += decToAnyInt(integer, base);

        if (splitString.length > 1)
        {
            result += "." + decToAnyFrac(parseFloat("." + splitString[1]), base, MAX_DECIMAL);
        }
    }

    if (isNegative)
    {
        result = "-" + result;
    }

    OUT.innerHTML = result;
}

function decToAnyInt(integer, base)
{    

    result = "";
    while (integer > 0)
    {
        result = ALPHABET[integer % base] + result;
        integer = Math.floor(integer / base);
    }

    return result;
    
}

function decToAnyFrac(frac, base, max)
{
    if (frac >= 1)
    {
        return "0";
    }
    let result = "";
    let iterations = 0;
    while (iterations < max && frac > 0)
    {
        frac *= base;
        result += ALPHABET[Math.floor(frac)];
        frac = frac - Math.floor(frac);
        iterations++;
    }

    if (iterations >= max)
    {
        result += "...";
    }

    return result;
}

function anyToDec(numberString, base)
{
    const numParts = numberString.split(".");
    let result = 0;
    for (let i = 0; i < numParts[0].length; i++)
    {
        const digit = ALPHABET.indexOf(numParts[0].charAt(i));
        if (digit >= base)
        {
            return "ERR";
        }
        result += Math.pow(base, numParts[0].length - i -1) * digit;
    }

    if (numParts.length > 1)
    {
        for (let i = 0; i < numParts[1].length; i++)
        {
            const digit = ALPHABET.indexOf(numParts[1].charAt(i));
            if (digit >= base)
            {
                return "ERR";
            }
            result += Math.pow(base, -i-1) * digit;
        }
    }

    return result.toString();
}

function validateBase(element)
{
    let baseString = element.value;
    baseString = baseString.split(".")[0];
    if (parseInt(baseString) < 2)
    {
        baseString = "2";
    }else if (parseInt(baseString) > 36)
    {
        baseString = "36";
    }

    return baseString;
}

function reverse()
{
    const tempDecIn = DEC_IN.value;
    const tempBaseIn = BASE_FROM.value;
    BASE_FROM.value = BASE_TO.value;
    DEC_IN.value = OUT.innerHTML;
    BASE_TO.value = tempBaseIn;
    OUT.innerHTML = tempDecIn;
    doConversion();
}