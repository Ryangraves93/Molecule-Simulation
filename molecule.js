class Molecule {
    constructor(){
        this.position = createVector(random(width),random(height));
        this.velocity = createVector(random(-2,2),random(-2,2));
        this.radius = random(minRadius,maxRadius);
    }
    
    
    render() {
        stroke(0,0,200);
        strokeWeight(1)
        fill(255,0,0);
        push()
            translate(this.position.x,this.position.y)
            ellipse(0,0,this.radius*2,this.radius*2);
        pop();
    }
    
    step() {
        this.position.add(this.velocity);
    }
    
    checkEdges(){
        
        if(this.position.x < 0 || this.position.x > width){
            this.velocity.x = this.velocity.x * -1
        }
        
        if(this.position.y < 0 || this.position.y > height){
            this.velocity.y = this.velocity.y * -1
        }
    }
    
    
    
}