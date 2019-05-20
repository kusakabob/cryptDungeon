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
        text: {
            default: null,
            type: cc.Prefab
        },
        gameOver: {
            default: null,
            type: cc.Node
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
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.messagePool = new cc.NodePool();
        let initCount = 5;
        for (let i = 0; i < initCount; ++i) {
            let message = cc.instantiate(this.text);
            this.messagePool.put(message); // populate your pool with put method
        }
        this.messageArray = [];
        this.gameOver.opacity = 0;
        this.end = false;
    },

    showGameOver(condition){
        this.gameOver.opacity = 255;
        if (condition){
            this.gameOver.getComponent(cc.Label).string = "ゲームクリア！"
        }
        var self = this;
        this.messageArray.forEach(function(item, index){
            self.showMessage("");
        });
        this.end = true;
        if(!condition){
            cc.loader.loadRes("dead", cc.SpriteFrame, function (err, spriteFrame) {
                self.frontHero.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("dead", cc.SpriteFrame, function (err, spriteFrame) {
                self.middleHero.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("dead", cc.SpriteFrame, function (err, spriteFrame) {
                self.backHero.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
    },

    showMessage(text){
    if(this.end) return;
        
    let message = null;
    if (this.messagePool.size() > 0) { 
        message = this.messagePool.get();
    } else { 
        message = cc.instantiate(this.text);
    }
    message.parent = this.node;

    message.getComponent(cc.Label).string = text;

    if(this.messageArray.length > 4){
    }
    
    this.messageArray.unshift(message);

    if(this.messageArray.length > 5){
        this.messagePool.put(this.messageArray[5]);
        this.messageArray.pop(message);
    }

    this.messageArray.forEach(function(item, index){
        var textX = -130
        
        switch(index){
            case 0:
            item.position = cc.v2(textX, -43);
            break;
            case 1:
            item.position = cc.v2(textX, -23);
            break;
            case 2:
            item.position = cc.v2(textX, -3);
            break;
            case 3:
            item.position = cc.v2(textX, 17);
            break;
            case 4:
            item.position = cc.v2(textX, 37);
            break;
            default:
            break;
        }     
    });
    },

    start () {

    },

    // update (dt) {},
});
