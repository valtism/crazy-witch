Witch = {
    RedHead: 1,
    RedTail: -1,
    YellowHead: 2,
    YellowTail: -2,
    PurpleHead: 3,
    PurpleTail: -3,
    GreenHead: 4,
    GreenTail: -4
}

function Card(top, right, bottom, left) {
    this.top = top,
    this.right = right,
    this.bottom = bottom,
    this.left = left,
    this.rotation = 0
}

var cards = [
    new Card(Witch.RedTail, Witch.GreenHead, Witch.PurpleHead, Witch.YellowTail),
    new Card(Witch.PurpleTail, Witch.RedTail, Witch.PurpleHead, Witch.YellowHead),
    new Card(Witch.PurpleTail, Witch.PurpleHead, Witch.GreenHead, Witch.RedTail),
    new Card(Witch.GreenHead, Witch.YellowHead, Witch.RedTail, Witch.YellowTail),
    new Card(Witch.PurpleHead, Witch.RedHead, Witch.GreenTail, Witch.YellowTail),
    new Card(Witch.PurpleTail, Witch.YellowTail, Witch.GreenHead, Witch.RedHead),
    new Card(Witch.RedTail, Witch.PurpleTail, Witch.GreenHead, Witch.PurpleHead),
    new Card(Witch.YellowTail, Witch.GreenHead, Witch.RedHead, Witch.GreenTail),
    new Card(Witch.RedTail, Witch.PurpleHead, Witch.YellowHead, Witch.GreenTail)
]

function rotate(card) {
    var top = card.top;
    card.top = card.right;
    card.right = card.left;
    card.left = card.bottom;
    card.bottom = top;
    card.rotation = (card.rotation + 1) % 4;
}

const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

function compareLeft(card, cardArray) {
    var position = cardArray.indexOf(card);
    var sideLength = Math.sqrt(cardArray.length);
    var comparisonCard = cardArray[position - 1];
    var match = false;
    if (position % sideLength === 0) {
        // Left side of square
        match = true;
    } else {
        match = (card.left + comparisonCard.right === 0);
    }
    return match;
}

function compareTop(card, cardArray) {
    var position = cardArray.indexOf(card);
    var sideLength = Math.sqrt(cardArray.length);
    var comparisonCard = cardArray[position - sideLength];
    var match = false;
    if (position < sideLength) {
        // Top side of square
        match = true;
    } else {
        match = (card.top + comparisonCard.bottom === 0);
    }
    return match;
}

function main() {
    cmb = permutator(cards);
    var index = 0
    cmb.forEach(function(cardPerm) {
        debugger;
        console.log(index);
        var solvable = true;
        var i = 0;
        while(solvable) {
            if(compareLeft(cardPerm[i], cardPerm) && compareTop(cardPerm[i], cardPerm)) {
                if (i === cardPerm.length - 1) {
                    // End of array, log our valid output
                    console.log(cardPerm);
                } else {
                    // Increment to next card
                    i++;
                }
            } else {
                if (cardPerm[i].rotation !== 3) {
                    rotate(cardPerm[i]);
                } else {
                    // Reset card position
                    rotate(cardPerm[i]);
                    i--;
                    // Backtrack
                    if (cardPerm[i].rotation === 3 && i >= 0) {
                        // Need a loop in case of multiple backtracks needed in a row
                        rotate(cardPerm[i]);
                        i--;
                    } else {
                        rotate(cardPerm[i]);
                    }

                    if (i <= 0) {
                        // All rotations have failed, new permutation needed
                        solvable = false;
                        console.log("nope");
                    }
                }
            }
        }
        index++;
    });
}
