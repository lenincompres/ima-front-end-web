export class Aux {

  static timeoutPromise(time = 100, func = () => null) {
    return new Promise(resolve => setTimeout(() => resolve(func()), time));
  }

  static randomizeArray(arr = []) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
  }
}

export default Aux;