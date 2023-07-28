/**
 *  Genetic Algorithm based engine to solve n-queens problem
 *  Developer : Amir Kabiri
 *  Github : https://github.com/amirkabiri
 *  Site : https://akdev.ir
 *  Usage : create object from this class and call object.run() generator to get step by step solution
 *  Dependencies : ./genetic-tools.js
 */

class NQueensGeneticEngine{
    constructor(n = 8, { populationSize } = {}){
        this._n = n;
        this.config = {
            populationSize : populationSize || 20
        };
    }

    conflictsCount(dna){
        const { n } = this;
        let count = 0;

        for(let row1 = 0; row1 < n; row1 ++){
            const col1 = dna[row1];

            for(let row2 = row1 + 1; row2 < n; row2 ++){
                const col2 = dna[row2];

                const gradient = Math.abs((row2 - row1) / (col2 - col1));
                if(gradient === 1){
                    count ++;
                }
            }
        }

        return count;
    }
    generateDNA(){
        const { n } = this;
        const res = Array(n).fill(0).map((a, i) => i);
        return this.shuffleArray(res);
    }
    shuffleArray(arr){
        const len = arr.length;
        for(let i = 0; i < len; i ++){
            const a = Math.floor(Math.random() * len);
            const b = Math.floor(Math.random() * len);

            [arr[a], arr[b]] = [arr[b], arr[a]];
        }
        return arr;
    }
    crossOver(dna1, dna2){
        const [a, b] = GeneticAlgorithm.crossOver.TwoPoint(dna1, dna2);

        return [this.optimizeDNA(a), this.optimizeDNA(b)];
    }
    optimizeDNA(dna){
        const notExistsNums = [];

        for(let i = 0; i < dna.length; i ++){
            if(dna.indexOf(i) === -1) notExistsNums.push(i);
        }

        const visited = [];
        for(let i = 0; i < dna.length; i ++){
            const gen = dna[i];

            if(!visited.includes(gen)){
                visited.push(gen);
                continue;
            }

            dna[i] = notExistsNums.pop();
        }

        return dna;
    }

    get n(){
        return this._n;
    }
    set n(n){
        if(n !== this._n){
            this._n = n;
        }
    }

    convertDNA2Matrix(dna){
        const n = dna.length;
        const matrix = Array(n).fill(0).map(() => Array(n).fill(0));

        for(let y in dna){
            if(!dna.hasOwnProperty(y)) continue;

            matrix[y][dna[y]] = 1;
        }

        return matrix;
    }

    *run(){
        let generation = Array(this.config.populationSize).fill(0).map(() => this.generateDNA());
        let bestDNA;
        let minConflict = Infinity;
        const { n } = this;

        do{
            const conflicts = generation.map(dna => this.conflictsCount(dna));
            const minLocalConflict = Math.min(...conflicts);
            const bestLocalDNA = generation[conflicts.indexOf(minLocalConflict)];

            yield this.convertDNA2Matrix(bestLocalDNA);

            if(minLocalConflict < minConflict){
                bestDNA = bestLocalDNA;
                minConflict = minLocalConflict;
            }

            if(minConflict === 0){
                break;
            }

            const fitnesses = conflicts.map(conflicts => 1 / conflicts + 1);
            const selectedIndexes = Array(generation.length).fill(0).map(() => GeneticAlgorithm.selection.RouletteWheel(fitnesses));
            const pairedIndexes = GeneticAlgorithm.pairing.Fitness(selectedIndexes, (index) => fitnesses[index]);

            // cross over
            const newGeneration = [];
            for(let pairedIndex in pairedIndexes){
                if(!pairedIndexes.hasOwnProperty(pairedIndex)) continue;

                const [parent1, parent2] = pairedIndexes[pairedIndex].map(i => generation[i]);
                const [child1, child2] = this.crossOver(parent1, parent2);

                newGeneration[pairedIndex * 2] = child1;
                newGeneration[pairedIndex * 2 + 1] = child2;
            }

            // mutation
            for(let i = 0; i < Math.floor(generation.length * .2); i ++){
                const index = Math.floor(Math.random() * newGeneration.length);
                const a = +Math.floor(Math.random() * n);
                const b = +Math.floor(Math.random() * n);

                const temp = newGeneration[index][a];
                newGeneration[index][a] = newGeneration[index][b];
                newGeneration[index][b] = temp;
            }

            // put best dna in next generation
            const index = Math.floor(Math.random() * newGeneration.length);
            newGeneration[index] = bestDNA;

            generation = newGeneration;

        }while(minConflict > 0);
    }
}