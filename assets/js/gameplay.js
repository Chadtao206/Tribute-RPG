var hero = {
    basicInfo: { name: "", sex: "", race: "", class: "", age: "" },
    stats: { level: 1, experience: 0, health: 0, attack: 0, defense: 0, magic: 0, speed: 0, reputation: 0, alignment: 0, currentHealth: 0 },
    inventory: { gold: 100, equipment: [], potions: [], },
    equipped: { head: 1, body: 1, legs: 1, feet: 1, hands: 1, weapon: 1, },
    ability: { passive: [], active: [] },
}

var upgradeCost = {
    head: 10 * hero.equipped.head,
    body: 10 * hero.equipped.body,
    legs: 10 * hero.equipped.legs,
    feet: 10 * hero.equipped.feet,
    hands: 10 * hero.equipped.hands,
    weapon: 10 * hero.equipped.weapon,
}

var turnLeft = 200;
var questText = ["helping an old elven lady cross the moat.", "saving a fish from drowning.", "posing for a fully nude portrait.", "testing experimental potions for the alchemist.", "eating hot wings with Sean Evans.",
    "joining a peaceful protest against King Dragon's reign.", "getting sidetracked from your main mission.", "milking some uncomfortably affectionate cows.", "writing unfunny puns for the game creator.",
    "saying hello to Al Pacino's little friend.", "impersonating Chuck Norris at a quinceanera.", "being in a shake-weight commercial", "participating in a Donald Trump look-alike competition",]

var minionName = ["Seymour", "Zombie", "Rob Zombie", "Pumbrella", "Nightmare Mushroom", "Witch", "Rock Troll", "Mountain Troll", "Cyclops", "Ogre", "Werewolf", "Mutant Engineer", "Hellhound", "Hunter", "Chimera", "Griffin", "Qilin", "Cookie Monster", "Sully", "Mikey"]
var skillArray = ["1", "2", "3", "4", "5"];
var monster = "";

//boss array
var bossData = {
    1: { name: "Flying Centipede", difficulty: 4, source: "assets/images/boss1.png" },
    2: { name: "Gorgon Grave-Robber", difficulty: 10, source: "assets/images/boss2.png" },
    3: { name: "DeathScythe", difficulty: 18, source: "assets/images/boss3.png" },
    4: { name: "Abominable Butcher", difficulty: 30, source: "assets/images/boss4.png" },
    5: { name: "Reaper", difficulty: 45, source: "assets/images/boss5.png" },
    6: { name: "The Puppeteer", difficulty: 65, source: "assets/images/boss6.png" },
    7: { name: "Reanimated Sentinel", difficulty: 100, source: "assets/images/boss7.png" },
    8: { name: "King Dragon", difficulty: 150, source: "assets/images/boss8.png" }
}
var currentBoss = 1;
var general = bossData[currentBoss];
var easterEggCounter = 0;
//refresh stats
function refreshStats() {
    statsMod.health = Math.floor((1 + hero.stats.level) / 2 * hero.stats.health);
    statsMod.attack = Math.floor(hero.stats.attack * (2 + hero.stats.level) / 3 * (1 + (6 * hero.equipped.weapon + hero.equipped.hands + 2 * hero.equipped.body) / 100));
    statsMod.defense = Math.floor(hero.stats.defense * (2 + hero.stats.level) / 3 * (1 + (3 * hero.equipped.body + 3 * hero.equipped.legs + 2 * hero.equipped.head + hero.equipped.feet) / 100));
    statsMod.magic = Math.floor(hero.stats.magic * (2 + hero.stats.level) / 3 * (1 + (5 * hero.equipped.hands + 2 * hero.equipped.legs + 2 * hero.equipped.head) / 100));
    statsMod.speed = Math.floor(hero.stats.speed * (2 + hero.stats.level) / 3 * (1 + (5 * hero.equipped.feet + 2 * hero.equipped.head + hero.equipped.body + hero.equipped.legs) / 100));
    $("#maxExp").html(hero.stats.level * 100);
    $("#currentExp").html(hero.stats.experience);
    $("#maxHealth").html(statsMod.health);
    $("#maxMana").html(statsMod.magic);
}

//basic boss stats
var bossStat = {
    health: 2000,
    attack: 200,
    defense: 100,
    magic: 100,
    speed: 75,
    exp: 500,
    gold: 500,
}



var criticalM = false;
var criticalP = false;
//critical hit minion
function criticalMinion() {
    var roll1 = Math.ceil(Math.random() * 100);
    var roll2 = Math.ceil(Math.random() * 100);
    criticalM = false;
    criticalP = false;
    if (statsMod.speed / minionStats.speed + 9 >= roll1) {
        criticalM = true;
    }
    if (minionStats.speed / statsMod.speed + 9 >= roll2) {
        criticalP = true;
    }
}
//critical hit boss
function criticalBoss() {
    var roll1 = Math.ceil(Math.random() * 100);
    var roll2 = Math.ceil(Math.random() * 100);
    criticalM = false;
    criticalP = false;
    if (statsMod.speed / bossMod.speed + 9 >= roll1) {
        criticalM = true;
    }
    if (bossMod.speed / statsMod.speed + 9 >= roll2) {
        criticalP = true;
    }
}

//level up
var levelGained = 0;
function level() {
    if (hero.stats.experience >= hero.stats.level * 100) {
        hero.stats.experience -= hero.stats.level * 100;
        hero.stats.level++;
        refreshStats();
        $("#lvl").html(hero.stats.level);
        hero.stats.currentHealth = statsMod.health;
        $("#currentHealth").html(hero.stats.currentHealth);
        $("#currentMana").html(statsMod.magic);
        levelGained += 1;
        $("#currentExp").html(hero.stats.experience);
        if (hero.stats.experience >= hero.stats.level * 100) {
            level();
        } else {
            alert("Congratulations! You have gained "+levelGained+" level(s)!")
        }
        $("#currentExp").html(hero.stats.experience);
    }
}

//combat
var combat = {
    1: function () {
        if (hero.stats.currentHealth === 0) {
            hero.stats.currentHealth = statsMod.health;
        }
        var multM = 1;
        var multP = 1;
        var youAttack = "You attacked ";
        var attackYou = " attacked you for ";
        criticalMinion();
        if (criticalM) {
            multM = 2.5;
            var youAttack = "You critically hit "
        }
        if (criticalP) {
            multP = 1.5;
            var attackYou = " critically hit you for "
        }
        var monsterDamage = statsMod.attack * multM - minionStats.defense;
        if (monsterDamage < 10) {
            monsterDamage = 10;
        }
        alert(youAttack + minionName[monster - 1] + " for " + monsterDamage + " damage!");
        minionStats.health -= monsterDamage;
        $("#enemyhp").html(minionStats.health);
        if (minionStats.health <= 0) {
            alert("You have defeated " + minionName[monster - 1] + "! You have earned " + minionStats.exp + " experience points and " + minionStats.gold + " gold!");
            hero.inventory.gold += minionStats.gold;
            hero.stats.experience += minionStats.exp;
            level();
            gamemap();

        } else {
            var playerDamage = minionStats.attack * multP - statsMod.defense;
            if (playerDamage < 10) {
                playerDamage = 10;
            }
            alert(minionName[monster - 1] + attackYou + playerDamage + " damage!");
            hero.stats.currentHealth -= playerDamage;
            $("#currentHealth").html(hero.stats.currentHealth);
            if (hero.stats.currentHealth <= 0) {
                alert("You have fainted...");
                turnLeft -= 5;
                $("#currentTurn").html(turnLeft);
                refreshStats();
                gamemap();
                hero.stats.currentHealth = statsMod.health;
                $("#currentHealth").html(hero.stats.currentHealth);
                alert("You have recouperated after resting for 5 days, be careful out there!")
            }

        }
    }
}
//update map
var bossStatus = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
}
function updateMap() {
    for (i = 1; i < 9; i++) {
        if (bossStatus[i]) {
        } else {
            $(".block" + (i + 1)).html("<img class='iconSmaller' src='assets/images/dead.png'/>");
        }
    }
}

//boss fight
var bossfight = {
    1: function () {
        if (hero.stats.currentHealth === 0) {
            hero.stats.currentHealth = statsMod.health;
        }
        var multM = 1;
        var multP = 1;
        var youAttack = "You attacked ";
        var attackYou = " attacked you for ";
        criticalBoss();
        if (criticalM) {
            multM = 2.5;
            var youAttack = "You critically hit "
        }
        if (criticalP) {
            multP = 1.5;
            var attackYou = " critically hit you for "
        }
        var bossDamage = statsMod.attack * multM - bossMod.defense;
        if (bossDamage < 10) {
            bossDamage = 10;
        }
        alert(youAttack + general.name + " for " + bossDamage + " damage!");
        bossMod.health -= bossDamage;
        $("#enemyhp").html(bossMod.health);
        if (bossMod.health <= 0) {
            if (currentBoss === 8) {
                alert("you have won! King Dragon has been defeated! You are now free to wander the land and enjoy the spoils of your victory! You can also fight King Dragon again with increased difficulty.");
            }
            alert("You have defeated " + general.name + "! You have earned " + bossMod.exp + " experience points and " + bossMod.gold + " gold!");
            hero.inventory.gold += bossMod.gold;
            hero.stats.experience += bossMod.exp;
            if (currentBoss === 8) {
                general.difficulty = Math.ceil(general.difficulty * 1.5);
                easterEggCounter++;
                $("#currentTurn").html("<i class='fas fa-infinity'></i>");
                $("#currentTurn").removeAttr("id");
            } else {
                bossStatus[currentBoss] = false;
                currentBoss += 1;
                general = bossData[currentBoss];
                if (currentBoss === 8) {
                    $("#general").html("Final Battle");
                }
            }
            level();
            gamemap();

        } else {
            var playerDamage = bossMod.attack * multP - statsMod.defense;
            if (playerDamage < 10 * general.difficulty) {
                playerDamage = 10 * general.difficulty;
            }
            alert(general.name + attackYou + playerDamage + " damage!");
            hero.stats.currentHealth -= playerDamage;
            $("#currentHealth").html(hero.stats.currentHealth);
            if (hero.stats.currentHealth <= 0) {
                alert("You have fainted...");
                turnLeft -= 5;
                $("#currentTurn").html(turnLeft);
                refreshStats();
                gamemap();
                hero.stats.currentHealth = statsMod.health;
                $("#currentHealth").html(hero.stats.currentHealth);
                alert("You have recouperated after resting for 5 days, be careful out there!")
            }

        }
    }
}

var minionLevel = Math.ceil(Math.random() * hero.stats.level * general.difficulty);
var minionStats = {
    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    exp: 0,
    gold: 0,
}

var statsMod = {
    health: 0,
    attack: 0,
    defense: 0,
    magic: 0,
    speed: 0,
}


//Warrior
function createWarrior() {
    hero.stats.health = 1000;
    hero.stats.attack = 200;
    hero.stats.defense = 150;
    hero.stats.magic = 0;
    hero.stats.speed = 50;
    $("#currentHealth").html(hero.stats.health);
    $("#maxHealth").html(hero.stats.health);
    $("#maxExp").html(hero.stats.level * 100);
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
function createArcher() {
    hero.stats.health = 500;
    hero.stats.attack = 200;
    hero.stats.defense = 100;
    hero.stats.magic = 0;
    hero.stats.speed = 200;
    $("#currentHealth").html(hero.stats.health);
    $("#maxHealth").html(hero.stats.health);
    $("#maxExp").html(hero.stats.level * 100);
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
function createHealer() {
    hero.stats.health = 750;
    hero.stats.attack = 100;
    hero.stats.defense = 100;
    hero.stats.magic = 150;
    hero.stats.speed = 100;
    $("#currentHealth").html(hero.stats.health);
    $("#maxHealth").html(hero.stats.health);
    $("#maxExp").html(hero.stats.level * 100);
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
function createMage() {
    hero.stats.health = 500;
    hero.stats.attack = 50;
    hero.stats.defense = 50;
    hero.stats.magic = 300;
    hero.stats.speed = 100;
    $("#currentHealth").html(hero.stats.health);
    $("#maxHealth").html(hero.stats.health);
    $("#maxExp").html(hero.stats.level * 100);
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
function intro() {
    $(".gamescreen").append("<h2 class='w3-container w3-center w3-animate-opacity' style='font-weight:bold'>" + "Welcome to Tribute, " + hero.basicInfo.name + " the " + hero.basicInfo.class + "</h2>");
    $(".gamescreen").append("<h3 class='w3-container w3-center w3-animate-opacity intro'>" + "You are a hero who was prophesied to bring about peace to this magical land. 1000 years ago, a dark lord known as King Dragon came from another dimension and laid waste to this kingdom. He was powerful and ruthless, even our most formidable warriors could not draw a single drop of blood from him. Our king devised a plan to send you - our bravest champion 1000 years into the future. Now the kingdom is in ruins, but King Dragon has lowered his guard and is weakened by old age. Although he has surrounded himself with dark champions of his dimension, this was foretold to be our greatest chance to defeat him and his dark forces once and for all, and return this kingdom to its former glory! Champion, are you ready? " + "</h2>");
    $(".gamescreen").append("<button class='button begin'>" + "Begin Adventure" + "</button>");
    $(".begin").on("click", function () {
        menu();
        actionbar();
        gamemap();
    })
}

//create game map
function gamemap() {
    if (easterEggCounter >= 10) {
        $("#quest").off('click');
        $("#sleep").off('click');
        $("#minion").off('click');
        $("#general").off('click');
        alert("Muhahahahahaha!!!!");
        alert("Muhahahahahaha!!!!");
        alert("Muhahahahahaha!!!!");
        $(".gamescreen").empty().css("background-image", "url(assets/images/battleBoss.jpg)");
        $(".gamescreen").append("<div id='bonus1' class='bonus' style='display:none; font-size:30px; color:white'>That was quite a show you've put on, Champion...</div>");
        $(".gamescreen").append("<div id='bonus2' class='bonus' style='display:none; font-size:30px; color:white'>All your efforts, to defeat this puppet of mine... Did you really believe it would be this easy?</div>")
        $(".gamescreen").append("<div id='bonus3' class='bonus' style='display:none; font-size:30px; color:white'>King Dragon was merely a pawn, you will now face ME, the true ruler of this realm - </div>")
        $(".gamescreen").append("<div id='bonus4' class='bonus' style='display:none; font-size:30px; color:white'>HIGH-KING TRONALD DUMP!!!</div>");
        $("#bonus1").fadeIn(3000, function () {
            $("#bonus2").fadeIn(4000, function () {
                $("#bonus3").fadeIn(4000, function () {
                    $("#bonus4").fadeIn(5000, function () {
                        $(".gamescreen").empty().append("<img class='minionImage' src='assets/images/easterEggBoss.jpg'/>");
                        $(".gamescreen").append("<h2 style='text-align:center; margin-top:380px; color:red; font-weight:bold;' class='encounter'>" + "You have encountered High-King Tronald Dump!");
                        $(".encounter").prepend("<h2 style='text-align:center; font-weight:bold;'>Enemy HP - " + "<span id='enemyhp'>???</span></h2>");
                    });
                });
            });
        });
        $(".skill1").on("click", function () {
            alert("High-King Tronald Dump rigs the game and kills you instantly.")
            $("body").html("<h1 class='ending' style='text-align:center; display:none; margin-top:200px; font-size:100px; font-weight:bold; color:red;'>GAME OVER</h1>");
            $(".ending").fadeIn(4000);
        })
        document.onkeyup = function () {
            if (skillArray.includes(event.key)) {
                alert("High-King Tronald Dump rigs the game and kills you instantly.")
                $("body").html("<h1 class='ending' style='text-align:center; display:none; margin-top:200px; font-size:100px; font-weight:bold; color:red;'>GAME OVER</h1>");
                $(".ending").fadeIn(4000);
            }
        }
    } else {
        $(".gamescreen").html("<img src='assets/images/kingdom.jpg' class='gamebg background'/>");
        $(".gamescreen").append("<div class='boss block1'>" + "</div>");
        $(".gamescreen").append("<div class='boss block2'>" + "</div>");
        $(".gamescreen").append("<div class='boss block3'>" + "</div>");
        $(".gamescreen").append("<div class='boss block4'>" + "</div>");
        $(".gamescreen").append("<div class='boss block5'>" + "</div>");
        $(".gamescreen").append("<div class='boss block6'>" + "</div>");
        $(".gamescreen").append("<div class='boss block7'>" + "</div>");
        $(".gamescreen").append("<div class='boss block8'>" + "</div>");
        $(".gamescreen").append("<div class='boss block9'>" + "</div>");
        $(".iconSmall").clone().toggleClass('iconSmaller').removeClass('iconSmall').appendTo(".block1");
        $(".block2").append("<img class='iconSmaller' src='assets/images/boss1.png'/>");
        $(".block3").append("<img class='iconSmaller' src='assets/images/boss2.png'/>");
        $(".block4").append("<img class='iconSmaller' src='assets/images/boss3.png'/>");
        $(".block5").append("<img class='iconSmaller' src='assets/images/boss4.png'/>");
        $(".block6").append("<img class='iconSmaller' src='assets/images/boss5.png'/>");
        $(".block7").append("<img class='iconSmaller' src='assets/images/boss6.png'/>");
        $(".block8").append("<img class='iconSmaller' src='assets/images/boss7.png'/>");
        $(".block9").append("<img class='iconSmaller' src='assets/images/boss8.png'/>");
        updateMap();
        $(".gamescreen").append("<button class='btn-primary btn-lg shop'>" + "Magical Emporium" + "</button>");
        document.onkeyup = null;
        $(".skill1").off("click");
        $(".shop").on("click", function () {
            shop();
        })
        $("#quest").on("click", function () {
            quest();
        })
        $("#sleep").on("click", function () {
            camp();
        })
        $("#minion").on("click", function () {
            battle();
        })
        $("#general").on("click", function () {
            bossBattle();
        })
    }
}

//create game menu
function menu() {
    $(".menu").append("<hr>" + "<div class='row justify-content-center' style='margin:15px; font-size:20px; font-weight:bold; color:gold;'>" + "Choose An Action" + "</div>" + "<hr>");
    $(".menu").append("<div class='row justify-content-center menubox'>" + "<button type='button' class='btn btn-primary btn-lg' id='explore' data-toggle='tooltip' data-placement='left' title='Explore the ruins of the Fallen Kingdom, you may find things to aid your adventure.'>" + "Explore" + "</button>" + "</div>");
    $(".menu").append("<div class='row justify-content-center menubox'>" + "<button type='button' class='btn btn-primary btn-lg' id='quest' data-toggle='tooltip' data-placement='left' title='Help out the villagers and earn gold as a reward.'>" + "Quest" + "</button>" + "</div>");
    $(".menu").append("<div class='row justify-content-center menubox'>" + "<button type='button' class='btn btn-primary btn-lg' id='minion' data-toggle='tooltip' data-placement='left' title='Fight minions to hone your skills.'>" + "Fight Minion" + "</button>" + "</div>");
    $(".menu").append("<div class='row justify-content-center menubox'>" + "<button type='button' class='btn btn-primary btn-lg' id='general' data-toggle='tooltip' data-placement='left' title='Are you ready to take on a general for epic rewards?'>" + "Fight General" + "</button>" + "</div>");
    $(".menu").append("<div class='row justify-content-center menubox'>" + "<button type='button' class='btn btn-primary btn-lg' id='sleep' data-toggle='tooltip' data-placement='left' title='Rest for a day to fully recuperate'>" + "Make Camp" + "</button>" + "</div>");
}

//do a quest
function quest() {
    var questReward = Math.floor(Math.random() * 100 + 50) * (hero.stats.level + general.difficulty);
    hero.inventory.gold += questReward;
    turnLeft -= 1;
    $("#currentTurn").html(turnLeft);
    alert("You've earned " + questReward + " gold by " + questText[Math.floor(Math.random() * questText.length)]);
}

//generate minion stats
function minionGenerate() {
    minionLevel = Math.ceil(Math.random() * (hero.stats.level * general.difficulty) / 3);
    minionStats = {
        health: Math.ceil(Math.random() * (1000 * (4 + minionLevel) / 8)),
        attack: Math.ceil(Math.random() * (200 * (4 + minionLevel) / 8)),
        defense: Math.ceil(Math.random() * (100 * (4 + minionLevel) / 8)),
        speed: Math.ceil(Math.random() * (50 * (4 + minionLevel) / 8)),
        exp: Math.ceil(Math.random() * (100 * (4 + minionLevel) / 4)) + general.difficulty * 10,
        gold: Math.ceil(Math.random() * (30 * (4 + minionLevel) / 6)),
    }
    console.log(minionLevel);
    console.log(minionStats);
}
//minion battle interface
function battle() {
    //generate minion stats
    minionGenerate();
    turnLeft -= 1;
    $("#currentTurn").html(turnLeft);
    refreshStats();
    $("#quest").off('click');
    $("#sleep").off('click');
    $("#minion").off('click');
    $("#general").off('click');
    $(".gamescreen").empty().css("background-image", "url(assets/images/battleMinion.jpg)");
    monster = Math.ceil(Math.random() * 20);
    $(".gamescreen").append("<img class='minionImage' src='assets/images/monster" + monster + ".png'/>");
    $(".gamescreen").append("<h2 style='text-align:center; margin-top:380px; color:red; font-weight:bold;' class='encounter'>" + "You have encountered " + minionName[monster - 1] + "!");
    $(".encounter").prepend("<h2 style='text-align:center; font-weight:bold;'>Enemy HP - " + "<span id='enemyhp'>" + minionStats.health + "</span></h2>");
    $(".skill1").on("click", function () {
        combat[$(this).attr("ability")]();
    })
    document.onkeyup = function () {
        if (skillArray.includes(event.key)) {
            var skill = event.key;
            combat[skill]();
        }
    }
}

//generate boss
var bossMod = {};
function bossGenerate() {
    bossMod = {
        health: bossStat.health * general.difficulty,
        attack: bossStat.attack * general.difficulty,
        defense: bossStat.defense * general.difficulty,
        magic: bossStat.magic * general.difficulty,
        speed: bossStat.speed * general.difficulty,
        exp: bossStat.exp * general.difficulty,
        gold: bossStat.gold * general.difficulty,
    }

}

//boss battle interface
function bossBattle() {
    bossGenerate();
    console.log(general);
    console.log(bossMod);
    turnLeft -= 1;
    $("#currentTurn").html(turnLeft);
    refreshStats();
    $("#quest").off('click');
    $("#sleep").off('click');
    $("#minion").off('click');
    $("#general").off('click');
    $(".gamescreen").empty().css("background-image", "url(assets/images/battleBoss.jpg)");
    $(".gamescreen").append("<img class='minionImage' src='" + general.source + "'/>");
    $(".gamescreen").append("<h2 style='text-align:center; margin-top:380px; color:red; font-weight:bold;' class='encounter'>" + "You have encountered " + general.name + "!");
    $(".encounter").prepend("<h2 style='text-align:center; font-weight:bold;'>Enemy HP - " + "<span id='enemyhp'>" + bossMod.health + "</span></h2>");
    $(".skill1").on("click", function () {
        bossfight[$(this).attr("ability")]();
    })
    document.onkeyup = function () {
        if (skillArray.includes(event.key)) {
            var skill = event.key;
            bossfight[skill]();
        }
    }
}

//make camp
function camp() {
    $("#currentHealth").html(statsMod.health);
    hero.stats.currentHealth = statsMod.health;
    turnLeft -= 1;
    $("#currentTurn").html(turnLeft);
    alert("You are now fully rested. Get to work, " + hero.basicInfo.name + "!!!");
}

//create action bars
function actionbar() {
    $(".action").append("<div class='col-lg-7 skills'>" + "</div>");
    $(".skills").append("<div ability='1' class='skill skill1'>" + "1" + "</div>");
    $(".skill1").append("<img type='attack' class='skillIcon' src='assets/images/attack.png'/>")
    $(".skills").append("<div ability='2' class='skill skill2'>" + "2" + "</div>");
    $(".skills").append("<div ability='3' class='skill skill3'>" + "3" + "</div>");
    $(".skills").append("<div ability='4' class='skill skill4'>" + "4" + "</div>");
    $(".skills").append("<div ability='5' class='skill skill5'>" + "5" + "</div>");
    $(".action").append("<div class='col-lg-5 consumable'>" + "</div>");
    $(".consumable").append("<div class='items item1'" + "</div>");
    $(".consumable").append("<div class='items item2'" + "</div>");
    $(".consumable").append("<div class='items item3'" + "</div>");
    $(".consumable").append("<div class='items item4'" + "</div>");
    $(".consumable").append("<div class='items item5'" + "</div>");
    $(".consumable").append("<div class='items item6'" + "</div>");
    $(".consumable").append("<div class='items item7'" + "</div>");
    $(".consumable").append("<div class='items item8'" + "</div>");
    $(".consumable").append("<div class='items item9'" + "</div>");
    $(".consumable").append("<div class='items item10'" + "</div>");
    $(".consumable").append("<div class='items item11'" + "</div>");
    $(".consumable").append("<div class='items item12'" + "</div>");
    $(".consumable").append("<div class='items item13'" + "</div>");
    $(".consumable").append("<div class='items item14'" + "</div>");
    $(".consumable").append("<div class='items item15'" + "</div>");
    $(".consumable").append("<div class='items item16'" + "</div>");
}

//shop
function shop() {
    $("#quest").off('click');
    $("#sleep").off('click');
    $("#minion").off('click');
    $("#general").off('click');
    $(".gamescreen").empty().css("background-image", "url(assets/images/store.jpg)");
    $(".gamescreen").append("<button class='btn-primary btn-lg back'>" + "Leave" + "</button>").append("<h1 id='shopTitle'>" + "Magical Emporium" + "</h1>")
    $(".gamescreen").append("<div class='card card1' style='width: 7rem;'>" + "<img class='card-img-top' src='assets/images/weapon.png' >" + "<div alt='weapon' class='card-body'>" + "<p class='card-text'>" + "Upgrade Weapon" + "</p>" + "<div class='card-text'>" + "<p class='card-text'>" + upgradeCost.weapon + " G" + "</p>" + "<p class='card-text'>" + "LVL-" + hero.equipped.weapon + "</p>" + "</div>" + "</div>" + "<div class='buy10' alt='weapon'>Upgrade x 10</div>" + "<div class='buy100' alt='weapon'>Upgrade x 100</div>");
    $(".gamescreen").append("<div class='card card2' style='width: 7rem;'>" + "<img class='card-img-top' src='assets/images/helmet.png' >" + "<div alt='head' class='card-body'>" + "<p class='card-text'>" + "Upgrade Helmet" + "</p>" + "<div class='card-text'>" + "<p class='card-text'>" + upgradeCost.head + " G" + "</p>" + "<p class='card-text'>" + "LVL-" + hero.equipped.head + "</p>" + "</div>" + "</div>" + "<div class='buy10' alt='head'>Upgrade x 10</div>" + "<div class='buy100' alt='head'>Upgrade x 100</div>");
    $(".gamescreen").append("<div class='card card3' style='width: 7rem;'>" + "<img class='card-img-top' src='assets/images/armor.png' >" + "<div alt='body' class='card-body'>" + "<p class='card-text'>" + "Upgrade Armor" + "</p>" + "<div class='card-text'>" + "<p class='card-text'>" + upgradeCost.body + " G" + "</p>" + "<p class='card-text'>" + "LVL-" + hero.equipped.body + "</p>" + "</div>" + "</div>" + "<div class='buy10' alt='body'>Upgrade x 10</div>" + "<div class='buy100' alt='body'>Upgrade x 100</div>");
    $(".gamescreen").append("<div class='card card4' style='width: 7rem;'>" + "<img class='card-img-top' src='assets/images/gauntlet.png' >" + "<div alt='hands' class='card-body'>" + "<p class='card-text'>" + "Upgrade Gauntlets" + "</p>" + "<div class='card-text'>" + "<p class='card-text'>" + upgradeCost.hands + " G" + "</p>" + "<p class='card-text'>" + "LVL-" + hero.equipped.hands + "</p>" + "</div>" + "</div>" + "<div class='buy10' alt='hands'>Upgrade x 10</div>" + "<div class='buy100' alt='hands'>Upgrade x 100</div>");
    $(".gamescreen").append("<div class='card card5' style='width: 7rem;'>" + "<img class='card-img-top' src='assets/images/leggings.png' >" + "<div alt='legs' class='card-body'>" + "<p class='card-text'>" + "Upgrade Leggings" + "</p>" + "<div class='card-text'>" + "<p class='card-text'>" + upgradeCost.legs + " G" + "</p>" + "<p class='card-text'>" + "LVL-" + hero.equipped.legs + "</p>" + "</div>" + "</div>" + "<div class='buy10' alt='legs'>Upgrade x 10</div>" + "<div class='buy100' alt='legs'>Upgrade x 100</div>");
    $(".gamescreen").append("<div class='card card6' style='width: 7rem;'>" + "<img class='card-img-top' src='assets/images/boots.png' >" + "<div alt='feet' class='card-body'>" + "<p class='card-text'>" + "Upgrade Boots" + "</p>" + "<div class='card-text'>" + "<p class='card-text'>" + upgradeCost.feet + " G" + "</p>" + "<p class='card-text'>" + "LVL-" + hero.equipped.feet + "</p>" + "</div>" + "</div>" + "<div class='buy10' alt='feet'>Upgrade x 10</div>" + "<div class='buy100' alt='feet'>Upgrade x 100</div>");
    $(".gamescreen").append("<div class='goldCounter rounded'>" + hero.inventory.gold + " G" + "</div>");
    refreshStats();
    $(".gamescreen").append("<div style='text-align:center;' class='statsContainer'></div>");
    $(".statsContainer").append("<span class='stats'>" + "ATTACK - " + statsMod.attack + "</span>");
    $(".statsContainer").append("<span class='stats'>" + "DEFENSE - " + statsMod.defense + "</span>");
    $(".statsContainer").append("<span class='stats'>" + "MAGIC - " + statsMod.magic + "</span>");
    $(".statsContainer").append("<span class='stats'>" + "SPEED - " + statsMod.speed + "</span>");
    $(".back").on("click", function () {
        gamemap();
    })
    //upgrade gear
    $(".card-body").on("click", function () {
        var slot = $(this).attr('alt');
        if (hero.inventory.gold >= upgradeCost[slot]) {
            hero.inventory.gold -= upgradeCost[slot];
            hero.equipped[slot] += 1;
            upgradeCost[slot] += 5;
            shop();
        }
    })

    //upgrade gear x 10
    $(".buy10").on("click", function () {
        var slot = $(this).attr('alt');
        for (var i = 0; i < 10; i++) {
            if (hero.inventory.gold >= upgradeCost[slot]) {
                hero.inventory.gold -= upgradeCost[slot];
                hero.equipped[slot] += 1;
                upgradeCost[slot] += 5;
                shop();
            }
        }
    })

    //upgrade gear x 100
    $(".buy100").on("click", function () {
        var slot = $(this).attr('alt');
        for (var i = 0; i < 100; i++) {
            if (hero.inventory.gold >= upgradeCost[slot]) {
                hero.inventory.gold -= upgradeCost[slot];
                hero.equipped[slot] += 1;
                upgradeCost[slot] += 5;
                shop();
            }
        }
    })
}

//shop items

//interface setup
function interface() {
    $("body").empty();
    $("body").append("<audio autoplay:'true' src='assets/sound/backtrack.mp3' loop='true' id='backtrack'>" + "</audio>");
    document.getElementById("backtrack").play();
    $("body").append("<div class='container'>" + "</div>");
    $(".container").append("<div class='row topbar border border-warning'>" + "</div>");
    $(".topbar").append("<div class='col-lg-3 status'>" + "</div>");
    $(".status").append("<div class='row'>" + "Health : " + "<span id='currentHealth'>" + "</span>" + "  /  " + "<span id='maxHealth'>" + "</span>" + "</div>");
    $(".status").append("<div class='row'>" + "Mana : " + "<span id='currentMana'>" + "</span>" + "  /  " + "<span id='maxMana'>" + "</span>" + "</div>");
    $(".topbar").append("<div class='col-lg-3 level'>" + "</div>");
    $(".level").append("<div class='row'>" + "level : " + "<span id='lvl'>" + "</span>" + "</div>");
    $(".level").append("<div class='row'>" + "EXP : " + "<span id='currentExp'>" + "</span>" + "  /  " + "<span id='maxExp'>" + "</span>" + "</div>");
    $(".topbar").append("<div class='col-lg-2 class'>" + "</div>");
    $(".topbar").append("<div class='col-lg-3 turns'>" + "</div>");
    $(".turns").append("<div class='row'>" + "Turns Until Final Battle  " + "<span id='currentTurn' style='padding-left:100px; font-size:30px;'>" + "200" + "</span>" + "</div>");
    $(".container").append("<div class='row midsection'>" + "</div>");
    $(".midsection").append("<div class='col-lg-9 gamescreen border border-warning'>" + "</div>");
    $(".midsection").append("<div class='col-lg-3 menu border border-warning'>" + "</div>");
    $(".container").append("<div class='row action border border-warning'>" + "</div>");
    $("#currentHealth").html("0");
    $("#maxHealth").html("0");
    $("#currentMana").html("0");
    $("#maxMana").html("0");
    $("#lvl").html("1");
    $("#currentExp").html("0");
    $("#maxExp").html("0");
    $('.gamescreen').append("<div class='classIcon rounded' id='warrior'>" + "<img class='icon' src='assets/images/warrior.png'/>" + "<div class='title'>" + "Warrior" + "</div>" + "</div>");
    $('.gamescreen').append("<div class='classIcon rounded' id='archer'>" + "<img class='icon' src='assets/images/archer.png'/>" + "<div class='title'>" + "Archer" + "</div>" + "</div>");
    $('.gamescreen').append("<div class='classIcon rounded' id='mage'>" + "<img class='icon' src='assets/images/mage.png'/>" + "<div class='title'>" + "Mage" + "</div>" + "</div>");
    $('.gamescreen').append("<div class='classIcon rounded' id='healer'>" + "<img class='icon' src='assets/images/healer.png'/>" + "<div class='title'>" + "Healer" + "</div>" + "</div>");
    $('.gamescreen').append("<div id='chooseText'>" + "Choose Your Class" + "</div>");

    //choose characters
    $("#warrior").on("click", function () {
        createWarrior();
    })

    $("#archer").on("click", function () {
        createArcher();
    })

    $("#mage").on("click", function () {
        createMage();
    })

    $("#healer").on("click", function () {
        createHealer();
    })

}
//play song

$(document).ready(function () {

    //game interface set up
    $("button").on("click", function () {
        interface();
    })



})
