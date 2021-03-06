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
        moneyLabel: {
            default: null,
            type: cc.Label
        },
        shopCtrl:{
            default: null,
            type: cc.Node
        },
        dialogBoxCtrl:{
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    reflectLabel() {
        
        if(!this.frontDead){
        this.frontHpLabel.string = ("HP "+ this.frontHp +"/" +this.maxHp).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }else{
        this.frontHpLabel.string = ("HP "+ this.frontHp +"/0").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }
    
        this.frontPhyLabel.string = ("PHY "+ this.frontPhy).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.frontIntLabel.string = ("INT "+ this.frontInt).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.frontAgiLabel.string = ("AGI "+ this.frontAgi).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        
        if(!this.middleDead){
        this.middleHpLabel.string = ("HP "+ this.middleHp +"/" +this.maxHp).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }else{
        this.middleHpLabel.string = ("HP "+ this.middleHp +"/0").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }
    
        this.middlePhyLabel.string = ("PHY "+ this.middlePhy).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.middleIntLabel.string = ("INT "+ this.middleInt).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.middleAgiLabel.string = ("AGI "+ this.middleAgi).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        
        if(!this.backDead){
        this.backHpLabel.string = ("HP "+ this.backHp +"/" +this.maxHp).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }else{
        this.backHpLabel.string = ("HP "+ this.backHp +"/0").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    }
    
        this.backPhyLabel.string = ("PHY "+ this.backPhy).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.backIntLabel.string = ("INT "+ this.backInt).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.backAgiLabel.string = ("AGI "+ this.backAgi).replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });

        this.moneyLabel.string = ("シエンキン： "+ this.money+"エン").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });

        if(this.frontDead){
            this.frontPhy = 0;
            this.frontInt = 0;
            this.frontAgi = 0;
            this.frontHp = 0;
        }
        if(this.middleDead){
            this.middlePhy = 0;
            this.middleInt = 0;
            this.middleAgi = 0;
            this.middleHp = 0;
        }
        if(this.backDead){
            this.backPhy = 0;
            this.backInt = 0;
            this.backAgi = 0;
            this.backHp = 0;
        }

        this.sumPhy = this.frontPhy + this.middlePhy + this.backPhy;
        this.sumInt = this.frontInt + this.middleInt + this.backInt;
        this.sumAgi = this.frontAgi + this.middleAgi + this.backAgi;
        this.sumHp = this.frontHp + this.middleHp + this.backHp;


        if(this.sumHp <= 0){
            this.dialogBoxCtrl.getComponent("DialogBoxCtrl").showGameOver(false);
        }
    },

    onLoad () {
        this.frontHp = 45;
        this.frontPhy = 16;
        this.frontInt = 14;
        this.frontAgi = 15;
        this.frontDead = false;

        this.middleHp = 45;
        this.middlePhy = 16;
        this.middleInt = 14;
        this.middleAgi = 15;
        this.middleDead = false;

        this.backHp = 45;
        this.backPhy = 16;
        this.backInt = 14;
        this.backAgi = 15;
        this.backDead = false;

        this.maxHp = 45;

        this.moneyRate = 1;
        this.money = 0;

        this.sumPhy = this.frontPhy + this.middlePhy + this.backPhy;
        this.sumInt = this.frontInt + this.middleInt + this.backInt;
        this.sumAgi = this.frontAgi + this.middleAgi + this.backAgi;

        this.reflectLabel();
    },

    reset: function() {
        this.frontHero.opacity = 255;
        this.middleHero.opacity = 255;
        this.backHero.opacity = 255;
},

    addMoney(amount) {
        this.money += amount;
        this.reflectLabel();
        this.shopCtrl.getComponent("ShopCtrl").changeLabelColor(this.money);
    },

    takeDamage(num, damage) {
        var self = this;
        switch(num){
            case 0:
            this.frontHp -= damage;
            if(!this.frontDead){
            this.frontHero.runAction(cc.sequence(cc.blink(0.1,3), cc.callFunc(this.reset(),this)));
        
            }
            if(this.frontHp <= 0) {
                this.frontHp = 0;
                
                cc.loader.loadRes("dead", cc.SpriteFrame, function (err, spriteFrame) {
                    self.frontHero.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                if(!this.frontDead) this.dialogBoxCtrl.getComponent("DialogBoxCtrl").showMessage("ＭＣＨウォーリアはしんでしまった");
                this.frontDead = true;
            }
            break;
            case 1:
            this.middleHp -= damage;
            if(!this.middleDead){
            this.middleHero.runAction(cc.sequence(cc.blink(0.1,3), cc.callFunc(this.reset(),this)));
            }
            if(this.middleHp <= 0) {
                this.middleHp = 0;
                
                cc.loader.loadRes("dead", cc.SpriteFrame, function (err, spriteFrame) {
                    self.middleHero.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                if(!this.middleDead) this.dialogBoxCtrl.getComponent("DialogBoxCtrl").showMessage("ＭＣＨタクティシャンはしんでしまった");
                this.middleDead = true;
            }
            break;
            case 2:
            this.backHp -= damage;
            if(!this.backDead){
            this.backHero.runAction(cc.sequence(cc.blink(0.1,3), cc.callFunc(this.reset(),this)));
            }
            if(this.backHp <= 0) {
                this.backHp = 0;
                
                cc.loader.loadRes("dead", cc.SpriteFrame, function (err, spriteFrame) {
                    self.backHero.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                
                if(!this.backDead) this.dialogBoxCtrl.getComponent("DialogBoxCtrl").showMessage("ＭＣＨアーティストはしんでしまった");
                this.backDead = true;
            }
            break;
        }

        this.reflectLabel();
    },

    start () {

    },

    update (dt) {
        

    },
});
