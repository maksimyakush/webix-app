const startCompare = (value, filter) => value.toLowerCase().indexOf(filter.toLowerCase()) === 0;
const stripHTML = dataToAdd => {
  const regexDeleteTags = /(<[^>]+>|<[^>]>|<\/[^>]>)/g;
  for (const item in dataToAdd) {
    if (item == "id") continue;
    dataToAdd[item] = dataToAdd[item].replace(regexDeleteTags, "");
  }
  return dataToAdd;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomUser = () => {
  const countries = ["USA", "Germany", "Canada", "China", "France", "Italy", "Spain", "Belarus"];
  const names = ["Maksim", "Peter", "Andrew", "Helen"];
  const surnames = ["Petrov", "Svidler", "Carlsen", "Lagrave"];
  const country = countries[getRandomNumber(0, countries.length)];
  const name = `${names[getRandomNumber(0, names.length)]} ${
    surnames[getRandomNumber(0, surnames.length)]
  }`;
  const age = getRandomNumber(10, 100);
  return { name, age, country };
};

export { startCompare, stripHTML, getRandomNumber, getRandomUser };
