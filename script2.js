const btn_start=document.querySelector(".btn_start");
const quiz_block=document.querySelector(".quiz_block");
const btn_next=document.querySelector(".btn_next");
const quiz_text=document.querySelector(".quiz_text");
const quiz_choices=document.querySelector(".quiz_choices");
const correctIcon='<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon='<div class="icon"><i class="fas fa-times"></i></div>';
const score_box=document.querySelector(".score_box");
const btn_finish=document.querySelector(".btn_finish");
const btn_reply=document.querySelector(".btn_reply");
const time_second=document.querySelector(".time_second");
const time_text=document.querySelector(".time_text");
const time_line=document.querySelector(".time_line");
let result=0;

function Exam(questionText,choices,correctAnswer){
    this.questionText=questionText;
    this.choices=choices;
    this.correctAnswer=correctAnswer;
}

Exam.prototype.controlToAnswer=function(answer){
    return answer===this.correctAnswer;
}

// Yerel depolamadan soruları al
let storedQuestions = JSON.parse(localStorage.getItem('questions'));
let questions = storedQuestions ? storedQuestions.map(q => new Exam(q.questionText, q.choices, q.correctAnswer)) : [];



function Quiz(questions){
    this.questions=questions;
    this.questionIndex=0;
}

Quiz.prototype.whichQuestion=function(){
    return this.questions[this.questionIndex];
}

const quiz1=new Quiz(questions);


btn_start.addEventListener("click",function(){
    btn_start.classList.add("passive");
    quiz_block.classList.remove("passive");
    btn_next.classList.add("passive");
    showQuestion(quiz1.whichQuestion());
});

function showQuestion(question){
    startTimer(10);
    startTimerLine();
    let quizText=`<span>${question.questionText}</span>`;

    let options="";
    for (let answer in question.choices){
        options+=`<div class="option"><span><b>${answer}</b>: ${question.choices[answer]}</span></div>`
    }
    quiz_choices.innerHTML=options;
    quiz_text.innerHTML=quizText;

    const option=document.querySelectorAll(".option");
    for (let opt of option){
        opt.style.cursor = "pointer";
        opt.setAttribute("onclick","selectedChoice(this)");
    }
  
}

function selectedChoice(option){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer=option.querySelector("span b").textContent;

    if (quiz1.whichQuestion().controlToAnswer(userAnswer)){
        option.classList.add("correct");
        option.innerHTML+=correctIcon;
        result++;
    }
    else{
        option.classList.add("incorrect");
        option.innerHTML+=incorrectIcon;
    }
    document.querySelectorAll(".option").forEach(function(opt){
        opt.classList.add("disabled");
    });
    btn_next.classList.remove("passive"); 
 
    
}

btn_next.addEventListener("click",function(){

    if(questions.length!=quiz1.questionIndex+1){
        quiz1.questionIndex++;
        showQuestion(quiz1.whichQuestion());
        btn_next.classList.add("passive");
    }
    else{
        showScore(result,quiz1.questions.length);
    }
});

let counter;
function startTimer(time){
    counter=setInterval(timer,1000);
    function timer(){
        time_second.innerText=time;
        time--;
        if (time<0){
            clearInterval(counter);
            for (let opt of quiz_choices.children){
                opt.classList.add("disabled");
            }
            btn_next.classList.remove("passive");           
        }
    }
}
let counterLine;
function startTimerLine(){
    let line=0;
    counterLine=setInterval(timer,30);
    function timer(){
        line+=1;
        time_line.style.width=line+"px";
        if (line>349){
            clearInterval(counterLine);
        }
    }
}
function showScore(result,totalQuestion){
    let icon = '<div><i class="fa-solid fa-crown fa-2xl"></i></div>';

    quiz_block.classList.add("passive");
    btn_start.classList.add("passive");
    score_box.classList.remove("passive");

    let quizScore=`Result:${result}/${totalQuestion}`
    document.querySelector(".score").innerHTML=icon+quizScore; 
      
}

btn_reply.addEventListener("click",function(){
    btn_start.classList.remove("passive");
    score_box.classList.add("passive");
    quiz1.questionIndex=0;
    result=0;
});

btn_finish.addEventListener("click",function(){
    window.close();
});

