(function(){
var temp = document.createElement('template');
temp.innerHTML = '<style>#wfix-controls { position: absolute; z-index: 10000; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: #888; padding: 1rem; } #wfix-controls label { display: flex; justify-content: flex-end; align-items: center; margin: 0.5rem auto; } #wfix-controls input { width: 50px; margin-left: 1rem; }</style> <div id="wfix-controls"> <label>Played: <input type="text" id="wfix-played" /></label> <label>Current Streak: <input type="text" id="wfix-current" /></label> <label>Max Streak: <input type="text" id="wfix-max" /></label> <label>1: <input type="text" class="wfix-guess" id="wfix-1" /></label> <label>2: <input type="text" class="wfix-guess" id="wfix-2" /></label> <label>3: <input type="text" class="wfix-guess" id="wfix-3" /></label> <label>4: <input type="text" class="wfix-guess" id="wfix-4" /></label> <label>5: <input type="text" class="wfix-guess" id="wfix-5" /></label> <label>6: <input type="text" class="wfix-guess" id="wfix-6" /></label> <button id="wfix-submit" type="button">Submit</button> </div>';

document.body.append( temp.content );

var controls = document.querySelector( '#wfix-controls' );
controls.querySelector( '#wfix-submit' ).addEventListener( 'click', function(e) {
    var getValue = id=>+document.querySelector(id).value||0;
    var guessInputs = [...document.querySelectorAll('.wfix-guess')].map(i=>+i.value||0);
    var played = getValue('#wfix-played');
    var won = guessInputs.reduce((a,b)=>a+b);
    var failed = played - won;
    var newStats = {
        gamesPlayed: played,
        gamesWon: won,
        winPercentage: Math.round( 100 * won / played ),
        currentStreak: getValue('#wfix-current'),
        maxStreak: getValue('#wfix-max'),
        guesses: {
            1: guessInputs[0],
            2: guessInputs[1],
            3: guessInputs[2],
            4: guessInputs[3],
            5: guessInputs[4],
            6: guessInputs[5],
            fail: failed
        }
    };

    var oldValues = JSON.parse(localStorage['nyt-wordle-moogle/ANON']);
    Object.assign( oldValues.stats, newStats );
    var yesterday = (new Date()).setUTCHours(-24);
    oldValues.game.timestamps.lastCompleted ||= yesterday;
    oldValues.game.timestamps.lastPlayed ||= yesterday;
    localStorage['nyt-wordle-moogle/ANON'] = JSON.stringify(oldValues);
    controls.remove();
    location.reload();
});
})()