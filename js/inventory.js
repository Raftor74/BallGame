function Boost(x,y,size,color,power) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.power = power;
    this.size = size;
    this.r = this.size / 2;

    this.draw = function () {
        fill(this.color);
        ellipse(this.x,this.y,this.size);
    }
}

function ScopePoint(x,y,size,color,scope) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.scope = scope;
    this.size = size;
    this.r = this.size / 2;

    this.draw = function () {
        fill(this.color);
        ellipse(this.x,this.y,this.size);
    }
}