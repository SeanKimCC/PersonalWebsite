import React from 'react';
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
  var hr = h;
  var wr = w;
  var count =  w * 0.1;
  if (count > 200) count = 200;
  for (var i=0; i<count; i++) {
    var star = {x: Math.random()*wr, y: Math.random()*hr};
    var dist = Math.hypot(star.x - mouseX, star.y - mouseY);
    // console.log(dist);
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
    star.size = 5 + sizeAmp;
    stars.push( star );
  }
  // console.log("here", stars);
  return stars
}
const updateStarBrightness = (stars, mouseX, mouseY) => {
  for(var i =0; i < stars.length; i++){
    var dist = Math.hypot(stars[i].x - mouseX, stars[i].y - mouseY);
    var sizeAmp = 0;
    var brightnessAmp = 0;
    if(dist <= 20){
      brightnessAmp = 0.5;
      sizeAmp = 5;
    }else if(dist < 100){
      brightnessAmp = (20/dist)*0.5;
      sizeAmp = (20/dist)*5;
    }
    stars[i].brightness = 1 - brightnessAmp;
    stars[i].size = 5+sizeAmp;
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

  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);
  const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});
  const [mousePos, setMousePos] = useState({x : windowSize.width/2, y:windowSize.height/2});
  const [starsPos, setStarsPos] = useState(getStarPos(windowSize.width, windowSize.height, mousePos.x, mousePos.y));

  const updateWidthAndHeight = () => {
    // console.log("resized");
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

        let x, y, size, brightness;
        x = starsPos[i].x * ratio;
        y = starsPos[i].y * ratio;
        size = starsPos[i].size;

        c.beginPath();
        c.moveTo(x,y);
        c.lineTo(x+size, y+size - (size*2/5));
        c.lineTo(x+size+size, y);
        c.lineTo(x+size+(size*2/5), y+size);
        c.lineTo(x+size+size, y+size+size);
        c.lineTo(x+size, y+size+(size*2/5));
        c.lineTo(x, y+size+size);
        c.lineTo(x+size-(size*2/5), y+size);
        c.lineTo(x,y);
        c.fillStyle = "rgba(255,255,255,"+starsPos[i].brightness+")";
        c.fill();
      }
      requestId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [starsPos]);
  


   
   return (
       <canvas
           className="main-canvas"
           ref={ref} 
           data-paper-resize
       />
   );
};


function App(){
 return(<StarsCanvas/>)
}


export default App;
