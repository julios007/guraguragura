var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,BubbleImg, bulletImg, backBoardImg,redBubbleImg;
var gunAnime;
var blueBubbleGroup, redBubbleGroup, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("cowboy1.png");
  gunAnime = loadAnimation("cowboy2.png","cowboy3.png");
  bulletImg = loadImage("bullet1.png");
  bubbleImg = loadImage("fantasmaazul-removebg-preview.png");
  redBubbleImg = loadImage("fantasmaVermelho.jpg");
  backBoardImg= loadImage("fundo velho oeste.jpg");
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  //backBoard= createSprite(50, width/2, 100,height);
  //backBoard.addImage(backBoardImg);
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage("cowboy",gunImg);
  gun.addAnimation("cowboyA",gunAnime);
  gun.scale=0.3
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backBoardImg);
  
  heading.html("Vidas: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Pontuação: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      shootBullet();
      gun.changeAnimation("cowboyA",gunAnime);
    }

    if (blueBubbleGroup.collide(gun)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(gun)) {
      handleGameover(redBubbleGroup);
    }
    
  
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage("fantasmazul",BubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage("fantasmaver",redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage("bala",bulletImg);
  bullet.scale=0.10;
  bullet.velocityX= 7;
  bulletGroup.add(bullet);
 
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

     
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2;
      
      swal({
        title: `Fim de Jogo`,
        text: "Oops você perdeu o jogo!",
        text: "Sua pontuação é: " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Obrigado por jogar"
      });
    }
  
}