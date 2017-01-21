/* TicTacToe limitless
This script will load an array of TTT(tictactoe) game moves and analyse it to find the winner
This code can work on any size of board (has to be square though), it can also work on any number of players. Every player should have a distinct letter
or a word or a number.
*/
tTTAnalyze = function(moves){
  size = moves.length;
  //square dimention (length)
  d = Math.sqrt(size);
  if (d % 1 === 0){
    topRightCorner = (d - 1);
    bottomLeftCorner = (topRightCorner * d);
    bottomRightCorner = Math.pow(d, 2) - 1;
    //Start with checking the results.
    //Diagonal from top left corner to bottom right corner
    //First point in this diagonal is zero, second point is (d + 1) because we are starting from zero index instead of (1).
    secondPoint = d + 1;
    for(i =secondPoint; i <= bottomRightCorner;i += (d+1)){
      if(moves[i]){
        if(moves[i] == moves[0]){
          if(i == bottomRightCorner){
            return{
              size: d,
              winner: moves[0],
              end: 'win',
              winType: 'dia-LTR',
              point: i
            }
          }
        }
      }else{break}
    }

    //Second diagonal is from the top right corner to bottom left corner, the step is (d-1) which is also the top right corner
    for(i = topRightCorner; i <= bottomLeftCorner;i += topRightCorner){
      if(moves[i]){
        if(moves[i] == moves[topRightCorner]){
          if(i == bottomLeftCorner){
            return{
              size: d,
              winner: moves[i],
              end: 'win',
              winType: 'dia-RTL',
              point: i
            }
          }
        }
      }else{break}
    };

    //Check the columns, the bottom cells is calculated using the formula
    // bottomcell = topCell + (d * topRightCorner)
    for(topCell = 0; topCell <= topRightCorner;topCell++){
      bottomCell = (topCell + (d * topRightCorner));
      secondCell = topCell + d;
      //start from second cell because the comparison is done with the first cell.
      for(j = secondCell; j <= bottomCell; j += d){
        if(moves[j]){
          if(moves[j]==moves[topCell]){
            if(j == bottomCell){
          return{
            size: d,
            winner: moves[j],
            end: 'win',
            winType: 'col',
            point: topCell
          }
            }
          }else{
            break;
          }
        }
      }
    }
    //Check the rows
    for(i = 0; i <= bottomLeftCorner;i += d){
      //will start from the second item in the row since the comaprison is done with the first item(j = i+1) instead of (j = i)
      for(j =i+1; j <= (i+d-1);j++){
        if(moves[j]){
          if(moves[j]==moves[i]){
            if(j == (i+d-1)){
              return{
                size: d,
                winner: moves[j],
                end: 'win',
                winType: 'row',
                point: i
              }
            }
          }
        }else{
          break;
        }
      }
    }
    //If there is no win by this step, it means there is a draw
    return{
      size: d,
      end: 'draw'
    }

  }else{
    //Borad is not square!
  return{
    end: 'notAGame'
  }
  }

}
/* draw
This function deals with tTTAnalyze function output to draw the board and the winner for a better illustration of the game.
The function takes a div that acts like a canvas for drawing, and moves array as input.
Author: Mohammed Salman
github.com/muhis
*/
draw = function(divID, array){
  result = tTTAnalyze(array);
  d = result.size;
  document.getElementById(divID).innerHTML = '';
  document.getElementById("result").innerHTML = '';
  //draw the board, using the size provided in (result.size) to make a square with smaller squares that contain cell value (player name).
  for(i=0;i <= (d-1)*d; i += d){
    for(j=i; j <= (i+d-1); j++){
      if(array[j]==false){elm = "-"}else{elm= array[j]}
      document.getElementById(divID).innerHTML += '<div class="cell" id="' + j + '">' + elm + '</div>';
    }
    document.getElementById(divID).innerHTML += '</br>'
  }
  if(result.end == 'win'){
    document.getElementById("result").innerHTML = '<h4>The winner is: ' + result.winner + '</h4>';
    if(result.winType == 'dia-LTR'){
      for(i=0; i <= ((d*d)-1); i += d+1){
        toggleWin(i);
      }
    }
    if(result.winType == 'dia-RTL'){
      for(i=d-1; i <= ((d-1)*d); i += d-1){
        toggleWin(i);
      }
    }
    if(result.winType == 'col'){
      lastcell = result.point + (d * (d-1));
      for(i=result.point; i <= lastcell; i += d){
        toggleWin(i);
      }
    }
    if(result.winType == 'row'){
      for(i=result.point; i <= result.point + d -1; i++){
        toggleWin(i);
      }
    }
  }else{
    if(result.end == 'notAGame'){
      document.getElementById("result").innerHTML = '<h4>Not a valid game</h4>';
    }
    if(result.end == 'draw'){
      document.getElementById("result").innerHTML = '<h4>The game was strong draw!<h4>';
    }
  }
}
function toggleWin(div){
  document.getElementById(div).style.background= '#D3EFBD';

}
function parseTextInside(elmnt){
  array = document.getElementById(elmnt).value;
  if(array){
    arrayElement = JSON.parse(array);
    for(i=0;i <= array.length;i++){
      if(array[i]==""){
        array[i]=false;
      }
    }
    draw('canvas',arrayElement);
  }

}
