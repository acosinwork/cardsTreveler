/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 22.09.13
 * Time: 23:41
 * To change this template use File | Settings | File Templates.
 */

var TravelCadrs = function() {
    this.cardsBox=[];

    this.cardAdd = function (newCard) {
        this.cardsBox.push(newCard)
    }

    this.add = function (startTown, endTown, transportType, travelInfo) {
        var newCard ={};
        newCard.startTown = startTown;
        newCard.endTown = endTown;
        newCard.transportType = transportType;
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
        var srtdStartThread = [];
        var srtdEndThread =  [];

        var crdBox = this.cardsBox;
        var cbLength = crdBox.length;

        var saveInThread = function (cardBoxIndex, sortedCardsIndex) {

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
        }

        for (cbIndex = 0; cbIndex < cbLength; cbIndex++) {

            wasSavedInThread=false;
            for (srtIndex=0; srtIndex < srtLength; srtIndex++) {

                if (wasSavedInThread = saveInThread(cbIndex, srtIndex)) {
                    break;
                }

            }

            if (!wasSavedInThread) {
                srtdEndThread.push(crdBox[cbIndex]);
                srtLength = srtCards.push(
                    {startTown : crdBox[cbIndex].startTown, endTown : crdBox[cbIndex].endTown,
                    srtdStartThread : srtdStartThread , srtdEndThread : srtdEndThread});
            }
        }
        // sorting threads
        for (currThreadInd = 0; currThreadInd < srtLength-1; currThreadInd++) {
            srtCards.threadOrder = 0;
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
        // showSortedThreads(srtCards);
        //console.log(srtCards);

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

        //consoleShowWay(sortedCardBox);
        //console.log(srtCards);
    }

    this.takeCards_And_GiveMeTravel = function (thisIsFullCardsBox) {
        //TODO How use typeof and []? I'm shure, user take him array!:)
        if (thisIsFullCardsBox !== undefined) {
            this.cardsBox = thisIsFullCardsBox;
        } else if (this.cardsBox.length==0) {
            console.log("cardsBox is empty");
            break;
        }
        // ok, now i'm shure, that we need use current cardsBox
        this.sort();

    }




}

/* USE Section*/
var cards = new TravelCadrs();


var ccard = {startTown : "Moscow", endTown : "Kiev"};

cards.cardAdd(ccard);

cards.add( "Vologda", "Miami");

cards.add("Leningrad","Moscow","train", "seat 48A");
cards.add("London","Oslo", "airport bus");
cards.add("Kiev","London","fly", "seat 48A");
cards.add( "Vladimir", "Leningrad");
cards.add( "Oslo", "Irkutsk");
//не попадет в отсортированную ветку

cards.add( "Miami", "defaultCity");
cards.add( "defaultCity", "Vladimir");

cards.sort();

console.log(cards.cardsBox);


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
