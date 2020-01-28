//Variable declaration for molecules
const numOfMolecules = 100;
let interSectionCount = 0;
let minRadius = 15;
let maxRadius = 30;
let numberOfChecks = 0;

//Variable declaration for Rows & Width
let numberOfRows = 5;
let numberOfCols = 5;
let rowWidth;
let colHeight;

let x = 20;
let y = 20;

//Variable declaration for arrays
let molecules = [];
let tempArray = [];
let moleculeKeyArray = [];


function setup() {
    
    createCanvas(600, 640);
    background(127);
    rowWidth = width/numberOfRows;
    colHeight = height/numberOfCols;
    
    //For every number of molecules, creates a new class molecule
    //and add it to the molecules array
    for (let i = 0; i < numOfMolecules; i++) {
        molecules.push(new Molecule(i));
        
    }   
    //noLoop()
}

function draw() {
    background(127);

    
    resetBalls();
    drawGrid();
    splitIntoGrids();
    CheckIntersections();
    drawCol();
    drawFR();
    
    molecules.forEach(molecule => {
        molecule.render();
        molecule.checkEdges();
        molecule.step(); 
        
    });
   
}

//The resetBalls is called after any intersections to return the molecule to it's original color
function resetBalls()
    {
        molecules.forEach(molecule => {
        molecule.r = 255;
        molecule.g = 0;
        
        });
        
    }


//The SplitIntoGrids Functions will loop through the rows & columns, then add an array to each corresponding
//segment and then check the position of the molecule.If a molecule is positioned between it's borders it
//will therefore be pushed into a moleculeKeyArray which will than check for collisions.
function splitIntoGrids(){
    
moleculeKeyArray = [];
    
for (let i =0; i < numberOfRows; i++){
    for (let j = 0; j < numberOfCols; j++){
        tempArray = [];
        molecules.forEach(molecule => {
            if ((molecule.position.x > rowWidth*j  
                 && molecule.position.x < rowWidth*(j+1)) && 
                (molecule.position.y > colHeight *i && molecule.position.y < colHeight*(i+1)))
                
                {
                     tempArray.push(molecule);//Pushes molecule into a temp array
                }  
        });
        
        moleculeKeyArray.push(tempArray);//Push the temp array into new array to be checked for collision
        }
    }
}

//The drawGrid functionn will be used to place a grid using rectangles on the screen for development
//purposes
function drawGrid(){
    for (let i =0; i <= numberOfRows; i++){
        for (let j = 0; j <= numberOfCols; j++)
            {
                noFill();
                rect(rowWidth*i,colHeight*j,rowWidth,colHeight);
                stroke(0,0,0,60);
                
            }
    }
}

//DrawCol is a HUD for any collisions occuring
function drawCol(){
    fill(255);
    textSize(22);
    text('Collisions: ' + interSectionCount,300,30);
    numberOfChecks = 0;
    interSectionCount = 0;
}

//DrawFR is a HUD for the current frame rate
function drawFR(){
    fill(255);
    textSize(22);
    text('Fr: ' + frameRate().toFixed(0),10,30);
}
   
//CheckIntersections will loop through every molecule within the moleculeKeyArray and for each one it will
//create two loop iterations, compare the distance between the two and if the distance is less than the 
//diameter it will increment the intersect count
function CheckIntersections () {
  
    moleculeKeyArray.forEach(molecule =>{
        if (molecule.length > 1)
            {         
                for(let i = 0;i < molecule.length;i++){  
                    for (let j =i+1;j< molecule.length;j++){
                        numberOfChecks++;
                        let distanceVec = p5.Vector.sub(molecule[i].position,molecule[j].position);
                        let distanceMag = distanceVec.mag();
                            if (distanceMag < molecule[i].radius + molecule[j].radius)
                                {
                                    interSectionCount++;
                                    molecule[i].r = 0;
                                    molecule[j].r = 0;
                                    molecule[i].g = 255;
                                    molecule[j].g = 255;
                                    
                                }
                        
            }
          }
        }
        
                                    
    });
}
    

    