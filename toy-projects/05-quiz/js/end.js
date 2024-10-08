const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.querySelector('#finalScore');

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
})

saveHighScore = (event) => {
  console.log('clicked the save button!');
  event.preventDefault();
}