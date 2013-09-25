/**
 * Created with JetBrains WebStorm.
 * User: Vasily Basalaev
 * Date: 22.09.13
 * Time: 23:41
 * To change this template use File | Settings | File Templates.
 */

/**
 * Create an instance of Travel cards
 * @constructor
 * @this {TravelCadrs}
 */
var TravelCadrs = function () {

    /**
     * contains a set of cards traveler        *
     * @type {Array of cards}
     * @private
     */
    this.cardsBox = new Array();

    /**
     * property, true if cardsBox is sorted
     * false after this.add and in takeCards_And_GiveMeTravel (if it use parameters)
     * @type {boolean}
     */
    this.sorted=false;
    /**
     * property. Contains text ordering options for different transport type
     * @see this.ransportOrder
     * @type {fly: 1, train: 2}
     */
    this.order = {};

    /**
     * Contains default parameters for required options of travel card
     * @type {{transportType: string, transportInfo: string, travelInfo: string}}
     */
    this.prmDefault = {
        transportType : "something (you know what i mean)",
        transportInfo : "",
        travelInfo : "No seat assignment"
    }

    /**
     * safe method to add cards in a cardsBox.
     * Change this.sorted property to false *
     * Card:
     * @param strStartTown : string
     * @param strEndTown : string
     * @param strTransportType : string
     * @param strTransportInfo : string
     * @param strTravelInfo : string
     */

    this.add = function (strStartTown, strEndTown, strTransportType, strTransportInfo, strTravelInfo) {
        var newCard = {};

        newCard.startTown = strStartTown;
        newCard.endTown = strEndTown;
        newCard.transportType = strTransportType || this.prmDefault.transportType;
        newCard.transportInfo = strTransportInfo || this.prmDefault.transportInfo;
        newCard.travelInfo = strTravelInfo || this.prmDefault.travelInfo;

        this.cardsBox.push(newCard);
        this.sorted = false;
    }

    /**
     * Sort a full cardsBox
     */
    this.sort = function () {

        this.cardsBox = getSortedCardsBox(this.cardsBox)

        function getSortedCardsBox (crdBox) {
            var srtThreadsArr = [];
            var sortedCardBox = [];

            createSortedThreadsArray();
            findThreadsGraph();
            buildSortedCardsBoxFromThreads ();

            this.sorted = true;

            return sortedCardBox;

            function createSortedThreadsArray () {
                for (var cbIndex = 0; cbIndex < crdBox.length; cbIndex++) {

                    if (!saveCardInThread()) {
                        createNewThread();
                    }
                }

                function saveCardInThread () {
                    for (var srtIndex=0; srtIndex < srtThreadsArr.length; srtIndex++) {
                        if (crdBox[cbIndex].startTown == srtThreadsArr[srtIndex].endTown) {
                            srtThreadsArr[srtIndex].endTown = crdBox[cbIndex].endTown;
                            srtThreadsArr[srtIndex].srtdEndThread.push(crdBox[cbIndex]);
                            return true;
                        }
                        if (crdBox[cbIndex].endTown == srtThreadsArr[srtIndex].startTown) {
                            srtThreadsArr[srtIndex].startTown = crdBox[cbIndex].startTown;
                            srtThreadsArr[srtIndex].srtdStartThread.push(crdBox[cbIndex]);
                            return true;
                        }
                    }
                    return false;
                }
                function createNewThread () {
                    srtThreadsArr.push({startTown : crdBox[cbIndex].startTown,
                        endTown : crdBox[cbIndex].endTown,
                        srtdStartThread : [],
                        srtdEndThread : [crdBox[cbIndex]]});
                }
            }

            function findThreadsGraph () {
                srtThreadsArr.startPoint = 0;
                for (var currThreadInd = 0; currThreadInd < srtThreadsArr.length-1; currThreadInd++) {

                    for ( var foundedThreadInd = currThreadInd+1; foundedThreadInd < srtThreadsArr.length; foundedThreadInd++) {

                        if (srtThreadsArr[currThreadInd].startTown == srtThreadsArr[foundedThreadInd].endTown) {

                            srtThreadsArr[foundedThreadInd].nextThread = currThreadInd;

                            srtThreadsArr.startPoint = foundedThreadInd;

                        } else if (srtThreadsArr[currThreadInd].endTown == srtThreadsArr[foundedThreadInd].startTown) {

                            srtThreadsArr[currThreadInd].nextThread = foundedThreadInd;
                        }

                    }
                }

            }

            function buildSortedCardsBoxFromThreads () {
                while (srtThreadsArr.startPoint !== undefined) {
                    for (var sortedCardInd = srtThreadsArr[srtThreadsArr.startPoint].srtdStartThread.length-1;
                         sortedCardInd >= 0;
                         sortedCardInd--) {

                        sortedCardBox.push(srtThreadsArr[srtThreadsArr.startPoint].srtdStartThread[sortedCardInd]);
                    }
                    for (sortedCardInd = 0;
                         sortedCardInd < srtThreadsArr[srtThreadsArr.startPoint].srtdEndThread.length;
                         sortedCardInd++) {

                        sortedCardBox.push(srtThreadsArr[srtThreadsArr.startPoint].srtdEndThread[sortedCardInd]);
                    }

                    srtThreadsArr.startPoint = srtThreadsArr[srtThreadsArr.startPoint].nextThread;
                }
            }
        }
    }

    this.transportOrder = function (transportToOrder) {

        for (var transport in transportToOrder) {
            this.order[transport] = transportToOrder[transport];
        }

    }

    /**
     * return sorted cardsBox as text of your travel, and clear cardsBox*
     * You can use parameter, if you are sure that you can collect the right cardsBox.
     * In this case the contents of the cardsBox is change to the thisIsFullCardsBox content
     * @param thisIsFullCardsBox {[card1, card2, ...]} - optional (unsafe option)
     * @returns {Array of string} ["travel cards 1 text", "travel cards 2 text", "travel cards 3 text"]
     */

    this.takeCards_And_GiveMeTravel = function (thisIsFullCardsBox) {

        var travelText = [];

        if (thisIsFullCardsBox !== undefined) {
            this.cardsBox = thisIsFullCardsBox;
            this.sorted = false;
        } else if (this.cardsBox.length == 0) {
            console.log("cardsBox is empty");
            return (["cards box is empty"]);
        }
        // ok, now i'm shure, that we need use current cardsBox
        if (!this.sorted) {
            this.sort();
        }

        for (var i = 0; i < this.cardsBox.length; i++) {
            travelText.push(this.getTextCard(this.cardsBox[i]));
        }

        this.cardsBox = [];

        return travelText;
    }

    /**
     * Construct text from card with user defined order
     * @see this.transportOrder
     * @private
     * @param card
     * @returns {string}
     */
    this.getTextCard = function (card) {
        var currentCard = card;
        var text;

        if (!needOrder(this.order)) {
            defaultOrder();
        }

        return text;

        function isHave(prop) {
            if (prop != "") {

                return (" " + prop);
            } else {
                return "";
            }
        }
        function needOrder (order) {
            for (var wordOrder in order) {
                if (currentCard.transportType == wordOrder) {
                    switch (order[wordOrder]) {
                        case 0:
                        {
                            return false;
                        }
                        case 1:
                        {
                            text = "From " + currentCard.startTown + ", take " + currentCard.transportType
                                + isHave(currentCard.transportInfo)
                                + " to " + currentCard.endTown + "." + isHave(currentCard.travelInfo);
                            return true;
                        }
                        case 2:
                        {
                            text = "From " + currentCard.startTown + " to " + currentCard.endTown
                                + ", take " + currentCard.transportType + isHave(currentCard.transportInfo) + "."
                                + isHave(currentCard.travelInfo);
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        function defaultOrder () {
            text = "Take " + currentCard.transportType + isHave(currentCard.transportInfo) + " from "
                + currentCard.startTown + " to " + currentCard.endTown + "." + isHave(currentCard.travelInfo);
            return text;
        }
    }

}

/* USE Section /
var cards = new TravelCadrs();



function numAdd () {
cards.add("3", "4");
cards.add("5", "6");
cards.add("4", "5");
cards.add("0", "1");
cards.add("2", "3");
cards.add("1", "2");
}

function wordsAdd () {

 cards.add( "Moscow", "Kiev");
 cards.add( "Vologda", "Miami");
 cards.add("Leningrad","Moscow","train", "48A", "Seat 28. Baggage Drop gate 40");
 cards.add("London","Oslo", "airport bus");
 cards.add("Kiev","London","fly", "s98","Passengers are dangerous");
 cards.add( "Vladimir", "Leningrad");
 cards.add( "Oslo", "Irkutsk");
 cards.add( "Miami", "defaultCity");
 cards.add( "defaultCity", "Vladimir");
}

//numAdd();
wordsAdd();

//cards.sort();


cards.transportOrder({fly: 1, train: 2});


console.log(cards.takeCards_And_GiveMeTravel());



/* TEST Section /

function showSortedThreads(sCards) {
    for (var i = 0; i < sCards.length; i++) {
        console.log("start - " + sCards[i].startTown + " -- end - " + sCards[i].endTown);
        console.log("first way:");

        // from end to start
        for (var y = sCards[i].srtdStartThread.length - 1; y >= 0; y--) {
            var towns = sCards[i].srtdStartThread[y];
            console.log(y + ": " + sCards[i].srtdStartThread[y].startTown + " - " + sCards[i].srtdStartThread[y].endTown);
        }
        console.log("second way:");
        // from start to end
        for (y = 0; y < sCards[i].srtdEndThread.length; y++) {
            towns = sCards[i].srtdEndThread[y];
            console.log(y + ": " + sCards[i].srtdEndThread[y].startTown + " - " + sCards[i].srtdEndThread[y].endTown);
        }
    }
}

function consoleShowWay(sCards) {

    for (var i = 0; i < sCards.length; i++) {
        console.log(sCards[i].startTown + " - " + sCards[i].endTown);
    }

}

*/
