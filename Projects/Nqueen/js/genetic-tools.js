/**
 *  A Light-Weight Tool Box For Genetic Algorithm
 *  Developer : Amir Kabiri
 *  Github : https://github.com/amirkabiri
 *  Site : https://akdev.ir
 */

const GeneticAlgorithm = {
    selection : {
        /**
         * Selects potentially useful chromosomes with higher fitness for recombination.
         * @param {array} probabilities
         * @return {number}
         */
        RouletteWheel(probabilities){
            let probabilitiesSum = probabilities.reduce((sum, current) => sum + current, 0);
            probabilities = probabilities.map(probability => probability / probabilitiesSum);

            let cumSum = 0;
            probabilities = probabilities.map(probability => cumSum += probability);

            const randomNumber = Math.random();
            for(let probabilityIndex in probabilities){
                if(probabilities[probabilityIndex] > randomNumber) return +probabilityIndex;
            }
        },

        /**
         * Selects chromosomes randomly.
         * @param {array} probabilities
         * @return {number}
         */
        RandomSelection(probabilities){
            return Math.floor(Math.random() * probabilities.length);
        }
    },

    pairing : {
        Sequential(population){
            let result = [];
            for(let i = 0; i < population.length; i += 2){
                result.push([
                    population[i],
                    population[i + 1]
                ]);
            }
            return result;
        },

        Fitness(population, calcFitness){
            population.sort((a, b) => calcFitness(b) - calcFitness(a));

            return GeneticAlgorithm.pairing.Sequential(population);
        },

        RouletteWheel(population){
            throw new Error('this method is not implemented yet');
        }
    },

    crossOver : {

        /**
         * A point on both parent is picked randomly.
         * Bits to the right of that point are swapped between the two parent chromosomes.
         * @param {array} parent1
         * @param {array} parent2
         * @return {array}
         */
        SinglePoint(parent1, parent2){
            const randIndex = Math.floor(Math.random() * parent1.length);

            return [
                [...parent1.slice(0, randIndex), ...parent2.slice(randIndex)],
                [...parent2.slice(0, randIndex), ...parent1.slice(randIndex)]
            ];
        },

        /**
         * Two crossover points are picked randomly from the parent.
         * The bits in between the two points are swapped between the parent organisms.
         * @param {array} parent1
         * @param {array} parent2
         * @return {array}
         */
        TwoPoint(parent1, parent2){
            const randIndexA = Math.floor(Math.random() * (parent1.length - 1));
            const randIndexB = Math.floor(Math.random() * (parent1.length - randIndexA + 1)) + randIndexA + 1;

            return [
                [
                    ...parent1.slice(0, randIndexA),
                    ...parent2.slice(randIndexA, randIndexB),
                    ...parent1.slice(randIndexB)
                ],
                [
                    ...parent2.slice(0, randIndexA),
                    ...parent1.slice(randIndexA, randIndexB),
                    ...parent2.slice(randIndexB)
                ]
            ];
        },


        /**
         * Each gene (bit) is selected randomly from one of the corresponding genes of the parent chromosomes.
         * @param {array} parent1
         * @param {array} parent2
         * @return {array}
         */
        Uniform(parent1, parent2){
            const childA = Array(parent1.length);
            const childB = Array(parent1.length);

            for(let i = 0; i < parent1.length; i ++){
                if(Math.floor(Math.random() * 2)){
                    childA[i] = parent1[i];
                    childB[i] = parent2[i];
                }else{
                    childA[i] = parent2[i];
                    childB[i] = parent1[i];
                }
            }

            return [
                childA,
                childB
            ];
        }
    }
};
