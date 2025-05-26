type Book = {
  id: number;
  title: string;
  hasInBasket: boolean;
}

const basket: Book[] = [
  { title: "Book1", id: 1, hasInBasket: true }
]

function getBy<T, P extends keyof T>(arr: T[], prop: P, val: T[P]): T | null {
  return arr.filter(item => item[prop] === val)[0] || null;
}

// example
const res = getBy(basket, "title", "Book1")


// interface IDataBase {
//   profiles: {id: number, a: string};
//   products: {id: number, b: boolean};
// }

// const dataBase: IDataBase = {
//   profiles: {id: 1, a: "from profile"},
//   products: {id: 2, b: true}
// }

// function getByCN<T, P extends keyof T>(dataBase: T, collectionName: P): T[P] | null {
//   return dataBase[collectionName] || null;
// }

// // example
// const cN = getByCN(dataBase, "profiles");