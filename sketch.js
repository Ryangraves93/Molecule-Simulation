let molecules = [];
const numOfMolecules = 20;
let interSectionCount = 0;
let minRadius = 15;
let maxRadius = 30;
let numberOfChecks = 0;
let numberOfRows = 10;
let numberOfCols = 10;
let rowWidth;
let colHeight;
let x = 20;
let y = 20;
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
        molecules.push(new Molecule());
        
    }
}

function draw() {
    background(127);

    molecules.forEach(molecule => {
        molecule.render();
        molecule.checkEdges();
        molecule.step();
        //moleculeKeyArray.push(molecule);
        
    });
    CheckCollision00(); 
    drawGrid();
    drawCol();
    drawFR();
    splitIntoGrids();
}

function splitIntoGrids(){
  
    
        for (let i =0; i < numberOfRows; i++)
        {
            tempArray[i] = [];
        for (let j = 0; j < numberOfCols; j++)
            {
                tempArray[i][j] = [];
            }
    }
       
    }


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

function drawCol(){
    fill(255);
    textSize(14);
    text('Collisions: ' + interSectionCount,300,30);
    numberOfChecks = 0;
    interSectionCount = 0;
}

function drawFR(){
    fill(255);
    textSize(14);
    text('Fr: ' + frameRate().toFixed(0),10,30);
}
   

function CheckCollision00 () {
 
    //console.time("Checkintersections00");
    for(let i = 0;i < molecules.length;i++){  
            for (let j =0;j< molecules.length;j++){
                
                numberOfChecks++;
                    let distanceVec = p5.Vector.sub(molecules[i].position,molecules[j].position);
                    let distanceMag = distanceVec.mag();
                
                    if (distanceMag < 50)
                        {
                            interSectionCount++;
                            
                        }
                  
                  
            }
        }
    //console.log("Number of checks = " + numberOfChecks);
    //console.timeEnd("Checkintersections00");
    }

    

function CheckCollision01 () {
 
    //console.time("Checkintersections01");
    for(let i = 0;i < molecules.length;i++){  
            for (let j =i+1;j< molecules.length;j++){
                
                numberOfChecks++;
                    let distanceVec = p5.Vector.sub(molecules[i].position,molecules[j].position);
                    let distanceMag = distanceVec.mag();
                
                    if (distanceMag < 50)
                        {
                            interSectionCount++;
                            
                        }
                  
                  
            }
        }
    //console.log("Number of checks = " + numberOfChecks);
    //console.timeEnd("Checkintersections01");
    }