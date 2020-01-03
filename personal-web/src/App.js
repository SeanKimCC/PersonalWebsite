import React from 'react';
import pdf from './assets/Sean_Resume.pdf'
import './App.css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';  

const getPixelRatio = context => {
  var backingStore =
  context.backingStorePixelRatio ||
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio ||
  1;
  
  return (window.devicePixelRatio || 1) / backingStore;
};



const getStarPos = (w, h, mouseX, mouseY) => {
  var stars = [];
  var count =  w * 0.1;
  if (count > 400) count = 400;
  for (var i=0; i<count; i++) {
    const xCoor = Math.random()*w;
    const yCoor = Math.random()*h;
    var star = {origX: xCoor, origY: yCoor, x: xCoor, y: yCoor};
    var dist = Math.hypot(star.x - mouseX, star.y - mouseY);
    var brightnessAmp = 0;
    var sizeAmp = 0;
    if(dist <= 20){
      brightnessAmp = 0.5;
      sizeAmp = 5;
    }else if(dist < 100){
      brightnessAmp = (20/dist)*0.5;
      sizeAmp = (20/dist)*5;
    }
    star.brightness = 1 - brightnessAmp;
    star.origSize = (Math.random()+0.3) * 5 + sizeAmp;
    star.size = star.origSize;
    stars.push( star );
  }
  return stars
}
const updateStarBrightness = (stars, mouseX, mouseY) => {
  for(var i =0; i < stars.length; i++){
    var dist = Math.hypot(stars[i].x - mouseX, stars[i].y - mouseY);
    var sizeAmp = 0;
    var brightnessAmp = 0;
    if(dist <= 20){
      brightnessAmp = 0.5;
      sizeAmp = 8;
    }else if(dist < 100){
      brightnessAmp = (20/dist)*0.5;
      sizeAmp = (20/dist)*8;
    }else{

    }
    stars[i].brightness = 1 - brightnessAmp;
    stars[i].size = stars[i].origSize+sizeAmp;
  }
  return stars;
  
}
// function Star(size, brightness, x, y){
//   let ref = useRef();
//   this.x = x;
//   this.y = y;
//   this.draw = function(){
//     let canvas = ref.current;
//     let c = canvas.getContext('2d');
//     c.beginPath();
//     c.moveTo(x,y);
//     c.lineTo(x+size, y+size - 5);
//     c.lineTo(x+size+size, y);
//     c.lineTo(x+size+5, y+size);
//     c.lineTo(x+size+size, y+size+size);
//     c.lineTo(x+size, y+size+5);
//     c.lineTo(x, y+size+size);
//     c.lineTo(x+size-5, y+size);
//     c.lineTo(x,y);
//     c.stroke();
//   }
// }

// var star1 = Star(30, 0, 100,100);

const StarsCanvas = () => {
  let ref = useRef();
  
  const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});
  const [mousePos, setMousePos] = useState({x : windowSize.width/2, y:windowSize.height/2});
  const [starsPos, setStarsPos] = useState(getStarPos(windowSize.width, windowSize.height, mousePos.x, mousePos.y));

  const updateWidthAndHeight = () => {
    setWindowSize({width: window.innerWidth, height: window.innerHeight});
    setStarsPos(getStarPos(window.innerWidth, window.innerHeight, window.innerWidth, window.innerHeight));
  };
  const updateMousePos = (e) => {
    //set moustX and Y to updated mouse location
    setMousePos({x: e.x, y: e.y});
    setStarsPos(updateStarBrightness(starsPos, e.x, e.y));
  }

  // var stars = [];
  // var r = Math.min(windowSize.width, windowSize.height) * 1;
  // var count =  windowSize.width * 0.1;
  // if (count > 200) count = 200;
  // for (var i=0; i<count; i++) {
  //   var star = {x: Math.random()*r-Math.random()*r, y: Math.random()*r-Math.random()*r };
  //   star.brightness = 0.1
  //   stars.push( star );
  // }


  useEffect(() => {
    window.addEventListener("mousemove", updateMousePos);
    return () => {
      window.removeEventListener("mousemove", updateMousePos);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  useEffect(() => {
    let canvas = ref.current;
    let c = canvas.getContext('2d');

    let ratio = getPixelRatio(c);

    canvas.width = windowSize.width * ratio;
    canvas.height = windowSize.height * ratio;
    canvas.style.width = `${windowSize.width}px`;
    canvas.style.height = `${windowSize.height}px`;

    function starFn(starElem){
      this.x = starElem.x * ratio;
      this.y = starElem.y * ratio;
      this.size = starElem.size;
      this.brightness = starElem.brightness;
      this.shiningConstant = starElem.shiningConstant;


      this.draw = function(){
        

        c.beginPath();
        c.moveTo(this.x,this.y);
        c.lineTo(this.x+this.size, this.y+this.size - (this.size*2/5));
        c.lineTo(this.x+this.size+this.size, this.y);
        c.lineTo(this.x+this.size+(this.size*2/5), this.y+this.size);
        c.lineTo(this.x+this.size+this.size, this.y+this.size+this.size);
        c.lineTo(this.x+this.size, this.y+this.size+(this.size*2/5));
        c.lineTo(this.x, this.y+this.size+this.size);
        c.lineTo(this.x+this.size-(this.size*2/5), this.y+this.size);
        c.lineTo(this.x,this.y);
        c.fillStyle = "rgba(255,255,255,"+this.brightness+")";
        c.fill();
      }

      
    }

    function squareStarsFn(starElem){
      this.x = starElem.x * ratio;
      this.y = starElem.y * ratio;
      this.size = starElem.size;
      this.brightness = starElem.brightness;
      this.starSpeed = 0.25;
      // this.shiningConstant = starElem.shiningConstant;
      this.draw = function(){
        c.shadowColor = "rgb(255,255,255)";
        c.shadowBlur = 10;
        c.beginPath();
        c.rect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
        c.fillStyle = "rgba(255,255,255,1)";
        c.fill();
      }
      this.update = function(){
        const randNum1 = Math.random() - 0.5;
        const randNum2 = Math.random() - 0.5;

        var upDownStill = 0;
        if(randNum1 > 0.1){
          upDownStill = this.starSpeed;
        } else if(randNum1 < 0.1) {
          upDownStill = -this.starSpeed;
        }

        var leftRightStill = 0;
        if(randNum2 > 0.1){
          leftRightStill = this.starSpeed;
        } else if(randNum2 < 0.1) {
          leftRightStill = -this.starSpeed;
        }

        if(this.x > (starElem.origX * ratio)  && Math.abs(this.x - starElem.origX * ratio )>= 5){
          starElem.x -= 1/ratio;
        } else if (this.x < (starElem.origX * ratio)  && Math.abs(this.x - starElem.origX * ratio ) >= 5){
          starElem.x += 1/ratio;
        } else{
          starElem.x += leftRightStill/ratio;
        }

        if(this.y > (starElem.origY * ratio)  && Math.abs(this.y - starElem.origY * ratio )>= 5){
          starElem.y -= 1/ratio;
        } else if (this.y < (starElem.origY * ratio)  && Math.abs(this.y - starElem.origY * ratio ) >= 5){
          starElem.y += 1/ratio;
        } else{
          starElem.y += upDownStill/ratio;
        }

        this.draw();

      }
    }

    let requestId;
    const render = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);
      // c.beginPath();
      // c.arc(
      //    canvas.width / 2,
      //    canvas.height / 2,
      //   (canvas.height / 2) * Math.abs(Math.cos(i)),
      //    0,
      //    2 * Math.PI
      // );
      // c.fill();
      // i += 0.05;
      for(var i = 0; i < starsPos.length; i++){
        // var star = new starFn(starsPos[i]);
        // star.draw();
        var sqrStar = new squareStarsFn(starsPos[i]);
        sqrStar.update();
        // let x, y, size, brightness;
        // x = starsPos[i].x * ratio;
        // y = starsPos[i].y * ratio;
        // size = starsPos[i].size;

        // c.beginPath();
        // c.moveTo(x,y);
        // c.lineTo(x+size, y+size - (size*2/5));
        // c.lineTo(x+size+size, y);
        // c.lineTo(x+size+(size*2/5), y+size);
        // c.lineTo(x+size+size, y+size+size);
        // c.lineTo(x+size, y+size+(size*2/5));
        // c.lineTo(x, y+size+size);
        // c.lineTo(x+size-(size*2/5), y+size);
        // c.lineTo(x,y);
        // c.fillStyle = "rgba(255,255,255,"+starsPos[i].brightness+")";
        // c.fill();

      }
      requestId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });
  


   
   return (
       <canvas
           className="main-canvas"
           ref={ref} 
           data-paper-resize
       />
   );
};


function App(){
 return(<div>
     <div className="title-container">
       <span>Hello, I'm</span><span id="nameTitle"> Sean Kim</span><span>.</span>
       <div className="link-container">
         <a className="main-link" target="_blank" href="https://github.com/SeanKimCC">Github</a>
         <a className="main-link" target="_blank" href={pdf}>Resume</a>
       </div>
       
      </div>
     <StarsCanvas/>
   </div>)
}


export default App;
