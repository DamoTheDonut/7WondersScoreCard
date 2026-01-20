document.querySelectorAll(".scoreInput").forEach(input => {
  input.addEventListener("input", () => {
    document.getElementById("clearButton").hidden=true
    document.getElementById("revealButton").hidden=false
    
    elements = document.getElementsByClassName("revealed")
    while(elements.length > 0) {
        elements[0].classList.remove("revealed")
    }
  })
})

const backgrounds = [
    "images/Backgrounds/ephesus.jpg",
    "images/Backgrounds/colisee.jpg",
    "images/Backgrounds/default.webp",
    "images/Backgrounds/babylon.jpg"
]

function randomBackground() {
    let newBackground = backgrounds[ Math.floor(Math.random() * backgrounds.length) ]
    document.body.style.backgroundImage = 'url("' + newBackground + '")'
}

function removePlayer(button) {
    let playerList = document.getElementsByClassName("playerPanel")
    if (playerList.length  <= 2) {return}


    button.parentElement.remove()
    updatePlayerNumber()
    

    if (playerList.length <= 2) {
        for(const player of playerList) {
            player.classList.add("hideRemovePlayerButton")
        }
    }
}

function addPlayer() {  
    for (const player of document.getElementsByClassName("playerPanel")) {
        player.classList.remove("hideRemovePlayerButton")
    }
    
    const panel = document.createElement("div");
    panel.className = "playerPanel";

    const input = document.createElement("input");
    input.className = "playerNameInput";
    input.type = "text";

    const upButton = document.createElement("button");
    upButton.className = "arrowButtonUp";
    upButton.textContent = "\u25B2";
    upButton.onclick = () => moveUp(removeBtn);

    const downButton = document.createElement("button");
    downButton.className = "arrowButtonDown";
    downButton.textContent = "\u25BC";
    downButton.onclick = () => moveDown(removeBtn);

    const removeBtn = document.createElement("button");
    removeBtn.className = "removePlayer";
    removeBtn.textContent = "-";
    removeBtn.onclick = () => removePlayer(removeBtn);

    panel.append(input, upButton, downButton, removeBtn);

    playerList.insertBefore(panel, playerList.querySelector("#addPlayer"));
    updatePlayerNumber()

}

function updatePlayerNumber() {
    let playerNamesList = document.getElementsByClassName("playerNameInput")
    for(let player = 0; player <playerNamesList.length; player++) {
        playerNamesList[player].placeholder ="Player " + (parseInt(player)+1)
    }
    if (playerNamesList.length  >= 7) {
        document.getElementById("addPlayer").hidden=true
    } else {
        document.getElementById("addPlayer").hidden=false
    }
    
}

function createScoreCard() {
    document.getElementById("clearButton").hidden=true
    document.getElementById("revealButton").hidden=false

    let scoreCard = document.getElementById("scoreCard")
    while (scoreCard.children.length > 1) {
        scoreCard.children[1].remove()
    }

    let playerList = document.getElementsByClassName("playerPanel")
    for(const player of playerList) {        
        if(player.firstElementChild.value == "") {
            createPlayer(player.firstElementChild.placeholder)
        } else {
            createPlayer(player.firstElementChild.value)
        }
    }

    showScoreCard()

}

function createPlayer(PlayerNameString) {
    const scoreCardPlayer = document.createElement("div")
    scoreCardPlayer.className = "scoreCardPlayer"

    const playerName = document.createElement("div")
    playerName.className = "playerName"
    playerName.innerText = PlayerNameString
    scoreCardPlayer.append(playerName)


    for(let i = 1; i <= 7 ; i++) {
        const inputDiv = document.createElement("div")
        const input = document.createElement("input")
        input.type="number"
        input.pattern="[0-9\-]"
        input.className="scoreInput"
        input.tabIndex=""+i
        inputDiv.append(input)
        scoreCardPlayer.append(inputDiv)
    }

    const sum = document.createElement("div")
    sum.className="sum"

    scoreCardPlayer.append(sum)
    scoreCard.append(scoreCardPlayer)
}

function showGameOptions() {
    // fade out scorecard
    document.getElementById("scoreCard").classList.add("fadeOut")

    // fade in new game options
    setTimeout(function delay() {
    document.getElementById("scoreCard").hidden=true
    document.getElementById("gameOptions").hidden=false

    setTimeout(function delay() {
    document.getElementById("gameOptions").classList.remove("fadeOut")
    }, 200)


    }, 300)
}

function showScoreCard() {
    // fade out new game options
    document.getElementById("gameOptions").classList.add("fadeOut")

    // fade in scorecard
    setTimeout(function delay() {
    document.getElementById("gameOptions").hidden=true
    document.getElementById("scoreCard").hidden=false

    setTimeout(function delay() {
    document.getElementById("scoreCard").classList.remove("fadeOut")
    }, 200)


    }, 300)
}

function clearScoreCard() {
    if(document.getElementById("scoreCard").hidden) {return} // disable when on new board screen

    document.getElementById("clearButton").hidden=true
    document.getElementById("revealButton").hidden=false

    const inputs = document.getElementsByClassName("scoreInput")
    for(const input in inputs) {
        inputs[input].value=""
    }

    elements = document.getElementsByClassName("revealed")
    while(elements.length > 0) {
        elements[0].classList.remove("revealed")
    }
}

function revealScore() {
    if(document.getElementById("scoreCard").hidden) {return} // disable when on new board screen

    document.getElementById("revealButton").hidden=true
    document.getElementById("clearButton").hidden=false
    
    sumScore()
    revealNumbers()
}

function sumScore() {
    const scoreCardList = document.getElementsByClassName("scoreCardPlayer")
    for(const scoreCard of scoreCardList) {
        const scoreInputList = scoreCard.getElementsByClassName("scoreInput")
        let sum = 0
        for(const scoreInput of scoreInputList) {
            sum += parseInt(scoreInput.value) || 0
        }
        scoreCard.lastElementChild.innerText=sum
    }
}

function revealNumbers() {
    const scoresList = document.querySelectorAll('.sum:not(.revealed)')

    if(scoresList.length==0) {return}
    let lowestScore = 1000
    for(const score of scoresList) {
        lowestScore = Math.min(lowestScore, parseInt(score.innerText))
    }

    for(const score of scoresList) {
        if(score.innerText == lowestScore) {
            score.classList.add("revealed")
        }
    }
    setTimeout(revealNumbers, 2000)
}

function moveUp(self) {
    self.parentElement.parentElement.insertBefore(self.parentElement, self.parentElement.previousElementSibling);
    updatePlayerNumber()
}

function moveDown(self) {
    self.parentElement.parentElement.insertBefore(self.parentElement.nextElementSibling, self.parentElement);
    updatePlayerNumber()

}