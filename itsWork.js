/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 22.09.13
 * Time: 23:41
 * To change this template use File | Settings | File Templates.
 */

var TravelCadrs = function(please) {
    this.cardsBox=[];
    //if plesure
    this.please = false;
    if (please) {
        this.please = please;
    };

    this.cardAdd = function (newCard) {
        this.cardsBox.push(newCard)
    }

    this.add = function (startTown, endTown, transportType, transportInfo, travelInfo) {
        var newCard ={};
        newCard.startTown = startTown;
        newCard.endTown = endTown;
        newCard.transportType = transportType;
        newCard.transportInfo = transportInfo;
        newCard.travelInfo = travelInfo;
        cards.cardAdd(newCard);
    }

    this.sort = function() {
        var wasSavedInThread;
        var srtLength=0;
        var cbIndex;
        var srtIndex;
        var currThreadInd;
        var foundedThreadInd

        var srtCards = [];
        var sortedCardBox = [];
       // var srtdStartThread = [];
       // var srtdEndThread =  [];

        var crdBox = this.cardsBox;
        var cbLength = crdBox.length;

        /* var saveInThread = function (cardBoxIndex, sortedCardsIndex) {

            if (crdBox[cardBoxIndex].startTown == srtCards[sortedCardsIndex].endTown) {
                srtCards[sortedCardsIndex].endTown = crdBox[cardBoxIndex].endTown;
                srtCards[sortedCardsIndex].srtdEndThread.push(crdBox[cardBoxIndex]);
                return true;

            } else if (crdBox[cardBoxIndex].endTown == srtCards[sortedCardsIndex].startTown) {
                srtCards[sortedCardsIndex].startTown = crdBox[cardBoxIndex].startTown;
                srtCards[sortedCardsIndex].srtdStartThread.push(crdBox[cardBoxIndex]);
                return true;

            } else {
                return false;
            }
        } */


        for (cbIndex = 0; cbIndex < crdBox.length; cbIndex++) {

            wasSavedInThread=false;
            for (srtIndex=0; srtIndex < srtCards.length; srtIndex++) {

                if (crdBox[cbIndex].startTown == srtCards[srtIndex].endTown) {
                    srtCards[srtIndex].endTown = crdBox[cbIndex].endTown;
                    srtCards[srtIndex].srtdEndThread.push(crdBox[cbIndex]);
                    wasSavedInThread = true;
                    break;
                } else if (crdBox[cbIndex].endTown == srtCards[srtIndex].startTown) {

                    srtCards[srtIndex].startTown = crdBox[cbIndex].startTown;
                    srtCards[srtIndex].srtdStartThread.push(crdBox[cbIndex]);
                    wasSavedInThread = true;
                    break;
                }
            }

            if (!wasSavedInThread) {
                srtLength = srtCards.push(
                    {startTown : crdBox[cbIndex].startTown, endTown : crdBox[cbIndex].endTown,
                    srtdStartThread : [] , srtdEndThread : [crdBox[cbIndex]]});

            }
        }

        srtCards.threadOrder = 0;
        for (currThreadInd = 0; currThreadInd < srtLength-1; currThreadInd++) {

            for (foundedThreadInd = currThreadInd+1; foundedThreadInd < srtLength; foundedThreadInd++) {

                if (srtCards[currThreadInd].startTown == srtCards[foundedThreadInd].endTown) {

                    srtCards[currThreadInd].previousThread = foundedThreadInd;
                    srtCards[foundedThreadInd].nextThread = currThreadInd;

                    srtCards.threadOrder = foundedThreadInd;

                } else if (srtCards[currThreadInd].endTown == srtCards[foundedThreadInd].startTown) {

                    srtCards[currThreadInd].nextThread = foundedThreadInd;
                    srtCards[foundedThreadInd].previousThread = currThreadInd;
                }

            }
        }

        while (srtCards.threadOrder !== undefined) {
            for (sortedCardInd = srtCards[srtCards.threadOrder].srtdStartThread.length-1;
                              sortedCardInd >= 0;
                              sortedCardInd--) {

                sortedCardBox.push(srtCards[srtCards.threadOrder].srtdStartThread[sortedCardInd]);
            }
            for (sortedCardInd = 0;
                              sortedCardInd < srtCards[srtCards.threadOrder].srtdEndThread.length;
                              sortedCardInd++) {

                sortedCardBox.push(srtCards[srtCards.threadOrder].srtdEndThread[sortedCardInd]);
            }
            srtCards.threadOrder = srtCards[srtCards.threadOrder].nextThread;

        }

        this.cardsBox = sortedCardBox;
    }

    this.takeCards_And_GiveMeTravel = function (thisIsFullCardsBox) {

        var travelText = [];

        //TODO How use typeof and []? I'm shure, user take him array!:)
        if (thisIsFullCardsBox !== undefined) {
            this.cardsBox = thisIsFullCardsBox;
        } else if (this.cardsBox.length==0) {
            console.log("cardsBox is empty");
            return (["cardsBox is empty"]);
        }
        // ok, now i'm shure, that we need use current cardsBox
        this.sort();



        for (var i = 0; i<this.cardsBox.length; i++) {

            travelText.push(this.getTextCard(this.cardsBox[i]));
        }

        return travelText;

    }

    this.order = {};

    this.transportOrder = function (transportToOrder) {

        for (var transport in transportToOrder) {
            this.order[transport] = transportToOrder[transport];
        }

    }


    this.getTextCard = function (card) {
        var currentCard = card;

        for (var property in card) {
     //       console.log(card[property]);
            if (card[property] == undefined) {
                card[property] = '';
            }
     //       console.log(card[property]);
        }

        if (card.transportType=="") {
            card.transportType="something, you know what,";
        }

        var isHave = function (prop) {
            if (prop!="") {

                return (" "+prop);
            } else {
                return "";
            }
        }

        var text = "Take " + card.transportType + isHave(card.transportInfo) + " from "
            + card.startTown + " to " + card.endTown + "." + isHave(card.travelInfo);

        for (var wordOrder in this.order) {
            if (currentCard.transportType==wordOrder) {
                switch (this.order[wordOrder]) {
                    case 0: {
                        break;
                    }
                    case 1: {
                        text = "From " + card.startTown + ", take " + card.transportType + isHave(card.transportInfo)
                            + " to " + card.endTown+"."+ isHave(card.travelInfo);

                        break;
                    }
                    case 2: {
                        text = "From " + card.startTown + " to " + card.endTown
                            + ", take " + card.transportType + isHave(card.transportInfo)+"."+ isHave(card.travelInfo);

                        break;
                    }

                }
            }
        }

        var plesure = "";
        if (this.please) {
            //smile makes me happy
            text=text + " :)";
        }

        return text;
    }




}

/* USE Section*/
var cards = new TravelCadrs();
/*
cards.add("3", "4");
cards.add("5", "6");
cards.add("4", "5");
cards.add("0", "1");
cards.add("2", "3");
cards.add("1", "2");

*/
var ccard = {startTown : "Moscow", endTown : "Kiev"};

cards.cardAdd(ccard);

cards.add( "Vologda", "Miami");

cards.add("Leningrad","Moscow","train", "48A", "Seat 28. Baggage Drop gate 40");
cards.add("London","Oslo", "airport bus");
cards.add("Kiev","London","fly", "s98","Passengers are dangerous");
cards.add( "Vladimir", "Leningrad");
cards.add( "Oslo", "Irkutsk");
//не попадет в отсортированную ветку

cards.add( "Miami", "defaultCity");
cards.add( "defaultCity", "Vladimir");

cards.sort();

//console.log(cards.cardsBox);
//cards.transportOrder({train : 2});
//cards.transportOrder({fly : 1});
cards.transportOrder({fly : 1, train : 2});


console.log(cards.takeCards_And_GiveMeTravel());


/* TEST Section*/

function showSortedThreads(sCards) {
    var srtCards = sCards;
    for (var i=0; i<srtCards.length; i++) {
        console.log("start - "+srtCards[i].startTown + " -- end - " + srtCards[i].endTown);
        console.log("first way:");

        // from end to start
        for (var y=srtCards[i].srtdStartThread.length-1; y >= 0; y--) {
            var towns=srtCards[i].srtdStartThread[y];
            console.log(y + ": " + srtCards[i].srtdStartThread[y].startTown + " - " + srtCards[i].srtdStartThread[y].endTown);
        }
        console.log("second way:");
        // from start to end
        for (y=0; y < srtCards[i].srtdEndThread.length; y++) {
            var towns=srtCards[i].srtdEndThread[y];
            console.log(y + ": " + srtCards[i].srtdEndThread[y].startTown + " - " + srtCards[i].srtdEndThread[y].endTown);
        }
    }
}

function consoleShowWay(scards) {
    var sortedCard = scards;
    for (var i=0; i<sortedCard.length; i++) {
        console.log(sortedCard[i].startTown + " - " + sortedCard[i].endTown);
    }

}
