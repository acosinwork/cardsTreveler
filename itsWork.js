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
        var srtCards = [];
        var crdBox = this.cardsBox;
        var inThread;

        var cbLength = crdBox.length;
        var srtLength;

        //console.log(crdBox);

        for (cbIndex = 0; cbIndex < cbLength; cbIndex++) {
            inThread=false;
            for (srtIndex=0; srtIndex < srtLength; srtIndex++) {

                // towns order in srtdEndThread - for first to last
                if (crdBox[cbIndex].startTown == srtCards[srtIndex].endTown) {
                    srtCards[srtIndex].endTown = crdBox[cbIndex].endTown;
                    srtCards[srtIndex].srtdEndThread.push(crdBox[cbIndex]);
                    inThread = true;
                    break;
                } else if (crdBox[cbIndex].endTown == srtCards[srtIndex].startTown) {
                    srtCards[srtIndex].startTown = crdBox[cbIndex].startTown;
                    srtCards[srtIndex].srtdStartThread.push(crdBox[cbIndex]);
                    inThread = true;
                    break;
                }
            }

            if (!inThread) {
                var srtdEndThread =  [];
                srtdEndThread.push(crdBox[cbIndex]);
                var startTown = crdBox[cbIndex].startTown;
                var endTown = crdBox[cbIndex].endTown;

                var srtdStartThread = [];
                srtLength = srtCards.push(
                    {startTown : startTown, endTown : endTown,
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

        var sortedCardBox = [];

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

        /*

        //TEST
        for (i=0; i<srtCards.length; i++) {
            console.log("start - "+srtCards[i].startTown + " -- end - " + srtCards[i].endTown);
            console.log("first way:");

            // from end to start
            for (y=srtCards[i].srtdStartThread.length-1; y >= 0; y--) {
                var towns=srtCards[i].srtdStartThread[y];
                console.log(y + ": " + srtCards[i].srtdStartThread[y].startTown + " - " + srtCards[i].srtdStartThread[y].endTown);
            }
            console.log("second way:");
            // from start to end
            for (y=0; y < srtCards[i].srtdEndThread.length; y++) {
                var towns=srtCards[i].srtdEndThread[y];
                console.log(y + ": " + srtCards[i].srtdEndThread[y].startTown + " - " + srtCards[i].srtdEndThread[y].endTown);
            }

        } */

        console.log(sortedCardBox);
        console.log(srtCards);

    }

}

//function sort(cardArray) {
//    var sortedCards = [];
//    var allCards =
//}

var cards = new TravelCadrs();


var ccard = {startTown : "Moscow", endTown : "Kiev"};

cards.cardAdd(ccard);

cards.add("Leningrad","Moscow","train", "seat 48A");
cards.add("London","Oslo", "airport bus");
cards.add("Kiev","London","fly", "seat 48A");
cards.add( "Vladimir", "Leningrad");
cards.add( "Oslo", "Irkutsk");
//не попадет в отсортированную ветку
cards.add( "Oslo", "Miami");
cards.add( "Miami", "Irkutsk");


//cards.add( "Vladimir", "Leningrad");



cards.sort();

//var aaa = new cards();

//console.log(cards.cardsBox);

