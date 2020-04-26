board = [
    ["","",""],
    ["","",""],
    ["","",""]
  ];
  computer = 1;
  score = { "X" : -1 , "O" : 1 , "tie" : 0};
  function setup() {
    createCanvas(600, 600);
    players = ["X","O"];
    assumptionWinner = -1;
    currentPlayer = players[0];
    human = "X";
    ai = "O";
    turn = 0;
    w = width/3;
    h = height/3;
  }
  function mouseClicked()
  {
      currentPlayer = players[turn%2];
      var x = Math.floor(mouseX/w);
      var y = Math.floor(mouseY/h);
    if(board[x][y] == "")
    {
      board[x][y] = human;//currentPlayer;
      turn++;
    }
    if(checkWinner() == null)
    {
      if(computer && turn%2)
        {
          currentPlayer = ai;
          bestScore();
        }
    }
  }
  function checkWinner()
  {
    for(let r = 0; r < 3; r++)
    {
      if((board[r][0] == board[r][1] && board[r][1] == board[r][2]) && board[r][2] != "")
      {
        return board[r][0];
      }
    }
    // Vertical
    for(let c = 0; c < 3; c++)
    {
      if((board[0][c] == board[1][c] && board[1][c] == board[2][c]) && board[2][c] != ""){
        return board[0][c];
    }
    }
    // Diagonals
    if((board[0][0] == board[1][1] && board[1][1] == board[2][2]) && board[0][0] != "")
    { 
      return board[0][0];
    }
    if((board[0][2] == board[1][1] && board[1][1] == board[2][0]) && board[0][2] != "")
    {
      return board[0][2];
    }
    return null;
  }
  function colorLines()
  {
    var f1 , f2 , f3;
    if(turn%2)
      f1 = 200 , f2 = 0 ,f3 = 255;
    else
      f1 = 250 , f2 = 0 ,f3 = 0;
    
    fill(255,255,255);
    if (dist(mouseX, mouseY, 100,100) <= 100) {
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(0,0,width/3,width/3);
    }
    else if(dist(mouseX, mouseY, 300,100) <= 100){
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(200,0,width/3,width/3);
    }
    else if(dist(mouseX, mouseY, 500,100) <= 100){
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(400,0,width/3,width/3);
    }
    else if(dist(mouseX, mouseY, 100,300) <= 100){
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(0,200,width/3,width/3);
    }
    else if(dist(mouseX, mouseY, 300,300) <= 100){
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(200,200,width/3,width/3);
    }
    else if(dist(mouseX, mouseY, 500,300) <= 100){
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(400,200,width/3,width/3);
    }
    else if(dist(mouseX, mouseY, 100,500) <= 100){
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(0,400,width/3,width/3);
    }
    else if(dist(mouseX, mouseY, 300,500) <= 100){
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(200,400,width/3,width/3);
    }
    else if(dist(mouseX, mouseY, 500,500) <= 100)
    {
        stroke(f1,f2,f3);
        strokeWeight(4);
        rect(400,400,width/3,width/3);
    }
  }
  function result()
  {
      textSize(50);
      stroke(255);
      text("GAME OVER",150,300);
      textSize(50);
      stroke(255);
      var wins = checkWinner();
      if(wins == null)
      {
        text("Draw",250,500);
      }
      else
      {
        text("Player "+(score[wins]+1)+" Wins",150,500);
      }
     
  }
  function gameboard()
  {
    var w = width/3 , h = height/3;
    for(let i =1 ; i <= 2 ; i++)
      {
        stroke(255,255,255);
        line(w*i,0,w*i,height);
        line(0,h*i,width,h*i);
      }
      colorLines();
      for(let i = 0 ; i < 3 ; i++)
      {
        for(let j = 0; j < 3 ; j++)
        {
          let x = w*i+w/2;
          let y = h*j + h/2;
          let mark = board[i][j];
          textSize(32);
          stroke(0,0,2);
          strokeWeight(4);
          if(mark == players[1])
          {
            noFill();
            stroke(250,0,0);
            ellipseMode(RADIUS);
            ellipse(x,y,w/4);
          }
          else if(mark == players[0])
          {
            let xr = w/4;
            stroke(200,0,255);
            line(x-xr , y-xr , x+xr , y+xr);
            line(x+xr,y-xr,x-xr,y+xr);
          }
        }
      }
  }
  function draw(){
    background(0);
   if(checkWinner() != null || turn > 8)
   {
      result();
   }
   else
    {
      gameboard();
    }
  }
  function bestScore()
  {
    let bestscore = -Infinity;
    let move;
    for(let i = 0 ; i < 3 ; i++)
    {
      for(let j = 0 ; j < 3 ; j++)
      {
        if(board[i][j] == "")
        {
          board[i][j] = ai;
          let score = minimax(board , 0 , false , turn);
          board[i][j] = "";
          if(score > bestscore)
          {
            bestscore = score;
            move = {i,j};
            console.log(bestscore + "MOVE : " + i + " " +j);
          }
        }
      }
    }
    board[move.i][move.j] = ai;
    turn++;
  }
  function minimax(board , depth , isMaximizing , turns_count)
  {
    if(checkWinner() != null)
    {
      let wins = checkWinner();
      return score[wins];
    }
    else if(turns_count == 8)
    {
      return score["tie"];
    }
    if(isMaximizing){
      let bestScore = -Infinity;
      for(let i = 0 ; i < 3 ; i++)
      {
        for(let j = 0 ; j < 3 ; j++)
        {
          if(board[i][j] == "")
          {
            board[i][j] = ai;
            let score = minimax(board , depth+1 , false , turns_count+1);
            board[i][j] = "";
            bestScore = max(score , bestScore);
          }
        }
      }
      return bestScore;
    }
    else
    {
      let bestScore = Infinity;
      for(let i = 0 ; i < 3 ; i++)
      {
        for(let j = 0 ; j < 3 ; j++)
        {
          if(board[i][j] == "")
          {
            board[i][j] = human;
            let score = minimax(board , depth+1 , true , turns_count+1);
            board[i][j] = "";
            bestScore = min(score , bestScore);
          }
        }
      }
      return bestScore;
    }
  }