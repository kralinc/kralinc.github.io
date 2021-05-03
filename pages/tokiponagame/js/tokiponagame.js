const CONTENTWORDS = ["akesi","alasa","anpa","ante","awen","esun","ijo","ike","ilo","insa","jaki","jan","jelo","kala","kalama","kama","kasi","kili","kiwen","ko","kon","kule","kulupu","kute","lape","laso","lawa","len","lete","li","lili","linja","lipu","loje","lon","luka","lukin","oko","lupa","ma","mama","mani","meli","mi","mije","moku","moli","monsi","mun","musi","mute","namako","nanpa","nasa","nasin","nena","ni","nimi","noka","olin","ona","open","pakala","pali","palisa","pan","pana","pilin","pimeja","pini","pipi","poka","poki","pona","pu","sama","seli","selo","seme","sewi","sijelo","sike","sina","sinpin","sitelen","sona","soweli","suli","suno","supa","suwi","telo","tenpo","toki","tomo","tu","unpa","uta","utala","walo","wan","waso","wawa","weka"];
const CONTENTWORDSLENGTH = CONTENTWORDS.length;

//W1 W2 W3 li W4 W5 W6 e W7 W8 W9
function makeNewSentence() 
{
    let output = "";

    const la = 1;

    //each "round" is a sentence segment after each "la"
    for (let rounds = 0; rounds < la; rounds++)
    {
        let parts = ["", "", ""];
        for (let words = 0; words < 3; words++)
        {
            const chaos = Math.random();
            parts[words] = getRandomContentWord();
            if (chaos < 0.1)
            {
                parts[words] += " " + getRandomContentWord();
            }

            if (chaos < 0.01)
            {
                parts[words] += " " + getRandomContentWord();
            }
        }

        output = parts[0] + " li " + parts[1] + " e " + parts[2];
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