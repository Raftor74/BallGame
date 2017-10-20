function Player(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.r = this.size / 2;
    this.scope = 0;

    this.draw = function () {
        fill(this.color);
        ellipse(this.x, this.y, this.size);
    }

    this.randomMove = function () {
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
            this.y = 0;
        else if(this.y + moveY > height)
            this.y = height;
        else
            this.y += moveY;
    }
}