/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 22.09.13
 * Time: 23:41
 * To change this template use File | Settings | File Templates.
 */

var TravelCadrs = function() {
    this.cardsBox=[];

    this.CardAdd = function (newCard) {
        this.cardsBox.push(newCard)
    }
    this.Add = function (startTown, endTown, transportType, travelInfo) {
        var newCard ={};
        newCard.startTown = startTown;
        newCard.endTown = endTown;
        newCard.transportType = transportType;
        newCard.travelInfo = travelInfo;
        cards.CardAdd(newCard);
    }

}

var cards = new TravelCadrs();


/*
var cards = {};

cards.cardsBox=[];

cards.CardAdd = function (newCard) {
    this.cardsBox.push(newCard)
}
cards.Add = function (startTown, endTown, transportType, travelInfo) {
    var newCard ={};
    newCard.startTown = startTown;
    newCard.endTown = endTown;
    newCard.transportType = transportType;
    newCard.travelInfo = travelInfo;
    cards.CardAdd(newCard);
}

/*
cards.AddAllCards = function (arrayOfCards) {
    if (arrayOfCards !== Array) {
        console.log(arrayOfCards);
    } else {
        console.log("Oo");
    }
}
 cards.AddAllCards(cards.cardsBox);
*/


var ccard = {startTown : "Moscow", endTown : "Kiev"};

cards.CardAdd(ccard);

cards.Add("Leningrad","Moscow","train", "seat 48A");
cards.Add("London","Oslo", "airport bus");
cards.Add("Kiev","London","fly", "seat 48A");

//var aaa = new cards();

console.log(cards.cardsBox);

