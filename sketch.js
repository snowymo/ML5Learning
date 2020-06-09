// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.0
console.log('ml5 version:', ml5.version);

let mobileNet;
let panda;
let video;
let slider;
let trainButton;
let addButton;
let predictor;
let value=0;

function modelReady() {
    console.log("Model is ready");
    // mobileNet.predict(predictReady);
}

function predictReady(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        value = results.value;
        // fill(255);
        // textSize(25);
        // let textHeight = height-40;
        // results.forEach(element => {
        //     text(element.confidence.toFixed(3) + "\t:\t" + element.label, 10, textHeight);
        //     textHeight += 20;
        // });
        // mobileNet.predict(predictReady);
        predictor.predict(predictReady);
    }
}

function imageReady() {
    image(panda, 0, 0, width, height-60);
}

function videoReady(){
    console.log("Video is ready");
}

function whileTraining(loss){
    if(loss == null){
        console.log("Training is complete");
        predictor.predict(predictReady);
    }else{
        console.log(loss);        
    }
}

function setup() {
    createCanvas(640, 480);
    // panda = createImg("images/panda.jpg", imageReady);
    // panda.hide();
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    slider = createSlider(0,1,0.5,0.01);
    addButton = createButton("add image");
    addButton.mousePressed(function(){
        predictor.addImage(slider.value());
    })
    trainButton = createButton("train");
    trainButton.mousePressed(function(){
        predictor.train(whileTraining);
    })
    // mobileNet = ml5.imageClassifier('MobileNet',video, modelReady);
    mobileNet = ml5.featureExtractor("MobileNet", modelReady);
    predictor = mobileNet.regression(video, videoReady);
}

function draw() {
    image(video,0,0);
    rectMode(CENTER);
    fill(200,0,255);
    rect(value * width, height/2, 50, 50);

}