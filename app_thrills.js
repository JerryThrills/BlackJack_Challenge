/*This Game is incomplete at the moment so if anyone out there is willing to give a helping hand,
 U are more than welcome..... Thanks!!!!*/
/*ALL RESOUCRCES ARE COMPLIED IN THE SAME FOLDER */
/*AUTHOR : WAMALA JERIMIAH
TITTLE: ......BLACK JACK CHALLENGE.......*/
let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','77','J','q'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'77':10,'J':10,'q':[1,11]},
};
const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer']
//Uncomment the lines of code below & add in your favorite aduio files for the win, hit & draws

/*const hitSound= new Audio('aduio.m4a');
const winSound= new Audio('aduio.m4a');
const lossSound= new Audio('aduio.m4a');*/
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
function blackjackHit(){
    let card= randomCard();
    console.log(card);
   showCard(card,YOU);
   showScore(YOU);
   updateScore(card, YOU);
   console.log(YOU['score']); 
}
function randomCard(){
    let randomIndex=Math.floor(Math.random() * 11);
    return blackjackGame['cards'][randomIndex];
    }
    
function showCard(card, activePlayer){
    if(activePlayer['score']<=21){
let cardImage=document.createElement('img');
cardImage.src=`${card}.jpg`;
document.querySelector(activePlayer['div']).appendChild(cardImage);
hitSound.play();
}
}
function blackjackDeal(){
    showResult(computeWinner());
    //Let's computeWinner();
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
    for (i=0; i< yourImages.length; i++){
        yourImages[i].remove();
    }
    for (i=0; i< dealerImages.length; i++){
        dealerImages[i].remove();
    }
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;


    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
}
function updateScore(card, activePlayer){
    if (card==='q'){
    if(activePlayer['score']+blackjackGame['cardsMap']['card'][1]<=21){
activePlayer['score']+=blackjackGame['cardsMap'][card][1];
    }else{
        activePlayer['score']+=blackjackGame['cardsMap'][card][0];
    }
 }else{
activePlayer['score']+=blackjackGame['cardsMap'][card];
 }
}
function showScore(activePlayer){
    if(activePlayer['score']>=21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';

    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
}
}

function dealerlogic(){
    let card=randomCard();
    showCard(card, DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    showResult(computeWinner());
   
}
//return Winner compute who just won
function computeWinner(){
    let Winner;
    if(YOU['score']<=21){ 
        if(YOU['score']>DEALER['score']||(DEALER['score']>21)){
            console.log('You won!');
            Winner=YOU;

        }else if(YOU['score']<DEALER['score']){
            console.log('You lost!');
            Winner=DEALER;

        }else if(YOU['score']===DEALER['score']){
            console.log('You Drew!');

        }
        //condition when user busts but dealer doesn`t bust 

    }else if(YOU['score']>21 && DEALER['score']<=21){
        console.log('You lost!');
        Winner=DEALER;
        //when you and dealer busts


    }else if(YOU['score']>21 && DEALER['score']>21){
        console.log('You Drew!');

    }
    console.log('winner is', Winner)

    return Winner;

}
function showResult(Winner){
    let message='test', messageColor='#000000';

    if(Winner===YOU){
        message='You won!';
        messageColor='green';
        winSound.play();
    }else if(Winner===DEALER){
        message='You Lost!';
        messageColor='red';
        lossSound.play();

    }else{
        message='You Drew!';
        messageColor='black';
    }
    document.querySelector('#your-blackjack-result').textContent=message;
    document.querySelector('#dealer-blackjack-result').style.color= messageColor;

}