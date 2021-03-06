const CONTENTWORDS = ["akesi","alasa","anpa","ante","awen","esun","ijo","ike","ilo","insa","jaki","jan","jelo","kala","kalama","kama","kasi","kili","kiwen","ko","kon","kule","kulupu","kute","lape","laso","lawa","len","lete","lili","linja","lipu","loje","lon","luka","lukin","oko","lupa","ma","mama","mani","meli","mi","mije","moku","moli","monsi","mun","musi","mute","namako","nanpa","nasa","nasin","nena","ni","nimi","noka","olin","ona","open","pakala","pali","palisa","pan","pana","pilin","pimeja","pini","pipi","poka","poki","pona","pu","sama","seli","selo","seme","sewi","sijelo","sike","sina","sinpin","sitelen","sona","soweli","suli","suno","supa","suwi","telo","tenpo","toki","tomo","tu","unpa","uta","utala","walo","wan","waso","wawa","weka"];
const CONTENTWORDSLENGTH = CONTENTWORDS.length;

const TWO_LA_CHANCE = 0.25;
const THREE_LA_CHANCE = TWO_LA_CHANCE / 4;
const TWO_MODIFIER_CHANCE = 0.1;
const THREE_MODIFIER_CHANCE = 0.03;
const PI_CHANCE = 0.5;
const NO_E_CHANCE = 0.5;

//W1 W2 W3 li W4 W5 W6 e W7 W8 W9
function makeNewSentence() 
{
    let output = "";

    let la;
    const laChance = Math.random();
    if (laChance < TWO_LA_CHANCE)
    {
        la = 2;
    }else if (laChance < THREE_LA_CHANCE)
    {
        la = 3;
    }else {
        la = 1;
    }

    //each "round" is a sentence segment after each "la"
    for (let rounds = 0; rounds < la; rounds++)
    {
        let parts = ["", "", ""];
        for (let words = 0; words < 3; words++)
        {
            const chaos = Math.random();
            parts[words] = getRandomContentWord();
            if (chaos < THREE_MODIFIER_CHANCE && Math.random() < PI_CHANCE)
            {
                parts[words] += " pi ";
            }

            if (chaos < TWO_MODIFIER_CHANCE)
            {
                parts[words] += " " + getRandomContentWord();
            }

            if (chaos < THREE_MODIFIER_CHANCE)
            {
                parts[words] += " " + getRandomContentWord();
            }
        }

        //mi and sina as the only subject are not followed by li
        if (!(parts[0] === "mi" || parts[0] === "sina"))
        {
            parts[0] += " li ";
        }else {
            parts[0] += " ";
        }


        output += parts[0] + parts[1] + " e " + parts[2];

        //There's a chance of there being no "e" part
        if (Math.random() < NO_E_CHANCE)
        {
            output = output.split(" e ")[0];
        }

        if (rounds < la - 1)
        {
            output += " la ";
        }
    }

    document.getElementById("sentence").innerHTML = output;
}

function getRandomContentWord()
{
    const randomIndex = Math.floor(Math.random() * (CONTENTWORDSLENGTH - 1));
    return CONTENTWORDS[randomIndex];
}