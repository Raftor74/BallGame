let width = 800;
let height = 600;
let maxBoosts = 250;
let maxScopes = 200;
let boostSize = 13;
let scopeSize = 15;
let scopeValue = 15;
let playerOne, playerTwo;
let boosts = [];
let scopes = [];
let colors = {
    'RED':[255,0,0],
    'GREEN':[0,255,0],
    'BLUE':[0,0,255],
    'SKY' : [85,170,255],
    'WHITE':[255,255,255],
    'BROWN':[205,133,63],
    'GRAY':[160,160,160],
    'PURPURE':[255,0,255],
};


function setup() {
    let canvas = createCanvas(width,height);
    canvas.parent('playground_holder');
    frameRate(30);
    init();
    noLoop();
}

function draw(){
    background(0);
    spawnBoosts();
    spawnScopes();
    drawBoosts();
    drawScopes();
    playerOne.draw();
    playerTwo.draw();
    playerOne.randomMove();
    playerTwo.randomMove();
    if (playerOne.x === width) {
        setWinner("PLAYER ONE WIN");
    }
    if (playerTwo.x === width) {
        setWinner("PLAYER TWO WIN");
    }

    for (let i = boosts.length - 1; i>=0; i--)
    {
        if(inEllipseArea(playerOne,boosts[i]))
        {
            playerOne.x += boosts[i].power;
            boosts.splice(i,1);
            continue;
        }
        if(inEllipseArea(playerTwo,boosts[i]))
        {
            playerTwo.x += boosts[i].power;
            boosts.splice(i,1);
            continue;
        }
    }

    for (let i = scopes.length - 1; i>=0; i--)
    {
        if(inEllipseArea(playerOne,scopes[i]))
        {
            playerOne.scope += scopes[i].scope;
            setPlayerOneScope(playerOne.scope);
            scopes.splice(i,1);
            continue;
        }
        if(inEllipseArea(playerTwo,scopes[i]))
        {
            playerTwo.scope += scopes[i].scope;
            setPlayerTwoScope(playerTwo.scope);
            scopes.splice(i,1);
            continue;
        }
    }
}

function init() {
    spawnPlayers();
    spawnBoosts();
    spawnScopes();
}

function startGame(sender) {
    let playerOneForm = $("#player_one_form");
    let playerTwoForm = $("#player_two_form");
    let playerOneInfo = CovertFormToArray(playerOneForm.serializeArray());
    let playerTwoInfo = CovertFormToArray(playerTwoForm.serializeArray());
    if(playerOneInfo["nick"])
        $('#player_one_nick').html(playerOneInfo["nick"]);
    if(playerTwoInfo["nick"])
        $('#player_two_nick').html(playerTwoInfo["nick"]);
    playerOneForm.remove();
    playerTwoForm.remove();
    sender.remove();
    loop();

}

function spawnBoost() {
    let x = Math.floor(random(playerOne.size, width - playerOne.size));
    let y = Math.floor(random(playerOne.size, height - playerOne.size));
    let color = colors["PURPURE"];
    let power = Math.floor(random(20,25));
    let size = boostSize;
    let d = [-1,1,2,3];
    let dir = Math.floor(random(d));
    if (dir < 0) {
        color = colors["RED"];
        power = Math.floor(random(-10, -5));
    }
    let boost = new Boost(x,y,size,color,power);
    boosts.push(boost);
}

function spawnScope() {
    let x = Math.floor(random(playerOne.size, width - playerOne.size));
    let y = Math.floor(random(playerOne.size, height - playerOne.size));
    let scope = scopeValue;
    let color = colors["SKY"];
    let size = scopeSize;
    let scopeItem = new ScopePoint(x,y,size,color,scope);
    scopes.push(scopeItem);
}

function CovertFormToArray(data){
    let result = {};
    $.each(data, function( i, keyname ) {
        result[keyname.name] = keyname.value;
    });
    return result;
}

function inEllipseArea(obj1,obj2) {
    let d = dist(obj1.x, obj1.y, obj2.x, obj2.y);
    if (obj1.r + obj2.r > d)
        return true;
    else
        return false;
}

function setWinner(text) {
    $('#winner').html(text);
    noLoop();
}

function setPlayerOneScope(scope) {
    $('#player_one_scope').html(scope);
}

function setPlayerTwoScope(scope) {
    $('#player_two_scope').html(scope);
}

function spawnPlayers() {
    playerOne = new Player(0, height / 2 - 5, 10, [255, 0, 0]);
    playerTwo = new Player(0, height / 2 + 5, 10, [255, 255, 0]);
}

function spawnBoosts() {
    while(boosts.length < maxBoosts)
        spawnBoost();
}

function drawBoosts() {
    for (let i = boosts.length - 1; i>=0; i--)
        boosts[i].draw();
}

function drawScopes() {
    for (let i = scopes.length - 1; i>=0; i--)
        scopes[i].draw();
}

function spawnScopes() {
    while(scopes.length < maxScopes)
        spawnScope();
}