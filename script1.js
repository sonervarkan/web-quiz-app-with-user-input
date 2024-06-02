const container=document.querySelector(".container");
const question_text=document.querySelector(".question_text");
const option_list=document.querySelector(".option_list");
const correct=document.querySelector(".correct");
const start=document.querySelector(".start");
const record=document.querySelector(".record");
const next=document.querySelector(".next");
const finish=document.querySelector(".finish");

let questionList=[];
let letters=["a","b","c","d"];
let i=0;



start.addEventListener("click",function(){
    container.classList.remove("passive");
    start.classList.add("passive");
});

record.addEventListener("click",function(){
    i=0;
    let question = question_text.value;

    let select={};
    for (opt of option_list.children){   
        select[letters[i]] = opt.value;
        i++;    
    }

    let correctAnswer=correct.value;

    let objectExam = new Exam(question, select, correctAnswer);
    questionList.push(objectExam);

    localStorage.setItem('questions', JSON.stringify(questionList));
});    

next.addEventListener("click",function(){
    
    question_text.value="";
    for (opt of option_list.children){
        opt.value="";
    }
    correct.value="";
});

finish.addEventListener("click",function(){
    //window.location.href = "./index2.html";
    window.close();
});


