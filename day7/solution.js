import {input, utils} from '../helpers';
const hands = input.lines.map(line => line.split(' '));

const cardRank = (faceCards, tail) => { 
  const numberCards = ['T', ...utils.range(10).map(String).reverse()];
  if (tail) numberCards.splice(-2, 1, tail);

  return [...faceCards, ...numberCards].reverse();
};

const config = {
  part1: {
    cards: cardRank(['A', 'K', 'Q', 'J']),
    types: [
      (hand) => !!hand.match(/(.)\1{4}/), // 5 of a kind
      (hand) => !!hand.match(/(.)(?=(.*\1){3})/), // 4 of a kind
      (hand) => !!hand.match(/^(.)(?:\1)*(.)(?=(?:\1|\2)+$)/), // Full house
      (hand) => !!hand.match(/(.)(?=.*\1.*\1.*$)/), // 3 of a kind
      (hand) => !!hand.match(/(.)(?=.*?\1(?!.*\1)).*(.)(?=.*?\2(?!.*\2))/), // 2 pair
      (hand) => !!hand.match(/(.).*\1/), // 1 pair
      (hand) => Math.max(...hand.split('').map(card => config.part1.cards.indexOf(card))), // high card
    ]
  },

  part2: {
    cards: cardRank(['A', 'K', 'Q'], 'J'),
    types: [
      (hand) => !!hand.match(/(.)\1{4}|(.)(?<=^(\2|J)*)(?=(\2|J)*$)/), // 5 of a kind
      (hand) => !!hand.match(/(?=(?:(?:.*J){3})|(?:([^J])(?:.*\1){3})|(?:(?=.*J)(?=.*([^J])(.*\2){2}))|(?:(?=(?:.*J){2})(?=.*([^J])(.*\4){1})))/), // 4 of a kind
      (hand) => !!hand.match(/^J?(.)(?:\1|J)*(.)(?=(?:\1|\2|J)+$)/), // Full house
      (hand) => !!hand.match(/(?:J.*J)|(.)(((?<=J.*)(?=.*\1))|(?=(.*(\1|J)){2}))/), // 3 of a kind
      (hand) => !!hand.match(/(.)(?=.*?\1(?!.*\1)).*(.)(?=.*?\2(?!.*\2))/), // 2 pair
      (hand) => !!hand.match(/(?:(.).*(\1))|J/), // 1 pair
      (hand) => Math.max(...hand.split('').map(card => config.part2.cards.indexOf(card))), // high card
    ]
  }
}

const makeCardValue = (cards) => (card, index) => cards.indexOf(card) * Math.pow(10, 8 - index * 2);
const makeTypeValue = (types) => (hand) => types.findIndex((matcher) => matcher(hand));
const makeHandValue = ({cards, types}) => (hand) => [makeTypeValue(types)(hand), hand.split('').map(makeCardValue(cards)).reduce(utils.sum)]

const sortHands = (config) => ([hand1], [hand2]) => {
  const handValue = makeHandValue(config);

  const [h1Type, h1Value] = handValue(hand1);
  const [h2Type, h2Value] = handValue(hand2);

  const type = h2Type - h1Type;
  if (type != 0) return type;

  return h1Value - h2Value;
} 

const answer = (config, hands) => hands.sort(sortHands(config)).map(([,bet], index) => Number(bet) * (index + 1)).reduce(utils.sum)
console.log(answer(config.part1, hands));
console.log(answer(config.part2, hands));