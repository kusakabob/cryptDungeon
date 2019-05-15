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
        frontHpLabel: {
            default: null,
            type: cc.Label,
        },
        frontPhyLabel: {
            default: null,
            type: cc.Label,
        },
        frontIntLabel: {
            default: null,
            type: cc.Label,
        },
        frontAgiLabel: {
            default: null,
            type: cc.Label,
        },
        middleHpLabel: {
            default: null,
            type: cc.Label,
        },
        middlePhyLabel: {
            default: null,
            type: cc.Label,
        },
        middleIntLabel: {
            default: null,
            type: cc.Label,
        },
        middleAgiLabel: {
            default: null,
            type: cc.Label,
        },
        backHpLabel: {
            default: null,
            type: cc.Label,
        },
        backPhyLabel: {
            default: null,
            type: cc.Label,
        },
        backIntLabel: {
            default: null,
            type: cc.Label,
        },
        backAgiLabel: {
            default: null,
            type: cc.Label,
        },
        frontHero: {
            default: null,
            type: cc.Node
        },
        middleHero: {
            default: null,
            type: cc.Node
        },
        backHero: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    reflectLabel() {
        this.frontHpLabel.string = ("HP "+ this.frontHp +"/45").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.frontPhyLabel.string = ("PHY "+ this.frontPhy).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.frontIntLabel.string = ("INT "+ this.frontInt).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.frontAgiLabel.string = ("AGI "+ this.frontAgi).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });

        this.middleHpLabel.string = ("HP "+ this.middleHp +"/45").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.middlePhyLabel.string = ("PHY "+ this.middlePhy).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.middleIntLabel.string = ("INT "+ this.middleInt).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.middleAgiLabel.string = ("AGI "+ this.middleAgi).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.backHpLabel.string = ("HP "+ this.backHp +"/45").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.backPhyLabel.string = ("PHY "+ this.backPhy).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.backIntLabel.string = ("INT "+ this.backInt).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.backAgiLabel.string = ("AGI "+ this.backAgi).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    },

    onLoad () {
        this.frontHp = 45;
        this.frontPhy = 16;
        this.frontInt = 14;
        this.frontAgi = 15;

        this.middleHp = 45;
        this.middlePhy = 16;
        this.middleInt = 14;
        this.middleAgi = 15;

        this.backHp = 45;
        this.backPhy = 16;
        this.backInt = 14;
        this.backAgi = 15;

        this.sumPhy = this.frontPhy + this.middlePhy + this.backPhy;
        this.sumAgi = this.frontAgi + this.middleAgi + this.backAgi;

        this.reflectLabel();
    },

    reset: function() {
        this.frontHero.opacity = 255;
        this.middleHero.opacity = 255;
        this.backHero.opacity = 255;
},

    takeDamage(num, damage) {
        switch(num){
            case 0:
            this.frontHp -= damage;
            this.frontHero.runAction(cc.sequence(cc.blink(0.1,3), cc.callFunc(this.reset(),this)));
            break;
            case 1:
            this.middleHp -= damage;
            this.middleHero.runAction(cc.sequence(cc.blink(0.1,3), cc.callFunc(this.reset(),this)));
            break;
            case 2:
            this.backHp -= damage;
            this.backHero.runAction(cc.sequence(cc.blink(0.1,3), cc.callFunc(this.reset(),this)));
            break;
        }

        console.log(this.frontHp);


        this.reflectLabel();
    },

    start () {

    },

    // update (dt) {},
});
