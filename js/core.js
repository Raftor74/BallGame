let width = 800;
let height = 600;
let maxBoosts = 250;
let maxScopes = 200;
let boostSize = 13;
let scopeSize = 15;
let scopeValue = 15;
let winScope = 2000;
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
    'GOLD':[255,215,0],
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
    drawEllipseObjects(boosts,scopes,playerOne,playerTwo);
    movePlayers(playerOne,playerTwo);
    checkWinCondition(playerOne,playerTwo);
    boosts = eatBoost(boosts,playerOne,playerTwo);
    scopes = eatScope(scopes,playerOne,playerTwo);
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
    let size = boostSize;
    let color;
    let power;
    let direction = Math.floor(random(-1,1));
    let force = Math.floor(random(-1,1));
    if (direction === -1) {
        if (force === -1) {
            power = Math.floor(random(-10, -5));
            color = colors["RED"];
        } else {
            power = Math.floor(random(20, 25));
            color = colors["PURPURE"];
        }
    } else {
        power = Math.floor(random(20, 25));
        color = colors["GOLD"];
        if (force === -1) {
            power = power*force;
        }
    }
    let boost = new Boost(x,y,size,color,power,direction);
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

//Check the circles intersect
function inEllipseArea(obj1,obj2) {
    if (!(obj1 instanceof EllipseObject && obj2 instanceof EllipseObject))
        throw new Error("Objects must be ellipses. inEllipseArea method");

    let d = dist(obj1.x, obj1.y, obj2.x, obj2.y);
    if (obj1.radius + obj2.radius > d)
        return true;
    else
        return false;
}

function setWinner(text) {
    $('#winner').html(text);
    noLoop();
}

function setPlayerScope(i,scope) {
    $('#player_' + i + '_scope').html(scope);
}

function setPlayerTwoScope(scope) {
    $('#player_two_scope').html(scope);
}

function spawnPlayers() {
    playerOne = new Player(0, height / 2 - 5, 10, [255, 0, 0]);
    playerTwo = new Player(0, height / 2 + 5, 10, [255, 255, 0]);
}


function eatBoost(boosts, ...players) {
    for (let i = boosts.length - 1; i>=0; i--)
    {
        for (let j = 0; j < players.length; j++)
        {
            if (boosts[i]){
                if(inEllipseArea(players[j],boosts[i]))
                {
                    if (boosts[i].direction === -1)
                        players[j].x += boosts[i].power;
                    else
                        players[j].y += boosts[i].power;
                    boosts.splice(i,1);
                }
            }
        }
    }
    return boosts;
}

function eatScope(scopes,...players) {
    for (let i = scopes.length - 1; i>=0; i--)
    {
        for (let j = 0; j < players.length; j++)
        {
            if (scopes[i]) {
                if(inEllipseArea(players[j],scopes[i]))
                {
                    players[j].scope += scopes[i].scope;
                    setPlayerScope(j+1,players[j].scope);
                    scopes.splice(i,1);
                }
            }
        }
    }
    return scopes;
}

//Draw all Ellipse objects
//Can draw array of objects or single object
function drawEllipseObjects(...params) {

    for (let i = 0; i < params.length; i++)
    {
        let object = params[i];
        if (Array.isArray(object)){

            for (let j = object.length - 1; j>=0; j--)
            {
                if(!(object[j] instanceof EllipseObject))
                    throw new Error ("Cannot draw no Ellipse object. drawEllipseObjects function");
                object[j].draw();
            }

        } else {
            if(!(object instanceof EllipseObject))
                throw new Error ("Cannot draw no Ellipse object. drawEllipseObjects function");
            object.draw();
        }
    }
}

//Check if player wins
function checkWinCondition(...params) {
    for (let i = 0; i < params.length; i++)
    {
        if (!params[i] instanceof Player)
            throw new Error ("Error argument. checkWinCondition function");

        if (params[i].x === width || params[i].scope === winScope)
            setWinner("PLAYER " + (i+1) + " WIN");
    }
}

function movePlayers(...params) {
    for (let i = 0; i < params.length; i++)
    {
        if (!params[i] instanceof Player)
            throw new Error ("Error argument. MovePlayers function");
        params[i].randomMove();
    }
}

function spawnBoosts() {
    while(boosts.length < maxBoosts)
        spawnBoost();
}

function spawnScopes() {
    while(scopes.length < maxScopes)
        spawnScope();
}