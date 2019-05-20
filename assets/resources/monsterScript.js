// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        interval: 0.1,
        speed: 0.1,
        power: 0,
        monsterBar: {
            default: null,
            type: cc.Node
        },
        dialogBox: {
            default: null,
            type: cc.Node
        },
        statusCtrl:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    onLoad () {
        this.stop = false;
    },

    start (){
        this.interval = this.statusCtrl.getComponent("StatusCtrl").sumAgi;
        this.interval = this.interval / 45;
        this.timer = this.schedule(this.action, this.interval);
    },

    resetSchedule (){
        this.interval = this.statusCtrl.getComponent("StatusCtrl").sumAgi;
        this.interval = this.interval / 45;
        this.stop = true;
    },

    reschedule(action) {
        this.stop = false;
        this.timer = this.schedule(action, this.interval);
    },

    action () {
        var end = this.dialogBox.getComponent("DialogBoxCtrl").end;

        if(this.stop || end) {
            this.unschedule(this.action);
            if(!end){
            this.reschedule(this.action);
            }
        };
        var randomNum = this.getRandomInt(2);

        if(randomNum == 0){
            this.attack(this.power);
        }else{
            this.move();
        }
        
    },

    move () {
        var monsterIcon = this.monsterBar.getChildByName("monster_icon");
        this.node.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(20,0)), cc.moveBy(0.1, cc.v2(-20,0)) ))
        if(monsterIcon.x <= 271){
        monsterIcon.runAction(cc.moveBy(0.1, cc.v2(5,0)))
        }else{
            this.dialogBox.getComponent("dialogBoxCtrl").showGameOver(false);
        }

        var text = "モンスターは前進している";

        this.dialogBox.getComponent("DialogBoxCtrl").showMessage(text);

    },

    attack (power) {

        var randomNum = this.getRandomInt(3);
        var statusCtrl = this.statusCtrl.getComponent("StatusCtrl");

        var target ="";
        var targetDead = false;

        switch(randomNum){
            case 0:
            target = "MCHウォーリア";
            if(statusCtrl.frontDead){
                targetDead = true;
            }
            break;
            case 1:
            target = "MCHタクティシャン";
            if(statusCtrl.middleDead){
                targetDead = true;
            }
            break;
            case 2:
            target = "MCHアーティスト";
            if(statusCtrl.backDead){
                targetDead = true;
            }
            break;
        }

        var text = "";
        if(!targetDead){
        text = "モンスターの攻撃：" + target + "に" + power + "ダメージ";
        }else{
            text = "モンスターは様子をうかがっている";
        }

        statusCtrl.takeDamage(randomNum, power);

        this.dialogBox.getComponent("DialogBoxCtrl").showMessage(text);
    },

    // update (dt) {},
});
