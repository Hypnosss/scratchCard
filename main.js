var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");

// 初始化数组
const width = canvas.width;
const height = canvas.height;
const penRadius = 25;
const maxPercentage = 0.5;
var squares = [];
for(let i = 0; i < width; i++) {
  squares[i] = [];
  squares[i].length = height;
  squares[i].fill(0);
}

// 初始化两个canvas的内容 
var img = new Image();
img.onload = function () {
  ctx2.drawImage(img, 0, 0, width, height);
}
img.src = "./wbz.jpg";

ctx.fillStyle = "gray";
ctx.fillRect(0, 0, width, height);


// 监听事件
var mousedown = 0;

canvas.onmousedown = function(e) {
  if(calScratchedAreaPercentage() < maxPercentage) {
    mousedown = 1;
    scratch(e);
    // console.log(calScratchedArea());
  } else {
    scratchAll();
  }
}

canvas.onmousemove = function(e) {
  if(mousedown) {
    if(calScratchedAreaPercentage() < maxPercentage) {
      scratch(e);
      // console.log(calScratchedArea());
    } else {
      scratchAll();
    }
  }
}

canvas.onmouseup = function() {
  mousedown = 0;
}


// 工具人
function calDis(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

function scratch(e) {
  let xStart = (e.offsetX - penRadius < 0) ? 0 : (e.offsetX - penRadius);
  let xEnd = (e.offsetX + penRadius >= width) ? (width - 1) : (e.offsetX + penRadius);
  let yStart = (e.offsetY - penRadius < 0) ? 0 : (e.offsetY - penRadius);
  let yEnd = (e.offsetY + penRadius >= height) ? (height - 1) : (e.offsetY + penRadius);
  
  // console.log(xStart, xEnd, yStart, yEnd);
  for(let i = xStart; i < xEnd; i++) {
    for(let j = yStart; j < yEnd; j++) {
      let dis = calDis(i, j, e.offsetX, e.offsetY);
      if(dis < penRadius) {
        squares[i][j] = 1;
      }
      if(squares[i][j] == 1) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillRect(i, j, 1, 1);
      }
      
    }
  }
}

function calScratchedAreaPercentage() {
  var scratchedArea = 0;
  for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
      if(squares[i][j] == 1) {
        scratchedArea ++;
      }
    }
  }

  return scratchedArea / (width * height);
}

function scratchAll() {
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillRect(0, 0, width, height);
  console.log("all!!")
}