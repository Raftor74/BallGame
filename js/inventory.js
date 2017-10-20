//Class for Boosts objects
class Boost extends EllipseObject {
    constructor(x,y,size,color,power,direction = -1){
        super(x,y,size,color);
        this.power = power;
        //-1 - x axis, 1 - y axis
        this.direction = direction;
    }
}

//Class for ScopePoints objects
class ScopePoint extends EllipseObject{
    constructor(x,y,size,color,scope = 0){
        super(x,y,size,color);
        this.scope = scope;
    }
}