//Function-Deffinitions first
function initializeEmptyGrid(){
  grid = [for (_ of cols) [for (_ of rows) 0]]; //Generate the Array holding the values of the grid, initialized with 0
}

function getGridCol(){
var col_idx = board.index(this)%7;
console.log('Col '+col_idx+' clicked');
return col_idx; //get the column-index, there are only 7 columns avaliable
}

function getFreeGridRow(col){
  for (row=0;row<rows.length;row++){
    if (grid[col][row] == '0'){
      //console.log('Free row '+row);
      grid[col][row] = 1;
      return row;
      break;
    }
    if (row >= rows.length-1){return false;}
  }
}

function rowColToIdx(row,col){
var idx = (rows.length-1-row)*cols.length+col;
console.log('Row '+row+', col '+col+' equals idx: '+idx);
return idx;
}

function setColor(){
  $(this).css('background-color',player_color_code[player_in_turn]);
  $(this).css('border-color','dark'+player_color_code[player_in_turn]);
  $(this).addClass('set_button')
}

function pickColor(){
  var col = getGridCol.call(this);
  var freeRow = getFreeGridRow(col);
  console.log('Next free coords ('+col+'/'+freeRow+')');
  if (freeRow !== false){
    var idx = rowColToIdx(freeRow,col);
    setColor.call(board[idx]);
    console.log('played round '+rounds);
    rounds++;
    player_in_turn = rounds % 2;
    hideNameSelection();
    anouncePlayer();
  }else{
    console.log('No free rows avaliable');
  }
}

function resetButtons(){
  player_in_turn = 3;
  setColor.call($(board));
  $(board).removeClass('set_button');
  player_in_turn = 0;
}

function resetGame(){
  resetButtons();
  initializeEmptyGrid();
  rounds = 0;
  anouncePlayer();
  showNameSelection();
  console.log('resetting game');
}

function anouncePlayer(){
  $('#player_nr').text(player_names[rounds%2]);
  $('#player_nr').css('color',player_color_code[rounds%2]);
}

function getPlayerNames(){
  var p1_name = $('#player_1_name').val();
  var p2_name = $('#player_2_name').val();
  if (p1_name.length > 0){
    player_names['0'] = p1_name;
  }else{
    player_names['0'] = p1_color;
  }
  if (p2_name.length > 0){
    player_names['1'] = p2_name;
  }else{
    player_names['1'] = p2_color;
  }
  anouncePlayer();
  console.log('new player names: '+player_names[0]+', '+player_names[1]);
}

function hideNameSelection(){
  $('.select_names').fadeOut(500);
}

function showNameSelection(){
  $('.select_names').fadeIn(500);
}

//Variable-Declaration second
var board = $('button'); //Read the buttons as game-grid
var rounds = 0; //Counter to keep track of the played turns and to determine who is in turn
var player_in_turn = 0; //Continuously updated during match
var ref_color = 'grey'; //Normal background-color
var p1_color = 'blue'; //Define player 1 color
var p2_color = 'red'; //Define player 2 color
var player_names = {0:p1_color,1:p2_color}; //Make a look-up object to find the player names, initially they are the colors
var player_color_code = {0:p1_color,1:p2_color,3:ref_color}; //The color code to use
var cols = [0,1,2,3,4,5,6]; //Make a list of all columns
var rows = [0,1,2,3,4,5]; //Make a list of all rows
var grid = []; //Placeholder to take the grid-values

//Connecting Java-Actions third
$('#player_1_name').css('background-color', p1_color); //Initially set the background color of the player 1 name-input
$('#player_1_name').attr('placeholder',player_color_code[0]+'-player name');
$('#player_1_name').mouseout(getPlayerNames);
$('#player_2_name').css('background-color', p2_color); //Initially set the background color of the player 2 name-input
$('#player_2_name').attr('placeholder',player_color_code[1]+'-player name');
$('#player_2_name').mouseout(getPlayerNames);
$(board).click(pickColor);
$('#btn_reset').click(resetGame);

//Setting the initial stage last
initializeEmptyGrid();
getPlayerNames();
resetButtons();
console.log('connected with background-color: '+ref_color);
