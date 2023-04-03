function percentageOfLikeliness(string1, string2) {
  // Calculate the Levenshtein distance
  const distance = levenshteinDistance(string1, string2);

  // Calculate the percentage of likeness
  const maxLength = Math.max(string1.length, string2.length);
  const likeness = ((maxLength - distance) / maxLength) * 100;

  return likeness.toFixed(2); // round to 2 decimal places
}

// Implementation of Levenshtein distance algorithm
function levenshteinDistance(string1, string2) {
  const matrix = Array(string2.length + 1).fill(null).map(() =>
    Array(string1.length + 1).fill(null)
  );

  for (let i = 0; i <= string1.length; i += 1) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= string2.length; j += 1) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= string2.length; j += 1) {
    for (let i = 1; i <= string1.length; i += 1) {
      if (string1[i - 1] === string2[j - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
            matrix[j - 1][i],    // deletion
            matrix[j][i - 1],    // insertion
            matrix[j - 1][i - 1] // substitution
          ) + 1;
      }
    }
  }

  return matrix[string2.length][string1.length];
}

module.exports = {percentageOfLikeliness};
