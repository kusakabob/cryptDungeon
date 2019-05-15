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
        
    },

    start (){
        this.interval = this.statusCtrl.getComponent("StatusCtrl").sumAgi;
        this.schedule(this.action, 1);
    },

    action () {
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
        }

        var text = "モンスターは前進している";

        this.dialogBox.getComponent("DialogBoxCtrl").showMessage(text);

    },

    attack (power) {

        var randomNum = this.getRandomInt(3);

        this.statusCtrl.getComponent("StatusCtrl").takeDamage(randomNum, power);

        var target ="";

        switch(randomNum){
            case 0:
            target = "MCHウォーリア";
            break;
            case 1:
            target = "MCHタクティシャン";
            break;
            case 2:
            target = "MCHアーティスト";
            break;
        }

        var text = "モンスターの攻撃：" + target + "に" + power + "ダメージ";

        this.dialogBox.getComponent("DialogBoxCtrl").showMessage(text);
    },

    // update (dt) {},
});
