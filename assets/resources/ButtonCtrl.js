	
cc.Class({
    extends: cc.Component,
 
    properties: {
        frontButton: cc.Node,
        middleButton: cc.Node,
        backButton: cc.Node,
        hpBar: {
            default: null,
            type: cc.Node,
        },
        frontAnim: {
            default: null,
            type: cc.Animation
        },
        monster: {
            default: null,
            type: cc.Node
        },
        damage: {
            default: null,
            type: cc.Prefab
        },
        statusCtrl: {
            default: null,
            type: cc.Node
        },
        dialogBox: {
            default: null,
            type: cc.Node
        },
        text: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad: function () {
        var self = this;
        self.hpBarLeft = self.hpBar.getChildByName("left").scaleX;
        self.randomRange = cc.v2(100, 100);
        self.variability = 30;

        self.messagePool = new cc.NodePool();
        let initCount = 5;
        for (let i = 0; i < initCount; ++i) {
            let message = cc.instantiate(this.text);
            this.messagePool.put(message); // populate your pool with put method
        }
        self.messageArray = [];
    },

    start: function(){
    },

    random: function(damage){
        return Math.round(Math.random() * ((damage + this.variability) - (damage - this.variability)) + damage -this.variability);
    },

    showDamage: function() {
        var damageCount = cc.instantiate(this.damage);
        damageCount.num = this.statusCtrl.getComponent("StatusCtrl").sumPhy;
        damageCount.num = this.random(damageCount.num);
        damageCount.getComponent(cc.Label).string = damageCount.num;
        damageCount.parent = this.monster;
        damageCount.scaleX = -1;
        damageCount.position = this.getRandomPosition();
        setTimeout(function () {
            damageCount.runAction(cc.sequence(cc.fadeOut(0.1),cc.removeSelf()));
          }.bind(this), 500);
        return damageCount.num;
    },

    showMessage: function(damage) {
        
        let message = null;
    if (this.messagePool.size() > 0) { 
        message = this.messagePool.get();
    } else { 
        message = cc.instantiate(this.text);
    }
    message.parent = this.dialogBox;

    let action = "ＭＣＨウォーリアの攻撃：" + damage + "ダメージ"

    message.getComponent(cc.Label).string = action;

    if(this.messageArray.length > 4){
    }
    
    this.messageArray.unshift(message);

    if(this.messageArray.length > 5){
        this.messagePool.put(this.messageArray[5]);
        this.messageArray.pop(message);
    }

    this.messageArray.forEach(function(item, index){
        
        switch(index){
            case 0:
            item.position = cc.v2(-120, -43);
            break;
            case 1:
            item.position = cc.v2(-120, -23);
            break;
            case 2:
            item.position = cc.v2(-120, -3);
            break;
            case 3:
            item.position = cc.v2(-120, 17);
            break;
            case 4:
            item.position = cc.v2(-120, 37);
            break;
            default:
            break;
        }     
    });
   
    },
 
    reset: function() {
            this.monster.opacity = 255;
        
        if (this.frontButton.scaleX < 1.178){
            this.frontButton.scaleX = 1.178;
            this.frontButton.scaleY = 1.178;
        }
    },

    onFrontButtonClicked: function() {
        var onPress = cc.sequence(cc.scaleBy(0.05, 0.98), cc.scaleBy(0.05, 1.02), cc.callFunc(this.reset(),this));
        var anim = this.frontAnim;
        anim.play('frontAttack');
        this.frontButton.runAction(onPress);
        this.monster.runAction(cc.sequence(cc.blink(0.1,3), cc.callFunc(this.reset(),this)));
        var damage = this.showDamage();
        if(this.hpBar.getChildByName("left").scaleX > 0){

        var damagePercentage = damage / this.monster.getComponent("monsterScript").hp;
        var subtractPercentage = damagePercentage * (this.hpBar.getChildByName("left").scaleX / 100);
        this.hpBar.getChildByName("left").scaleX = this.hpBar.getChildByName("left").scaleX - subtractPercentage;
        }

        this.showMessage(damage);

    },
    onMiddleButtonClicked: function() {
        var onPress = cc.sequence(cc.scaleBy(0.05, 0.98), cc.scaleBy(0.05, 1.02));
        console.log('middle button clicked!');
        this.middleButton.runAction(onPress);
        this.monster.runAction(cc.blink(0.2,3));
    },
    onBackButtonClicked: function() {
        var onPress = cc.sequence(cc.scaleBy(0.05, 0.98), cc.scaleBy(0.05, 1.02));
        console.log('back button clicked!');
        this.backButton.runAction(onPress);
        this.monster.runAction(cc.blink(0.2,3));
    },

    getRandomPosition: function() {
        return cc.v2((Math.random() - 0.5) * 2 * this.randomRange.x, (Math.random() - 0.5) * 2 * this.randomRange.y);
    },
    

});