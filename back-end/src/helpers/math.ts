export const randInt = (min:number, max:number):number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
