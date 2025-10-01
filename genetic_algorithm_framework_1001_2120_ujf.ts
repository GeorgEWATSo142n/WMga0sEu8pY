// 代码生成时间: 2025-10-01 21:20:00
 * The framework is designed to be easily extensible and maintainable.
 */

import { Injectable, OnModuleInit } from '@nestjs/common';

// Interface for defining a chromosome
interface IChromosome<T> {
  fitness: number;
  genes: T[];
}

// Interface for defining a genetic algorithm configuration
interface IGeneticAlgorithmConfig<T> {
  populationSize: number;
  mutationRate: number;
  maxIterations: number;
  createInitialPopulation: () => IChromosome<T>[][];
  calculateFitness: (chromosome: IChromosome<T>) => number;
  selectFittest: (population: IChromosome<T>[]) => IChromosome<T>;
  crossover: (parent1: IChromosome<T>, parent2: IChromosome<T>) => IChromosome<T>;
  mutate: (chromosome: IChromosome<T>) => IChromosome<T>;
}

@Injectable()
export class GeneticAlgorithmService<T> implements OnModuleInit {
  private config: IGeneticAlgorithmConfig<T>;
  private population: IChromosome<T>[][];
  private bestChromosome: IChromosome<T> | null = null;

  constructor(config: IGeneticAlgorithmConfig<T>) {
    this.config = config;
  }

  onModuleInit() {
    this.population = this.config.createInitialPopulation();
  }

  // Run the genetic algorithm
  async run(): Promise<IChromosome<T>> {
    for (let iteration = 0; iteration < this.config.maxIterations; iteration++) {
      this.population = this.evolve();
      const fittest = this.config.selectFittest(this.population.flat());
      if (this.bestChromosome === null || fittest.fitness > this.bestChromosome.fitness) {
        this.bestChromosome = fittest;
      }
    }
    return this.bestChromosome!;
  }

  // Evolve the current population
  private evolve(): IChromosome<T>[][] {
    const newPopulation: IChromosome<T>[] = [];
    while (newPopulation.length < this.config.populationSize) {
      const parents = this.selectParents();
      const offspring = this.crossoverAndMutate(parents);
      newPopulation.push(...offspring);
    }
    return newPopulation;
  }

  // Select parents for breeding
  private selectParents(): IChromosome<T>[] {
    // Implement selection logic based on fitness
    // For simplicity, we are just selecting the fittest two for now
    return this.population
      .map((chromosome) => ({
        chromosome,
        fitness: this.config.calculateFitness(chromosome),
      }))
      .sort((a, b) => b.fitness - a.fitness)
      .slice(0, 2)
      .map((pair) => pair.chromosome);
  }

  // Perform crossover and mutation on selected parents
  private crossoverAndMutate(parents: IChromosome<T>[]): IChromosome<T>[] {
    const offspring: IChromosome<T>[] = [];
    for (let i = 0; i < parents.length; i += 2) {
      const child = this.config.crossover(parents[i], parents[i + 1]);
      if (Math.random() < this.config.mutationRate) {
        child.genes = this.mutateGenes(child.genes);
      }
      offspring.push(child);
    }
    return offspring;
  }

  // Mutate the genes of a chromosome
  private mutateGenes(genes: T[]): T[] {
    return genes.map((gene) => this.config.mutate({ genes: [gene], fitness: 0 }));
  }
}
