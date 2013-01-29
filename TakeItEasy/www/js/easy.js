
var tails;
var tailHistory;
var currentTailIdx;

/* prepares new full set of tails */
function prepareTails() {
    var left = [2,6,7];
    var middle = [1, 5, 9];
    var right =  [3,4,8];
    
    var tails = [];
    
    for (var l = 0; l < 3; l++){
        for (var m = 0; m < 3; m++){
            for (var r = 0; r < 3; r++){
                tails.push([left[l], middle[m], right[r]]);
            }    
        }   
    }
    return tails;
}


/* Pick random tail pop it from tails list and return. */
function popRandomTail() {
    var randomNum = Math.floor(Math.random() * tails.length);
    var tail = tails[randomNum];
    tails[randomNum] = tails[tails.length-1];
    tails.pop();
    return tail;
}

function showTail(tail) {
    $("#left_line").text(tail[0]);
    $("#middle_line").text(tail[1]);
    $("#right_line").text(tail[2]);    
    updateTailNr();
}

function showCurrTail() {
    var tail = tailHistory[currentTailIdx];
    showTail(tail);
    updateTailNr();
}    

function updateTailNr() {
    $("#tail_nr").text("" + (currentTailIdx + 1));
}

/* Append new list element on the end of the tail history list */
function addTailToHistoryList(tail) {
    $("ul#tails_list").append($("<li></li>").text("" + tail));
    if ( $('#tails_list').hasClass('ui-listview')) {
        $('#tails_list').listview('refresh');
    } 
}

/* Show next tail in history or pick new one if we are
 * currently displaying last one.
 */
function showNextTail() {
    if (tailHistory.length == 0) {
        $("#no_tiles_msg").hide();
    }
    if (tails.length > 0 || currentTailIdx < tailHistory.length - 1) {
        currentTailIdx += 1;
        if (currentTailIdx == tailHistory.length) { 
            var newTail = popRandomTail();
            tailHistory.push(newTail);
            addTailToHistoryList(newTail);
        }
        showCurrTail();
    }
}

function showPrevTail() {
    if (currentTailIdx > 0) {
        currentTailIdx -= 1;
        showCurrTail();
    }
}

function initTailsHistoryList() {
    $("#tails_list").html("");
    $("#no_tiles_msg").show();
}

function initGame() {
    tails = prepareTails();
    tailHistory = [];
    initTailsHistoryList();
    currentTailIdx = -1;
    showTail(['x','x','x']);
    updateTailNr();
}

function initTakeItEasy() {
    initGame();
    $("#next_btn").on( "click", showNextTail);
    $("#prev_btn").on( "click", showPrevTail);
    $("#reset_btn").on( "click", initGame);
}

initTakeItEasy();
