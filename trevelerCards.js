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

var card(startCity, endCity, transportType, travelInfo) {
    var propStartCity = startCity;
    var propEndCity = endCity;
    var propTransportType = transportType;
    var propTravelInfo = travelInfo;
}

function funcAdd(startCity, endCity, transportType, travelInfo) {
    var currentCard = new card(startCity, endCity,transportType,travelInfo);

    return currentCard;

}

function funcSort(arrCards) {
    var sortedCards = arrCards;
    return true;
}