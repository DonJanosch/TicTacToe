var board = $('button'); //Read the buttons as game-grid
var rounds = 0; //Counter to keep track of the played turns and to determine who is in turn
var ref_color = $(board).eq(1).css('background-color'); //Read the refference-color... might be changed by css
var p1_color = 'blue'; //Define player 1 color
var p2_color = 'red'; //Define player 2 color
var player_names = {0:p1_color,1:p2_color}; //Make a look-up object to find the player names, initially they are the colors
var player_color_code = {0:p1_color,1:p2_color}; //The color code to use

$('#player_1_name').css('background-color', p1_color); //Initially set the background color of the player 1 name-input
$('#player_1_name').attr('placeholder',player_color_code[0]+'-player name');
$('#player_2_name').css('background-color', p2_color); //Initially set the background color of the player 2 name-input
$('#player_2_name').attr('placeholder',player_color_code[1]+'-player name');
$(board).click(pickColor);
$('#btn_reset').click(resetGame);
$('#submit_names').click(getPlayerNames);

function pickColor(){
  $(this).css('background-color',player_color_code[rounds%2]);
  console.log('played round '+rounds);
  rounds++;
  $('.select_names').fadeOut(500);
  anouncePlayer();
}

function resetGame(){
  $(board).css('background-color',ref_color);
  rounds = 0;
  anouncePlayer();
  $('.select_names').fadeIn(500);
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
  $('.select_names').fadeOut(500);
  anouncePlayer();
  console.log('new player names: '+player_names[0]+', '+player_names[1]);
}

console.log('connected with background-color: '+ref_color)
