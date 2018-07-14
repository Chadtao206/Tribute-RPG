var hero = {
    basicInfo: {name:"",sex:"",race:"",class:"",age:""},
    stats: {level:1,experience:0,health:0,attack:0,defense:0,magic:0,speed:0,reputation:0,alignment:0},
    inventory: {gold:100,equipment:[],potions:[],},
    equipped: {head:1,body:1,legs:1,feet:1,hands:1,weapon:1,},
    ability: {passive:[],active:[]},
}

var upgradeCost = {
    head:10*hero.equipped.head,
    body:10*hero.equipped.body,
    legs:10*hero.equipped.legs,
    feet:10*hero.equipped.feet,
    hands:10*hero.equipped.hands,
    weapon:10*hero.equipped.weapon,
}

var turnLeft = 100;

var questText = ["helping an old elven lady cross the moat.","saving a fish from drowning.","posing for a fully nude portrait.","testing experimental potions for the alchemist.","eating hot wings with Sean Evans.",
                "joining a peaceful protest against King Dragon's reign.","getting sidetracked from your main mission.","milking some uncomfortably affectionate cows.","writing unfunny puns for the game creator.",
                "saying hello to Al Pacino's little friend.","impersonating Chuck Norris at a quinceanera.","being in a shake-weight commercial","participating in a Donald Trump look-alike competition",]
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
    $(".gamescreen").append("<h3 class='w3-container w3-center w3-animate-opacity intro'>"+"You are a hero who was prophesied to bring about peace to this magical land. 1000 years ago, a dark lord known as King Dragon came from another dimension and laid waste to this kingdom. He was powerful and ruthless, even our most formidable warriors could not draw a single drop of blood from him. Our king devised a plan to send you - our bravest champion 1000 years into the future. Now the kingdom is in ruins, but King Dragon has lowered his guard and is weakened by old age. Although he has surrounded himself with dark champions of his dimension, this was foretold to be our greatest chance to defeat him and his dark forces once and for all, and return this kingdom to its former glory! Champion, are you ready? "+"</h2>");
    $(".gamescreen").append("<button class='button begin'>"+"Begin Adventure"+"</button>");
    $(".begin").on("click", function(){
        menu();
        actionbar();
        gamemap();   
})}

//create game map
function gamemap(){
    $(".gamescreen").html("<img src='assets/images/kingdom.jpg' class='gamebg background'/>");
    $(".gamescreen").append("<div class='boss block1'>"+"</div>");
    $(".gamescreen").append("<div class='boss block2'>"+"</div>");
    $(".gamescreen").append("<div class='boss block3'>"+"</div>");
    $(".gamescreen").append("<div class='boss block4'>"+"</div>");
    $(".gamescreen").append("<div class='boss block5'>"+"</div>");
    $(".gamescreen").append("<div class='boss block6'>"+"</div>");
    $(".gamescreen").append("<div class='boss block7'>"+"</div>");
    $(".gamescreen").append("<div class='boss block8'>"+"</div>");
    $(".gamescreen").append("<div class='boss block9'>"+"</div>");
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
    $(".shop").on("click", function(){
        shop();
    })
    $("#quest").on("click", function(){
        quest();
    })
    $("#sleep").on("click", function(){
        camp();
    })
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

//do a quest
function quest(){
    var questReward = Math.floor(Math.random()*20+20)*hero.stats.level;
    hero.inventory.gold += questReward;
    turnLeft -= 1;
    $("#currentTurn").html(turnLeft);
    alert("You've earned "+questReward+" gold by "+questText[Math.floor(Math.random()*questText.length)]);  
}

//make camp
function camp(){
    $("#currentHealth").html(hero.stats.health);
    turnLeft -= 1;
    $("#currentTurn").html(turnLeft);
    alert("You are now fully rested. Get to work, "+hero.basicInfo.name+"!!!");
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
    $("#quest").off('click');
    $("#sleep").off('click');
    $(".gamescreen").empty().css("background-image", "url(assets/images/store.jpg)");
    $(".gamescreen").append("<button class='btn-primary btn-lg back'>"+"Leave"+"</button>").append("<h1 id='shopTitle'>"+"Magical Emporium"+"</h1>")
    $(".gamescreen").append("<div class='card card1' style='width: 7rem;'>"+"<img class='card-img-top' src='assets/images/weapon.png' alt='weapon'>"+"<div class='card-body'>"+"<p class='card-text'>"+"Upgrade Weapon"+"</p>"+"<div class='card-text'>"+"<p class='card-text'>"+upgradeCost.weapon+" G"+"</p>"+"<p class='card-text'>"+"LVL-"+hero.equipped.weapon+"</p>"+"</div>"+"</div>");
    $(".gamescreen").append("<div class='card card2' style='width: 7rem;'>"+"<img class='card-img-top' src='assets/images/helmet.png' alt='head'>"+"<div class='card-body'>"+"<p class='card-text'>"+"Upgrade Helmet"+"</p>"+"<div class='card-text'>"+"<p class='card-text'>"+upgradeCost.head+" G"+"</p>"+"<p class='card-text'>"+"LVL-"+hero.equipped.head+"</p>"+"</div>"+"</div>");
    $(".gamescreen").append("<div class='card card3' style='width: 7rem;'>"+"<img class='card-img-top' src='assets/images/armor.png' alt='body'>"+"<div class='card-body'>"+"<p class='card-text'>"+"Upgrade Armor"+"</p>"+"<div class='card-text'>"+"<p class='card-text'>"+upgradeCost.body+" G"+"</p>"+"<p class='card-text'>"+"LVL-"+hero.equipped.body+"</p>"+"</div>"+"</div>");
    $(".gamescreen").append("<div class='card card4' style='width: 7rem;'>"+"<img class='card-img-top' src='assets/images/gauntlet.png' alt='hands'>"+"<div class='card-body'>"+"<p class='card-text'>"+"Upgrade Gauntlets"+"</p>"+"<div class='card-text'>"+"<p class='card-text'>"+upgradeCost.hands+" G"+"</p>"+"<p class='card-text'>"+"LVL-"+hero.equipped.hands+"</p>"+"</div>"+"</div>");
    $(".gamescreen").append("<div class='card card5' style='width: 7rem;'>"+"<img class='card-img-top' src='assets/images/leggings.png' alt='legs'>"+"<div class='card-body'>"+"<p class='card-text'>"+"Upgrade Leggings"+"</p>"+"<div class='card-text'>"+"<p class='card-text'>"+upgradeCost.legs+" G"+"</p>"+"<p class='card-text'>"+"LVL-"+hero.equipped.legs+"</p>"+"</div>"+"</div>");
    $(".gamescreen").append("<div class='card card6' style='width: 7rem;'>"+"<img class='card-img-top' src='assets/images/boots.png' alt='feet'>"+"<div class='card-body'>"+"<p class='card-text'>"+"Upgrade Boots"+"</p>"+"<div class='card-text'>"+"<p class='card-text'>"+upgradeCost.feet+" G"+"</p>"+"<p class='card-text'>"+"LVL-"+hero.equipped.feet+"</p>"+"</div>"+"</div>");
    $(".gamescreen").append("<div class='goldCounter rounded'>"+hero.inventory.gold+" G"+"</div>");
    $(".gamescreen").append("<span class='stats'>"+"ATTACK - "+Math.floor(hero.stats.attack*(4+hero.stats.level)/5*(1+(6*hero.equipped.weapon+hero.equipped.hands+2*hero.equipped.body)/100))+"</span>");
    $(".gamescreen").append("<span class='stats'>"+"DEFENSE - "+Math.floor(hero.stats.defense*(4+hero.stats.level)/5*(1+(3*hero.equipped.body+3*hero.equipped.legs+2*hero.equipped.head+hero.equipped.feet)/100))+"</span>");
    $(".gamescreen").append("<span class='stats'>"+"MAGIC - "+Math.floor(hero.stats.magic*(4+hero.stats.level)/5*(1+(5*hero.equipped.hands+2*hero.equipped.legs+2*hero.equipped.head)/100))+"</span>");
    $(".gamescreen").append("<span class='stats'>"+"SPEED - "+Math.floor(hero.stats.speed*(4+hero.stats.level)/5*(1+(5*hero.equipped.feet+2*hero.equipped.head+hero.equipped.body+hero.equipped.legs)/100))+"</span>");
    $(".back").on("click", function(){
        gamemap();
    })
    //upgrade gear
    $(".card").on("click", function(){
        var slot = $(this).children("img").attr('alt');
        if (hero.inventory.gold >= upgradeCost[slot]){
            hero.inventory.gold -= upgradeCost[slot];
            hero.equipped[slot] += 1;
            upgradeCost[slot] += 10;
            shop();
        }

    })

}

//shop items

//interface setup
function interface(){
    $("body").empty();
    $("body").append("<audio autoplay:'true' src='assets/sound/backtrack.mp3' loop='true' id='backtrack'>"+"</audio>");
    document.getElementById("backtrack").play();
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
    $('.gamescreen').append("<div class='classIcon rounded' id='warrior'>"+"<img class='icon' src='assets/images/warrior.png'/>"+"<div class='title'>"+"Warrior"+"</div>"+"</div>");
    $('.gamescreen').append("<div class='classIcon rounded' id='archer'>"+"<img class='icon' src='assets/images/archer.png'/>"+"<div class='title'>"+"Archer"+"</div>"+"</div>");
    $('.gamescreen').append("<div class='classIcon rounded' id='mage'>"+"<img class='icon' src='assets/images/mage.png'/>"+"<div class='title'>"+"Mage"+"</div>"+"</div>");
    $('.gamescreen').append("<div class='classIcon rounded' id='healer'>"+"<img class='icon' src='assets/images/healer.png'/>"+"<div class='title'>"+"Healer"+"</div>"+"</div>");
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
//play song

$(document).ready(function () {

//game interface set up
$("button").on("click", function(){
    interface();
})



})
