var board = $('button');
var rounds = 0;
var ref_color = $(board).eq(1).css('background-color');
var player_color_code = {0:'blue',1:'red'};
var p1_default = 'blue';
var p2_default = 'red';
var player_names = {0:p1_default,1:p2_default};

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
    player_names['0'] = p1_default;
  }
  if (p2_name.length > 0){
    player_names['1'] = p2_name;
  }else{
    player_names['1'] = p2_default;
  }
  $('.select_names').fadeOut(500);
  anouncePlayer();
  console.log('new player names: '+player_names[0]+', '+player_names[1]);
}

console.log('connected with background-color: '+ref_color)
