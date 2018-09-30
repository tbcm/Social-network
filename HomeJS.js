function showAllPeople() {
    $.getJSON("data.json", function (data) {
        let objMap = { "JObject": data };
        let json1 = JSON.stringify(objMap)

        $.each(data, function (key, value) {
            $("#listOfPeople").append("<li>" +
                "Id: " + value.id + " FirstName: " + value.firstName + " Surname:" + value.surname + " Friends:" + value.friends +
                "<div class='buttons'>" +
                " <button class='target11' type='button' onclick='showDirectFirends(" + value.id + ", [" + value.friends + "])'>Direct friends</button>" +
                " <button type='button' onclick='showFriendsOfFriends(" + value.id + ", [" + value.friends + "])'>Friends of friends</button>" +
                " <button type='button' onclick='showSuggestedFriends(" + value.id + ", [" + value.friends + "])'>Suggested friends</button>" +
                "</div>" + "</li>");

        });
    });
}

function showDirectFirends(myId, myFriends) {
    setTable(myId, "Direct firends");

    $.getJSON("data.json", function (data) {
        $.each(data, function (key, value) {
            if (myFriends.includes(value.id)) {
                $("#tBody").append("<tr> <th>" + value.id + "</th> <th>" + value.firstName + "</th> <th>" + value.surname + "</th> <th>" + value.age + "</th> <th>" + value.gender + "</th> </tr>")
            }
        });
    });
}

function showFriendsOfFriends(myId, myFriends) {
    let friendsOfFriends = [];

    setTable(myId, "Friends of friends");

    $.getJSON("data.json", function (data) {
        $.each(data, function (key, value) {
            if (myFriends.includes(value.id)) {
                $.each(value.friends, function (key1, value1) {
                    friendsOfFriends.push(value1);
                });
            }
        });

        $.unique(friendsOfFriends);

        let indexOfMyId = friendsOfFriends.indexOf(myId);
        if (indexOfMyId != -1) {
            friendsOfFriends.splice(friendsOfFriends.indexOf(myId), 1);
        }

        let friendsOfFriendsAfterFilter = friendsOfFriends.filter(val => myFriends.indexOf(val) == -1)

        $.each(data, function (key, value) {
            if (friendsOfFriendsAfterFilter.includes(value.id)) {
                $("#tBody").append("<tr> <th>" + value.id + "</th> <th>" + value.firstName + "</th> <th>" + value.surname + "</th> <th>" + value.age + "</th> <th>" + value.gender + "</th> </tr>")
            }
        });
    });
}

function showSuggestedFriends(myId, myFriends) {
    setTable(myId, "Suggested friends");

    $.getJSON("data.json", function (data) {
        $.each(data, function (key, value) {
            if (value.id != myId && !myFriends.includes(value.id)) {
                let commonFriends = value.friends.filter(val => myFriends.indexOf(val) != -1);

                if (commonFriends.length >= 2) {
                    $("#tBody").append("<tr> <th>" + value.id + "</th> <th>" + value.firstName + "</th> <th>" + value.surname + "</th> <th>" + value.age + "</th> <th>" + value.gender + "</th> </tr>")
                }
            }
        });
    });
}

function setTable(id, option) {
    $("#tBody").empty();
    $("#idOfChosenPerson").text(id);
    $("#chosenOption").text(option);
}