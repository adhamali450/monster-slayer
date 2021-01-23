new Vue({
    el: '#app',
    data: {
        gameLog: [],
        selfHealth: 100, 
        monsterHealth: 100,
        showInGameActionCenter: false,
        healCount: 3,
        attackCount: 0,
        damageDealt: 0,
        damageTaken: 0,
        hmSpecialAttacks: 0,
    },
    methods: {
        rand(min, max) {
            return Math.floor(Math.random() * ((max - min) + 1) + min);
        },
        startNewGame() {
            //setting values to default
            this.resetValues();

            //toggling action center
            this.showInGameActionCenter = true;
            //clearing game log
            this.gameLog = [];            
          },
        attackMonster(){
            //generate a random attack damage
            let damage = this.rand(1, 10);

            //decrease monster health
            if((this.monsterHealth - damage) > 0){
                this.monsterHealth -= damage;
            }
            else{
                this.monsterHealth = 0;
            }

            //============stats==========
            //increase attack count in game log
            this.attackCount += 1;
            //increase damage dealt
            this.damageDealt += damage;
            //log the stats
            this.logAction("attack", "player", damage)

            //make monster attack me with a greater random value
            this.recieveDamage(3, 10);
        },
        specialAttackMonster(){
            //generate a random damage and increase it 
            //in case the player hasn't used a special 
            //attacks for 2 times

            let damage = (this.attackCount == 8) ? this.rand(3, 10):
             this.rand(1, 5);
             

            //decrease monester health
            if((this.monsterHealth - damage) > 0){
                this.monsterHealth -= damage;
            }
            else{
                this.monsterHealth = 0;
            }

            this.attackCount -= 4;

            this.damageDealt += damage;
            
            this.hmSpecialAttacks++;
            
            //log to the states
            this.logAction("specialAttack", "Player", damage);
        },
        healSelf(){
            //generate a random heal, assign it to the player's health
            let heal = this.rand(5, 10);

            this.selfHealth += heal;

            //decrease heal count
            this.healCount-=1;

            //log to the states
            this.logAction("heal", "Player",  heal);
        },
        surrender(){
            //reset values to default
            this.resetValues();
            this.showInGameActionCenter = false;
        },
        recieveDamage(min, max){
            //get a random damage
            let damage = this.rand(min, max);

            //decrease my health
            if((this.selfHealth - damage) > 0){
                this.selfHealth -= damage;
            }
            else{
                this.selfHealth = 0;
            }

            //increase damage taken
            this.damageTaken += damage;

            //log the stats
            this.logAction("attacked", "monster", damage);

        },
        logAction(actionTaken, entity, value) {
            let action = {
              actionTaken: actionTaken,
              entity: entity,
              actionValue: value
            };

            this.gameLog.push(action);
        },
        resetValues(){
            this.selfHealth = 100;
            this.monsterHealth = 100;
            this.attackCount = 0;
            this.damageDealt = 0;
            this.damageTaken = 0;
            this.healCount = 3;
        }
    },
    computed: {
        healsUsed: function(){
            return 3 - this.healCount;
        },
        anyHealthZeroed: function() {
            return this.selfHealth == 0 ||
            this.monsterHealth == 0;
        }, 
      },
});