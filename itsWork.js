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
        var inThread = false;

        //console.log(crdBox);

        for (cbIndex = 0; cbIndex < crdBox.length; cbIndex++) {
            for (srtIndex=0; srtIndex < srtCards.length; srtIndex++) {

                if (crdBox[cbIndex].startTown == srtCards[srtIndex].endTown) {
                    srtCards[srtIndex].endTown = crdBox[cbIndex].endTown;
                    //TODO srtdThread
                    srtCards[srtIndex].srtdThread.push(crdBox[cbIndex]);
                    inThread = true;
                    break;
                }
            }

            if (!inThread) {
                var srtdThread =  [];
                srtdThread.push(crdBox[cbIndex]);
                var startTown = crdBox[cbIndex].startTown;
                var endTown = crdBox[cbIndex].endTown;

                srtCards.push({startTown : startTown, endTown : endTown, srtdThread : srtdThread});
            }
        }
        //TEST
        for (i=0; i<srtCards.length; i++) {
            console.log("start - "+srtCards[i].startTown + " -- end - " + srtCards[i].endTown);
            console.log("way:");
            for (y=0; y < srtCards[i].srtdThread.length; y++) {
                var towns=srtCards[i].srtdThread[y];
//                console.log(towns.startTown);
                console.log(y + ": " + srtCards[i].srtdThread[y].startTown + " - " + srtCards[i].srtdThread[y].endTown);
            }

        }

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

cards.sort();

//var aaa = new cards();

console.log(cards.cardsBox);

