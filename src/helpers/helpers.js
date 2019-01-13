const sortVotes = (a, b) => a.votes.replace(",", "") - b.votes.replace(",", "");
const startCompare = (value, filter) => value.toLowerCase().indexOf(filter.toLowerCase()) === 0;
const stripHTML = (dataToAdd) => {
  const regexDeleteTags = /(<[^>]+>|<[^>]>|<\/[^>]>)/g;
  for (const item in dataToAdd) {
    if (item === "id") continue;
    dataToAdd[item] = dataToAdd[item].replace(regexDeleteTags, "");
  }
  return dataToAdd;
};

export { sortVotes, startCompare, stripHTML };
