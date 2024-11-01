import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  public async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // Use Promises to insert documents
    // const insertPromisesArray = [];
    // data.results.forEach(({ name, url }) => {
    //   const segments = url.split('/');
    //   const no: number = +segments[segments.length - 2];
    //   insertPromisesArray.push(
    //    this.pokemonModel.create({no, name})
    //   )
    // });
    // await Promise.all(insertPromisesArray)

    // Use InsertMany to insert documents
    const pokemons = data.results.map(({name, url}) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      return {no, name};
    });

    await this.pokemonModel.insertMany(pokemons);

    return `Seed executed`;
  }
}
