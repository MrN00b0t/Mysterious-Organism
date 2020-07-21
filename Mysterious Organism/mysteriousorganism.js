// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};

//factory function for pAequor
const pAequorFactory = (index, baseArray) => {
    return {
        specimenNum: index,
        dna: baseArray,
        mutate() {
            //randomaly select a base in the dna property and replace it with a random different value
            const randIndex = Math.floor(Math.random() * this.dna.length);
            let randBase = returnRandBase();
            //ensures new value is different
            while (this.dna[randIndex] === randBase) {
                randBase = returnRandBase();
            }
            this.dna[randIndex] = randBase;
        },
        //compare the dna of two samples and display percentage of identical bases that appear in the same position
        compareDNA(pAequor) {
            let sameCount = 0;
            if (this.dna.length != pAequor.dna.length) {
                console.log('DNA strands of differing length!')
            } else {
                for (let i = 0; i < this.dna.length; i++) {
                    if (this.dna[i] === pAequor.dna[i]) {
                        sameCount++
                    }
                }
            }
            const pctSame = Math.floor((sameCount / this.dna.length) * 100);
            //console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${pctSame}% DNA in common.`);
            return pctSame;
        },
        //pAequor sample has higher chance of survival if it contains 60pct or more C and G bases - return true if that is the case, false otherwise
        willLikelySurvive() {
            if (this.dna.length != 15) {
                console.log('Invalid sample length.');
            } else {
                let cgCount = 0;
                this.dna.forEach(base => {
                    if (base === 'C' || base === 'G') {
                        cgCount++;
                    }
                }
                );
                return Math.floor((cgCount / this.dna.length) * 100) >= 60;
            }
        },
        complementStrand() {
            let compStrand = [];
            if (this.dna.length != 15) {
                console.log('Invalid sample length.');
            } else {
                this.dna.forEach(base => {
                    switch (base) {
                        case 'A':
                            compStrand.push('T');
                            break;
                        case 'T':
                            compStrand.push('A');
                            break;
                        case 'C':
                            compStrand.push('G');
                            break;
                        case 'G':
                            compStrand.push('C');
                            break;
                        default:
                            console.log('Invalid base detected!');
                    }
                })
                return compStrand;
            }
        }
    };
}

//Create function that returns an array of 30 pAequor samples that are likely to survive

const buildSampleSet = () => {
    let sampleSet = [];
    let sampleIndex = 1;
    while (sampleSet.length < 30) {
        let currentSample = pAequorFactory(sampleIndex, mockUpStrand());
        if (currentSample.willLikelySurvive()) {
            sampleSet.push(currentSample);
        };
        sampleIndex++;
    }
    return sampleSet;
};

//Function to find most related instances of pAequor in the sample set
const findMostRelated = pAequorSet => {
    let testSet = pAequorSet;
    let currentMaxPct = 0;
    let currentS1;
    let currentS2;
    while (testSet.length > 1) {
        let currentSample = testSet.pop();
        for (let i = 0; i < testSet.length; i++) {
            if (currentSample.compareDNA(testSet[i]) > currentMaxPct) {
                currentMaxPct = currentSample.compareDNA(testSet[i])
                currentS1 = currentSample;
                currentS2 = testSet[i];
            }
        }
    };
    console.log(`The most related specimens are #${currentS2.specimenNum} and #${currentS1.specimenNum} having ${currentMaxPct}% DNA in common.`);
};
//****** TEST CODE *******
//const testP = pAequorFactory(1,mockUpStrand());
//console.log(testP.dna);
//testP.mutate();
//const testP2 = pAequorFactory(2,mockUpStrand());
//console.log(testP2.dna);
//testP.compareDNA(testP2);
//console.log(testP.willLikelySurvive());
//const sampleSet = buildSampleSet();
//console.log(sampleSet.length);
//console.log(sampleSet[25]);
//console.log(sampleSet[25].willLikelySurvive());
//console.log(testP.complementStrand());
//findMostRelated(sampleSet);

