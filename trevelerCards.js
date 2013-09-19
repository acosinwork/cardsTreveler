/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 19.09.13
 * Time: 23:52
 * To change this template use File | Settings | File Templates.
 */

cards{
    var arrCards = [];
    add = arrCards.push(funcAdd());
    count = arrCards.length();
    //TODO funcSort
    sort = funcSort(arrCards);
    getTravelText = funcGetTravelText();

}

var card(startTown, endTown, transportType, travelInfo) {
    var propStartTown = startTown;
    var propEndTown = endTown;
    var propTransportType = transportType;
    var propTravelInfo = travelInfo;
}

function funcAdd(startTown, endTown, transportType, travelInfo) {
    var currentCard = new card(startTown, endTown, transportType, travelInfo);

    return currentCard;

}

function funcSort(arrCards) {
    var sortedCards = arrCards;
    var sortedCardsLength = arrCards.length();
    for (var i=sortedCardsLength; i>0; i--) {
        //node
        // sortedCards[i];
    }
    return true;
}

var node(intTownNumber) {
    TownNumber = intTownNumber;
    nextNode = null;
    nextSortedChildNode = null;
// TODO ctach this: prewiousTown = undefined;
}

var NodeList {
    var nodeCount = 0;
    addNode (townNumber, setNextNode) {
        var currentNode = new node(newNode);
        ++nodeCount;
        if (setNextNode !== undefined) {
            currentNode.nextNode() = setNextNode;
        }

    }
}
