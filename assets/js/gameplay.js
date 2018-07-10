var hero = {
    basicInfo: {name:"",sex:"",race:"",class:"",age:""},
    stats: {level:1,experience:0,health:0,attack:0,defense:0,magic:0,speed:0,reputation:0,alignment:0},
    inventory: {gold:0,equipment:[],potions:[],},
    equipped: {head:"",body:"",legs:"",feet:"",hands:"",mainhand:"",offhand:""},
    ability: {passive:[],active:[]},
}
//Warrior
function createWarrior(){
    hero.stats.health = 1000;
    hero.stats.attack = 200;
    hero.stats.defense = 150;
    hero.stats.magic = 0;
    hero.stats.speed = 50;
    $("#currentHealth").html(hero.stats.health);
    $("#maxHealth").html(hero.stats.health);
    $("#maxExp").html(hero.stats.level*100);
    $("#currentMana").html(hero.stats.magic);
    $("#maxMana").html(hero.stats.magic);
}
//Archer
function createArcher(){
    hero.stats.health = 500;
    hero.stats.attack = 200;
    hero.stats.defense = 100;
    hero.stats.magic = 0;
    hero.stats.speed = 200;
    $("#currentHealth").html(hero.stats.health);
    $("#maxHealth").html(hero.stats.health);
    $("#maxExp").html(hero.stats.level*100);
    $("#currentMana").html(hero.stats.magic);
    $("#maxMana").html(hero.stats.magic);
}
//Healer
function createHealer(){
    hero.stats.health = 750;
    hero.stats.attack = 100;
    hero.stats.defense = 100;
    hero.stats.magic = 150;
    hero.stats.speed = 100;
    $("#currentHealth").html(hero.stats.health);
    $("#maxHealth").html(hero.stats.health);
    $("#maxExp").html(hero.stats.level*100);
    $("#currentMana").html(hero.stats.magic);
    $("#maxMana").html(hero.stats.magic);
}
//Mage
function createMage(){
    hero.stats.health = 500;
    hero.stats.attack = 50; 
    hero.stats.defense = 50;
    hero.stats.magic = 300;
    hero.stats.speed = 100;
    $("#currentHealth").html(hero.stats.health);
    $("#maxHealth").html(hero.stats.health);
    $("#maxExp").html(hero.stats.level*100);
    $("#currentMana").html(hero.stats.magic);
    $("#maxMana").html(hero.stats.magic);
}

function interface(){
    $("body").empty();
    $("body").append("<div class='container'>"+"</div>");
    $(".container").append("<div class='row topbar border border-warning'>"+"</div>");
    $(".topbar").append("<div class='col-lg-3 status'>"+"</div>");
    $(".status").append("<div class='row'>"+"Health : "+"<span id='currentHealth'>"+"</span>"+"  /  "+"<span id='maxHealth'>"+"</span>"+"</div>");
    $(".status").append("<div class='row'>"+"Mana : "+"<span id='currentMana'>"+"</span>"+"  /  "+"<span id='maxMana'>"+"</span>"+"</div>");
    $(".topbar").append("<div class='col-lg-3 level'>"+"</div>");
    $(".level").append("<div class='row'>"+"level : "+"<span id='lvl'>"+"</span>"+"</div>");
    $(".level").append("<div class='row'>"+"EXP : "+"<span id='currentExp'>"+"</span>"+"  /  "+"<span id='maxExp'>"+"</span>"+"</div>");
    $(".topbar").append("<div class='col-lg-2 class'>"+"</div>");
    $(".topbar").append("<div class='col-lg-3 turns'>"+"</div>");
    $(".turns").append("<div class='row'>"+"Turns Until Final Battle  "+"<span id='currentTurn'>"+"100</span>"+"</div>");
    $(".container").append("<div class='row midsection'>"+"</div>");
    $(".midsection").append("<div class='col-lg-9 gamescreen border border-warning'>"+"</div>");
    $(".midsection").append("<div class='col-lg-3 menu border border-warning'>"+"</div>");
    $(".container").append("<div class='row action border border-warning'>"+"</div>");
    $("#currentHealth").html("0");
    $("#maxHealth").html("0");
    $("#currentMana").html("0");
    $("#maxMana").html("0");
    $("#lvl").html("1");
    $("#currentExp").html("0");
    $("#maxExp").html("0");
    $('.gamescreen').append("<div class='classIcon' id='warrior'>"+"<img class='icon' src='assets/images/warrior.png'/>"+"<div class='title'>"+"Warrior"+"</div>"+"</div>");
    $('.gamescreen').append("<div class='classIcon' id='archer'>"+"<img class='icon' src='assets/images/archer.png'/>"+"<div class='title'>"+"Archer"+"</div>"+"</div>");
    $('.gamescreen').append("<div class='classIcon' id='mage'>"+"<img class='icon' src='assets/images/mage.png'/>"+"<div class='title'>"+"Mage"+"</div>"+"</div>");
    $('.gamescreen').append("<div class='classIcon' id='healer'>"+"<img class='icon' src='assets/images/healer.png'/>"+"<div class='title'>"+"Healer"+"</div>"+"</div>");
    $('.gamescreen').append("<div id='chooseText'>"+"Choose Your Class"+"</div>");

//choose characters
    $("#warrior").on("click", function(){
        createWarrior();
    })

    $("#archer").on("click", function(){
        createArcher();
    })

    $("#mage").on("click", function(){
        createMage();
    })

    $("#healer").on("click", function(){
        createHealer();
    })

}
$(document).ready(function () {

//game interface set up
$("button").on("click", function(){
    interface();
})

})
