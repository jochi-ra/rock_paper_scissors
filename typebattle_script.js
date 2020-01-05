var player_score = 0;
var computer_score = 0;
var draw_score = 0;
var play_count = 0;

/******************** DOM ********************/
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => button.addEventListener('click',
  function() { play_round(button.id) }));

const results_div = document.querySelector('#results');
const round_winner = document.createElement('div');
const score_display = document.createElement('div');
const match_winner = document.createElement('div');

round_winner.style.fontFamily = 'inherit';
score_display.style.fontFamily = 'inherit';
match_winner.style.fontFamily = 'inherit';

round_winner.style.fontSize = '32px';
score_display.style.fontSize = '32px';
match_winner.style.fontSize = '40px';

round_winner.style.padding = '4px';
score_display.style.padding = '4px';
match_winner.style.padding = '4px';

match_winner.style.fontStyle = 'italic';
match_winner.style.fontWeight = 'bolder';

results_div.appendChild(round_winner);
results_div.appendChild(score_display);
results_div.appendChild(match_winner);

/******************** functions ********************/

/****************************************************
  decides round winner: 0 = lose, 1 = win, or 2 = draw
  determines text to print
  calls count_score and display_results
****************************************************/
function play_round(player = '')
{
  var computer_choice = computer_play();
  var player_choice = player.toUpperCase();
  var winner_text = 'Round: ';
  var decision;

  if(player_choice == 'GRASS'){
    if(computer_choice == 1){
      winner_text += 'Draw! I chose ' + player_choice + ' too!';
      decision = 2;
    }
    else if(computer_choice == 2){
      winner_text += 'You lose! I chose FIRE.';
      decision = 0;
    }
    else{
      winner_text += 'You win! I chose WATER.';
      decision = 1;
    }
  }
  else if(player_choice == 'FIRE'){
    if(computer_choice == 1){
      winner_text += 'You win! I chose GRASS.';
      decision = 1;
    }
    else if(computer_choice == 2){
      winner_text += 'Draw! I chose ' + player_choice + ' too!';
      decision = 2;
    }
    else{
      winner_text += 'You lose! I chose WATER.';
      decision = 0;
    }
  }
  else if(player_choice == 'WATER'){
    if(computer_choice == 1){
      winner_text += 'You lose! I chose GRASS.';
      decision = 0;
    }
    else if(computer_choice == 2){
      winner_text += 'You win! I chose FIRE.';
      decision = 1;
    }
    else{
      winner_text += 'Draw! I chose ' + player_choice + ' too!';
      decision = 2;
    }
  }
  else{
    winner_text = '';
  }

  // call function to count score
  count_score(decision);
  // call function to display results
  display_results(winner_text);

  return;
}

/****************************************************
  calculates current player wins, computer wins, and
  draws. also counts number of rounds for best of 5
****************************************************/
function count_score(decision)
{
  if(decision == 0){
    computer_score++;
  }
  else if(decision == 1){
    player_score++;
  }
  else{
    draw_score++;
  }

  play_count++;

  return;
}

/****************************************************
  prints results as string text to div elements
****************************************************/
function display_results(result)
{
  var prefix = "You-Computer-Draw:";
  round_winner.textContent = result;
  score_display.textContent = prefix + ' ' + player_score + '-' +
    computer_score + '-' + draw_score;

  if(play_count == 5){
    if(player_score > computer_score){
      match_winner.textContent = ' You won the match!';
    }
    else if(player_score < computer_score){
      match_winner.textContent = ' You lost the match.';
    }
    else{
      match_winner.textContent = ' Match was a draw!';
    }
    play_count = 0;
    player_score = 0;
    computer_score = 0;
    draw_score = 0;
  }
  else{
    match_winner.textContent = '';
  }

  return;
}

/****************************************************
  returns random choice of grass, fire or water
  1 = grass, 2 = fire, 3 = water
****************************************************/
function computer_play()
{

  return Math.floor((Math.random() * 3) + 1);;
}
