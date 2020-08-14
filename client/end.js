document.getElementById("score").innerHTML = localStorage.getItem("mostRecentScore");
username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});