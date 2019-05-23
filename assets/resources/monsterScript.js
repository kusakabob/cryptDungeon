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
        },
        moveAudio: {
            default: null,
            type:cc.AudioClip
        },
        attackAudio: {
            default: null,
            type: cc.AudioClip
        },
        hpBar: {
            default: null,
            type: cc.Node
        },
        levelUpAudio: {
            default: null,
            type: cc.AudioClip
        },
        nameLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    onLoad () {
        this.stop = false;
        cc.audioEngine.setEffectsVolume(0.5);
        this.level = 1;
    },

    start (){
        this.interval = this.statusCtrl.getComponent("StatusCtrl").sumAgi;
        this.interval = 45 / this.interval;
        this.timer = this.schedule(this.action, this.interval);
    },

    resetSchedule (){
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
        console.log(randomNum);

        if(randomNum == 0){
            this.attack(this.power);
        }else{
            this.move();
        }
        
    },

    levelUp() {
        var self = this;
        this.level += 1;
        cc.audioEngine.playEffect(this.levelUpAudio, false);

        switch(this.level){
            case 2:
            this.hp = 10000;
            this.power = 10;
            this.interval = 0.9;
            this.resetSchedule();
            this.hpBar.getChildByName("left").scaleX = 39.537;
            this.nameLabel.string = "キマイラ";
            cc.loader.loadRes("monster", cc.SpriteFrame, function (err, spriteFrame) {
                self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            
            break;
            case 3:
            this.hp = 50000;
            this.power = 20;
            this.interval = 0.8;
            this.resetSchedule();
            this.hpBar.getChildByName("left").scaleX = 39.537;
            this.nameLabel.string = "ギガキマイラ"
            cc.loader.loadRes("monster2", cc.SpriteFrame, function (err, spriteFrame) {
                self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            break;
            case 4:
            this.hp = 100000;
            this.power = 50;
            this.interval = 1;
            this.resetSchedule();
            this.hpBar.getChildByName("left").scaleX = 39.537;
            this.nameLabel.string = "クリプ首領"
            cc.loader.loadRes("cryptdon", cc.SpriteFrame, function (err, spriteFrame) {
                self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            break;
        }
    },

    move () {
        cc.audioEngine.playEffect(this.moveAudio, false);
        var monsterIcon = this.monsterBar.getChildByName("monster_icon");
        this.node.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(20,0)), cc.moveBy(0.1, cc.v2(-20,0)) ))
        if(monsterIcon.x <= 271){
        monsterIcon.runAction(cc.moveBy(0.1, cc.v2(15,0)))
        }else{
            console.log("gameover");
            this.dialogBox.getComponent("DialogBoxCtrl").showGameOver(false);
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
        cc.audioEngine.playEffect(this.attackAudio, false);
        }else{
            text = "モンスターは様子をうかがっている";
        }

        statusCtrl.takeDamage(randomNum, power);

        this.dialogBox.getComponent("DialogBoxCtrl").showMessage(text);
    },

    // update (dt) {},
});
