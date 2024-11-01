import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  public async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const data = await this.http.get<PokeResponse>(
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
