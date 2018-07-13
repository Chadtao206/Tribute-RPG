var hero = {
    basicInfo: {name:"",sex:"",race:"",class:"",age:""},
    stats: {level:1,experience:0,health:0,attack:0,defense:0,magic:0,speed:0,reputation:0,alignment:0},
    inventory: {gold:0,equipment:[],potions:[],},
    equipped: {head:0,body:0,legs:0,feet:0,hands:0,mainhand:0,offhand:0},
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
    $(".gamescreen").empty();
    $(".class").append("<img src='assets/images/warrior.png' class='iconSmall'/>")
    hero.basicInfo.name = "Chuck";
    hero.basicInfo.sex = "Male";
    hero.basicInfo.race = "Human";
    hero.basicInfo.class = "Warrior";
    hero.basicInfo.age = "78";
    intro();
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
    $(".gamescreen").empty();
    $(".class").append("<img src='assets/images/archer.png' class='iconSmall'/>")
    hero.basicInfo.name = "Archer";
    hero.basicInfo.sex = "Male";
    hero.basicInfo.race = "Human";
    hero.basicInfo.class = "Archer";
    hero.basicInfo.age = "36";
    intro();
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
    $(".gamescreen").empty();
    $(".class").append("<img src='assets/images/healer.png' class='iconSmall'/>")
    hero.basicInfo.name = "Bob";
    hero.basicInfo.sex = "Male";
    hero.basicInfo.race = "Human";
    hero.basicInfo.class = "Healer";
    hero.basicInfo.age = "36";
    intro();
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
    $(".gamescreen").empty();
    $(".class").append("<img src='assets/images/mage.png' class='iconSmall'/>")
    hero.basicInfo.name = "Dave";
    hero.basicInfo.sex = "Male";
    hero.basicInfo.race = "Human";
    hero.basicInfo.class = "Mage";
    hero.basicInfo.age = "61";
    intro();
}

//Character Intro/Start Game
function intro(){
    $(".gamescreen").append("<h2 class='w3-container w3-center w3-animate-opacity' style='font-weight:bold'>"+"Welcome to Tribute, "+hero.basicInfo.name+" the "+hero.basicInfo.class+"</h2>");
    $(".gamescreen").append("<h3 class='w3-container w3-center w3-animate-opacity intro'>"+"You are a hero who was prophesied to bring about peace to this magical land. 1000 years ago, a dark lord known as King Dragon came from another dimension and laid waste to this kingdom. He was powerful and ruthless, even our most formidable champions could not draw a single drop of blood from him. Our king devised a plan to send you - our bravest champion 1000 years into the future. Now the kingdom is in ruins, but King Dragon has lowered his guard and is weakened by old age. Although he has surrounded himself with dark champions of his dimension, this was foretold to be our greatest chance to defeat him and his dark forces once and for all, and return this kingdom to its former glory! Champion, are you ready? "+"</h2>");
    $(".gamescreen").append("<button class='button begin'>"+"Begin Adventure"+"</button>");
    $(".begin").on("click", function(){
        gamemap();
        menu();
        actionbar();
        $(".shop").on("click", function(){
            shop();
        })
    })
    
}

//create game map
function gamemap(){
    $(".gamescreen").html("<img src='assets/images/kingdom.jpg' class='gamebg background'/>");
    $(".gamescreen").append("<div class='block1'>"+"</div>");
    $(".gamescreen").append("<div class='block2'>"+"</div>");
    $(".gamescreen").append("<div class='block3'>"+"</div>");
    $(".gamescreen").append("<div class='block4'>"+"</div>");
    $(".gamescreen").append("<div class='block5'>"+"</div>");
    $(".gamescreen").append("<div class='block6'>"+"</div>");
    $(".gamescreen").append("<div class='block7'>"+"</div>");
    $(".gamescreen").append("<div class='block8'>"+"</div>");
    $(".gamescreen").append("<div class='block9'>"+"</div>");
    $(".iconSmall").clone().toggleClass('iconSmaller').removeClass('iconSmall').appendTo(".block1");
    $(".block2").append("<img class='iconSmaller' src='assets/images/boss1.png'/>");
    $(".block3").append("<img class='iconSmaller' src='assets/images/boss2.png'/>");
    $(".block4").append("<img class='iconSmaller' src='assets/images/boss3.png'/>");
    $(".block5").append("<img class='iconSmaller' src='assets/images/boss4.png'/>");
    $(".block6").append("<img class='iconSmaller' src='assets/images/boss5.png'/>");
    $(".block7").append("<img class='iconSmaller' src='assets/images/boss6.png'/>");
    $(".block8").append("<img class='iconSmaller' src='assets/images/boss7.png'/>");
    $(".block9").append("<img class='iconSmaller' src='assets/images/boss8.png'/>");
    $(".gamescreen").append("<button class='btn-primary btn-lg shop'>"+"Magical Emporium"+"</button>");
    
}

//create game menu
function menu(){
    $(".menu").append("<hr>"+"<div class='row justify-content-center' style='margin:15px; font-size:20px; font-weight:bold; color:gold;'>"+"Choose An Action"+"</div>"+"<hr>");
    $(".menu").append("<div class='row justify-content-center menubox'>"+"<button type='button' class='btn btn-primary btn-lg' id='explore' data-toggle='tooltip' data-placement='left' title='Explore the ruins of the Fallen Kingdom, you may find things to aid your adventure.'>"+"Explore"+"</button>"+"</div>");
    $(".menu").append("<div class='row justify-content-center menubox'>"+"<button type='button' class='btn btn-primary btn-lg' id='quest' data-toggle='tooltip' data-placement='left' title='Help out the villagers and earn gold as a reward.'>"+"Quest"+"</button>"+"</div>");
    $(".menu").append("<div class='row justify-content-center menubox'>"+"<button type='button' class='btn btn-primary btn-lg' id='minion' data-toggle='tooltip' data-placement='left' title='Fight minions to hone your skills.'>"+"Fight Minion"+"</button>"+"</div>");
    $(".menu").append("<div class='row justify-content-center menubox'>"+"<button type='button' class='btn btn-primary btn-lg' id='general' data-toggle='tooltip' data-placement='left' title='Are you ready to take on a general for epic rewards?'>"+"Fight General"+"</button>"+"</div>");
    $(".menu").append("<div class='row justify-content-center menubox'>"+"<button type='button' class='btn btn-primary btn-lg' id='sleep' data-toggle='tooltip' data-placement='left' title='Rest for a day to fully recuperate'>"+"Make Camp"+"</button>"+"</div>");
}

//create action bars
function actionbar(){
    $(".action").append("<div class='col-lg-7 skills'>"+"</div>");
    $(".skills").append("<div class='skill skill1'>"+"1"+"</div>");
    $(".skills").append("<div class='skill skill2'>"+"2"+"</div>");
    $(".skills").append("<div class='skill skill3'>"+"3"+"</div>");
    $(".skills").append("<div class='skill skill4'>"+"4"+"</div>");
    $(".skills").append("<div class='skill skill5'>"+"5"+"</div>");
    $(".action").append("<div class='col-lg-5 consumable'>"+"</div>");
    $(".consumable").append("<div class='items item1'"+"</div>");
    $(".consumable").append("<div class='items item2'"+"</div>");
    $(".consumable").append("<div class='items item3'"+"</div>");
    $(".consumable").append("<div class='items item4'"+"</div>");
    $(".consumable").append("<div class='items item5'"+"</div>");
    $(".consumable").append("<div class='items item6'"+"</div>");
    $(".consumable").append("<div class='items item7'"+"</div>");
    $(".consumable").append("<div class='items item8'"+"</div>");
    $(".consumable").append("<div class='items item9'"+"</div>");
    $(".consumable").append("<div class='items item10'"+"</div>");
    $(".consumable").append("<div class='items item11'"+"</div>");
    $(".consumable").append("<div class='items item12'"+"</div>");
    $(".consumable").append("<div class='items item13'"+"</div>");
    $(".consumable").append("<div class='items item14'"+"</div>");
    $(".consumable").append("<div class='items item15'"+"</div>");
    $(".consumable").append("<div class='items item16'"+"</div>");
}

//shop
function shop(){
    $(".gamescreen").empty();
    $(".gamescreen").append("<button class='btn-primary btn-lg back'>"+"Leave"+"</button>")
    $(".back").on("click", function(){
        gamemap();
        $(".shop").on("click", function(){
            shop();
        })
    })
    
}

//interface setup
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
    $(".turns").append("<div class='row'>"+"Turns Until Final Battle  "+"<span id='currentTurn' style='padding-left:100px; font-size:30px;'>"+"100"+"</span>"+"</div>");
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

//Game Interface
    $(".begin").on("click", function(){
        alert("clicked");
    })

}
$(document).ready(function () {

//game interface set up
$("button").on("click", function(){
    interface();
})



})
