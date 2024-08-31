#!/usr/bin/env node
import { select } from '@inquirer/prompts';
// Game Variable
let enemies = ["skeleton", "zombie", "warrior", "assassin"];
let maxEnemyHealth = 75;
let enemyAttackDemange = 25;
// Player Variable
let health = 100;
let attackDemage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // percentage
let running = true;
console.log("Welcome to the Danger!");
GAME: while (running) {
    console.log("-------------------------------------------------------------------");
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`\t# ${enemy} has appeared! # \n `);
    while (enemyHealth > 0) {
        // HP: healthPotion
        console.log(`\t Your HP: ${health}`);
        console.log(`\t ${enemy}'s HP: ${enemyHealth}`);
        const userAnswer = await select({
            message: "What would you like to do?",
            choices: [{ name: "Attack", value: "attack" },
                { name: "Drink Health Potion", value: "drink health potion" },
                { name: "Run", value: "run" }]
        });
        if (userAnswer === "attack") {
            let damageDealt = Math.floor(Math.random() * attackDemage);
            let damageTaken = Math.floor(Math.random() * enemyAttackDemange);
            enemyHealth -= damageDealt;
            health -= damageTaken;
            console.log(`\t> You attack the ${enemy} for ${damageDealt} damage.`);
            console.log(`\t> You receive ${damageTaken} in retaliation.`);
            if (health < 1) {
                console.log(`\t> You have taken to much demage, you are too weak to go on!`);
                break;
            }
        }
        else if (userAnswer === "drink health potion") {
            if (numHealthPotions > 0) {
                health += healthPotionHealAmount;
                numHealthPotions--;
                console.log(`\t> You drink a Health Potion, healing yourself for ${healthPotionHealAmount}.\n\t> You now have ${health} HP. \n\t> You have ${numHealthPotions} health potions left.\n`);
            }
            else {
                console.log(`\t> You have no health potions left! defeat enemies for a chance to get one`);
            }
        }
        else if (userAnswer === "run") {
            console.log(`\t> You run away from the ${enemy}!`);
            continue GAME;
        }
        else {
            console.log("\t Invalid command!");
        }
    } // second while loop
    if (health < 1) {
        console.log(`\t You limp out of the dungeon, weak from Battle.`);
        break;
    }
    console.log("-------------------------------------------------------------------");
    console.log(`# ${enemy} was defeated! #`);
    console.log(`# You have ${health} HP left. #`);
    if (Math.random() * 100 < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`# The ${enemy} dropped a health potion #`);
        console.log(`# You now have ${numHealthPotions} health potion(s). #`);
    }
    console.log("-------------------------------------------------------------------");
    const userAnswer2 = await select({
        message: "What would you like to do now?",
        choices: [{ name: "Continue Fighting", value: "continue fighting" },
            { name: "Exit Dungeon", value: "exit dungeon" }]
    });
    if (userAnswer2 === "Continue Fighting") {
        console.log("You continue on your Adventures");
    }
    else if (userAnswer2 === "exit dungeon") {
        console.log("You exit the dungeon, successful from your Adventures!");
        break;
    }
    console.log("#######################");
    console.log(" # Thanks for Playing #!");
    console.log("#######################");
} // GAME while loop
