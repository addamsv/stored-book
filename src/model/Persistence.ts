import fs from "fs";
// import * as initKnex from 'knex';
import path from "path";
import { IPersist } from "../types";
// import { DATABASE_URL, IS_PROD } from "../../conf";

type TCollectionName =  "posts" | "books" | "comments" | "users" | "profiles";

// const knex = initKnex({ client: 'pg', connection: DATABASE_URL, debug: IS_PROD });

export const Persistence = {
  get: (collectionName?: TCollectionName) => {
    try {
      // @ts-ignore
      const data: IPersist = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "..", "db.json"), "UTF-8"));
      return data;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error with getData: ${e.message}`);
      }
      throw new Error("Error with getData");
    }
  },

  findById: async (id: string | number, collectionName: TCollectionName) => {
    // const list = await knex(collectionName)
    //   .select()
    //   .where({ id });

    // return list[0];
  },

  findAll: async (collectionName: TCollectionName) => {
    // const list = await knex(collectionName)
    //   .select()

    // return list[0];
  },

  create: async (item: any, collectionName?: TCollectionName) => {
    // const { id, password, login } = item;

    // const isTransactionOk = await knex.transaction(
    //   (t) => knex(collectionName)
    //   .transacting(t)
    //   .insert({ id, password, login })

    //   // .then(
    //   //   () => knex(collectionTokens)
    //   //   .transacting(t)
    //   //   .insert({ uuid: id })

    //   //   .then(
    //   //     () => knex(collectionPlayerSettings)
    //   //     .transacting(t)
    //   //     .insert({ uuid: id })

    //   //     .then(
    //   //       () => knex(collectionPlayerStatistics)
    //   //       .transacting(t)
    //   //       .insert({ uuid: id })
    //   //     )
    //   //   )
    //   // )

    //   .then(t.commit)
    //   .catch(t.rollback)
    // )

    // .then(() => true)

    // .catch(() => false);

    // return isTransactionOk;
  },

  /* DEPRECATED SOON */
  put: (json: IPersist, collectionName?: TCollectionName) => {
    try {
      const data = JSON.stringify(json);
      // @ts-ignore
      fs.writeFileSync(path.resolve(__dirname, "..", "..", "db.json"), data, "UTF-8");
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error with putData: ${e.message}`);
      }
      throw new Error("Error with putData");
    }
  },

  update: (item: IPersist, collectionName?: string) => {
    try {
      const data = JSON.stringify(item);
      // @ts-ignore
      fs.writeFileSync(path.resolve(__dirname, "..", "..", "db.json"), data, "UTF-8");

      // const { id, password, login } = item;
  
      // const list = await knex(collectionName)
      //   .update({ id, password, login })
      //   .where({ id })
      //   .returning('*');
  
      // return list[0];
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error with putData: ${e.message}`);
      }
      throw new Error("Error with putData");
    }
  },

  deleteById: async (data: IPersist, collectionName?: TCollectionName) => {
    try {
      // if (!id) {
      //   throw new Error("Error with remData: id not found");
      // }

      // await knex(collectionName)
      //   .delete()
      //   .where({ id });

      // const data = JSON.stringify(item);
      // // @ts-ignore
      // fs.writeFileSync(path.resolve(__dirname, "..", "..", "db.json"), data, "UTF-8");
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error with remData: ${e.message}`);
      }
      throw new Error("Error with remData");
    }
  }
};
