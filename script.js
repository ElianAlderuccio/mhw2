/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

let mappa={};

const div= document.querySelectorAll(".choice-grid div");
const button=document.querySelector("#reset").addEventListener('click',resetPagina);
aggiungiEvento();

function aggiungiEvento(){
    for(const i of div){
        i.addEventListener('click',seleziona);
    }
}

function seleziona(event){
    const elemento=event.currentTarget.querySelector(".checkbox");
    const elementopadre=elemento.parentElement.parentElement;
    elemento.parentElement.classList.add("colorato");
    elemento.src = "images/checked.png" ;

    if(elemento.dataset.lastClicked!=elemento.parentElement.dataset.choiceId){
        if(!mappa[elemento.parentElement.dataset.choiceId])mappa[elemento.parentElement.dataset.choiceId]=1; 
        else mappa[elemento.parentElement.dataset.choiceId]+=1; 
    }

    if(elementopadre.dataset.lastClicked && elementopadre.dataset.lastClicked!=elemento.parentElement.dataset.choiceId){  
        const elep=elementopadre.querySelector("[data-choice-id="+elementopadre.dataset.lastClicked+"] .checkbox"); 
        elep.src="images/unchecked.png";
        elep.parentElement.classList.remove("colorato");
        mappa[elementopadre.dataset.lastClicked]-=1; 
    }

    elementopadre.dataset.lastClicked=elemento.parentElement.dataset.choiceId; 
    $("div[data-question-id="+elemento.parentElement.dataset.questionId+"] ").removeClass("opaco");
    $("div[data-question-id="+elemento.parentElement.dataset.questionId+"]:not([data-choice-id=" + elementopadre.dataset.lastClicked +"])").addClass("opaco");
    controllaQuestionario(); 
}

function controllaQuestionario(){
    const padri=document.querySelectorAll(".choice-grid");
    let response_set=true; 
    for(const i of padri){
        if(!i.dataset.lastClicked)response_set=false;
    }
    if(response_set==true)fineQuestionario();
}

function fineQuestionario(){
    for(const i of div){
        i.removeEventListener('click',seleziona);
    }
    document.querySelector(".response").classList.add("Responsevisibile");
    controllaRisultato(); 
}

function controllaRisultato(){
    let max=0; let Id= 0;
    for(const i in mappa){
        if(mappa[i]>max){
            max=mappa[i];
            Id=i;
        }
    }
    if(max==1){
        generaRisposta(document.querySelector("[data-first-clicked]").dataset.lastClicked); 
    }else{
        generaRisposta(Id);
    }
}

function generaRisposta(Id){
    document.querySelector("#response-title").textContent= RESULTS_MAP[Id]["title"];
    document.querySelector("#response-text").textContent= RESULTS_MAP[Id]["contents"];
}

function resetPagina(){
    $(".choice-grid ").attr("data-last-clicked","");
    $(".choice-grid div").removeClass("opaco");
    $(".choice-grid div").removeClass("colorato");
    $(".choice-grid div img.checkbox").attr("src",'images/unchecked.png');
    document.querySelector(".response").classList.remove("Responsevisibile");
    window.scrollTo({top: 0, behavior: 'smooth'});
    aggiungiEvento();
    mappa={};
}