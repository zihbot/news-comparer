export class TrigramIndex {
    phrases = new Array<string>();
    trigramIndex = new Map<string, number[]>();
    log = new Array<object>();

    constructor(inputPhrases: string[]) {
        for (const phrase of inputPhrases) {
            this.index(phrase);
        }
    }

    asTrigrams(phrase: string, callback: (s: string) => void) {
        const rawData = "  ".concat(phrase, "  ");
        for (let i = rawData.length - 3; i >= 0; i = i - 1)
            callback(rawData.slice(i, i + 3));
    };

    index(phrase: string) {
        if (!phrase || phrase === "" || this.phrases.indexOf(phrase) >= 0) return;
        const phraseIndex = this.phrases.push(phrase) - 1;
        this.asTrigrams(phrase, (trigram: string) => {
            let phrasesForTrigram = this.trigramIndex.get(trigram);
            if (!phrasesForTrigram) phrasesForTrigram = [];
            if (phrasesForTrigram.indexOf(phraseIndex) < 0) phrasesForTrigram.push(phraseIndex);
            this.trigramIndex.set(trigram, phrasesForTrigram);
        });
    }
    find(phrase: string) {
        const phraseMatches = new Array<number>();
        let trigramsInPhrase = 0;
        this.asTrigrams(phrase, (trigram: string) => {
            const phrasesForTrigram = this.trigramIndex.get(trigram);
            trigramsInPhrase += 1;
            if (phrasesForTrigram)
                for (const j of phrasesForTrigram) {
                    if (!phraseMatches[j]) phraseMatches[j] = 0;
                    phraseMatches[j] += 1;
                }
        });
        const result = [];
        for (const i in phraseMatches)
            result.push({ phrase: this.phrases[i], matches: phraseMatches[i] });

        result.sort((a, b) => {
            const diff = b.matches - a.matches;
            return diff;// == 0 ? a.phrase.localeCompare(b.phrase) : diff;
        });
        return result;
    }
}