/**
 * getFizzBuzz: Used to get fizz, buzz, fizzbuzz based on count
 * @param params
 */
export const getFizzBuzz = (params: { count: number }) => {
  try {
    const { count } = params;
    let fizzBuzzArr = [];
    for (let index = 1; index <= count; index++) {
      if ( (index % 3 == 0) && index % 5 == 0 ) {
        fizzBuzzArr.push("FizzBuzz");
      } else if (index % 3 == 0) {
        fizzBuzzArr.push("Fizz");
      } else if (index % 5 == 0) {
        fizzBuzzArr.push("Buzz");
      } else {
        fizzBuzzArr.push(index);
      }      
    }
    return fizzBuzzArr;
  } catch (err) {
    return err;
  }
}
