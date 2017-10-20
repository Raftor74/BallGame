class Player extends EllipseObject{

    constructor (x, y, size, color, scope = 0){
        super(x,y,size,color);
        this.scope = scope;
    }

    randomMove() {
        let randomNum = [-7,-6,-5,-4,-3,3,4,5,6,7];
        let moveX = random(randomNum);
        let moveY = random(randomNum);
        if (this.x + moveX < 0)
            this.x = 0;
        else if(this.x + moveX > width)
            this.x = width;
        else
            this.x += moveX;

        if (this.y + moveY < 0)
            this.y = height + moveY;
        else if(this.y + moveY > height)
            this.y = moveY;
        else
            this.y += moveY;
    }
}