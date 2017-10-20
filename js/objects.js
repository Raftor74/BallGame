//Class for all Ellipse objects
class EllipseObject {
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.radius = this.size / 2;
    }

    draw(){
        fill(this.color);
        ellipse(this.x,this.y,this.size);
    }
}
