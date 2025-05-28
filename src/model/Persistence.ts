import fs from "fs";
// import * as initKnex from "knex";
import path from "path";
import {
  ECollectionName, IPersist, TCollection, TCollectionArray,
} from "../types";

// const knex = initKnex({ client: "pg", connection: DATABASE_URL, debug: IS_PROD });

interface IPersistence {
  /**
   * @deprecated A legacy feature for browser compatibility
   * @returns All Data
   */
    get: () => IPersist;

  /**
   * @deprecated A legacy feature for browser compatibility
   * @returns void
   */
    put: (json: IPersist) => void;

    findById: (id: number, collectionName: ECollectionName) => Promise<TCollection | undefined>;

    findAll: (collectionName: ECollectionName) => Promise<TCollectionArray | null>;

    // create: (item: any, collectionName?: ECollectionName) => Promise<any>;

    // deleteById: (id: number | string, collectionName?: ECollectionName) => Promise<any>;

    // updateById: (id: number | string, collectionName?: ECollectionName) => Promise<any>;
}

export const Persistence: IPersistence = {
  get: () => {
    try {
      const data: IPersist = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "..", "..", "db.json"),
          { encoding: "utf8" }),
      );
      return data;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error with getData: ${e.message}`);
      }
      throw new Error("Error with getData");
    }
  },

  put: (json: IPersist) => {
    try {
      const data = JSON.stringify(json);

      fs.writeFileSync(
        path.resolve(__dirname, "..", "..", "db.json"),
        data,
        { encoding: "utf8" },
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Error with putData: ${e.message}`);
      }
      throw new Error("Error with putData");
    }
  },

  findById: async (id: number, collectionName: ECollectionName) => {
    try {
      const data: IPersist = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "..", "..", "db.json"),
          { encoding: "utf8" }),
      );

      const collection: TCollection[] = data[collectionName];

      const candidate = collection.find((item) => item.id === id);

      return candidate;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error with getData: ${e.message}`);
      }
      throw new Error("Error with getData");
    }
    // const list = await knex(collectionName)
    //   .select()
    //   .where({ id });

    // return list[0];
  },

  findAll: async (collectionName: ECollectionName) => {
    try {
      const data: IPersist = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "..", "..", "db.json"),
          { encoding: "utf8" }),
      );

      const collection: TCollectionArray = data[collectionName];

      return collection;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error with getData: ${e.message}`);
      }
      throw new Error("Error with getData");
    }

    // const list = await knex(collectionName)
    //   .select()

    // return list[0];
  },

  // create: async (item: TCollection) => {
  //   switch (item.type) {
  //     case ECollectionName.BOOKS:
  //       return undefined;
  //     case ECollectionName.USERS: {
  //       // const { id, password, login } = item;

  //       // const isTransactionOk = await knex.transaction(
  //       //   (t) => knex(collectionName)
  //       //   .transacting(t)
  //       //   .insert({ id, password, login })

  //       //   // .then(
  //       //   //   () => knex(collectionTokens)
  //       //   //   .transacting(t)
  //       //   //   .insert({ uuid: id })

  //       //   //   .then(
  //       //   //     () => knex(collectionPlayerSettings)
  //       //   //     .transacting(t)
  //       //   //     .insert({ uuid: id })

  //       //   //     .then(
  //       //   //       () => knex(collectionPlayerStatistics)
  //       //   //       .transacting(t)
  //       //   //       .insert({ uuid: id })
  //       //   //     )
  //       //   //   )
  //       //   // )

  //       //   .then(t.commit)
  //       //   .catch(t.rollback)
  //       // )

  //       // .then(() => true)

  //       // .catch(() => false);

  //       // return isTransactionOk;
  //     }
  //     case ECollectionName.COMMENTS:
  //       return undefined;
  //     default:
  //       return null;
  //   }
  // },

  // deleteById: async (id: number | string, collectionName?: ECollectionName) => {
  //   try {
  //     // if (!id) {
  //     //   throw new Error("Error with remData: id not found");
  //     // }

  //     // await knex(collectionName)
  //     //   .delete()
  //     //   .where({ id });

  //     // const data = JSON.stringify(item);
  //     // // @ts-ignore
  //     // fs.writeFileSync(path.resolve(__dirname, "..", "..", "db.json"), data, { encoding: "utf8" });
  //   } catch (e: unknown) {
  //     if (e instanceof Error) {
  //       throw new Error(`Error with remData: ${e.message}`);
  //     }
  //     throw new Error("Error with remData");
  //   }
  // },

  // updateById: async (id: string | number, collectionName?: ECollectionName) => {
  // const { id, login } = item;

  // const list = await knex(collectionName)
  //   .update({ id, password, login })
  //   .where({ id })
  //   .returning('*');

  // return list[0];
  // },
};
