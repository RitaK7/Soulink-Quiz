// soul-compatibility.js

function calculateCompatibility(user1, user2) {
  const score = {
    loveLanguage: user1.loveLanguage === user2.loveLanguage ? 25 : 0,
    zodiac: user1.zodiac === user2.zodiac ? 20 : 0,
    chineseSign: user1.chineseSign === user2.chineseSign ? 15 : 0,
    coreValue: user1.coreValue === user2.coreValue ? 30 : 0,
    relationshipType:
      user1.relationshipType === user2.relationshipType ||
      user1.relationshipType === "both" ||
      user2.relationshipType === "both"
        ? 10
        : 0
  };

  const total =
    score.loveLanguage +
    score.zodiac +
    score.chineseSign +
    score.coreValue +
    score.relationshipType;

  return {
    total,
    breakdown: score
  };
}

// Example usage:
// const compatibility = calculateCompatibility(userA, userB);
// console.log(compatibility);
