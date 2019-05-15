	
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
        monsterBar: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        var self = this;
        self.hpBarLeft = self.hpBar.getChildByName("left").scaleX;
        self.randomRange = cc.v2(100, 100);
        self.variability = 30;
    },

    start: function(){
    },

    random: function(damage){
        var randomDamage = Math.round(Math.random() * ((damage + this.variability) - (damage - this.variability)) + damage -this.variability);
        if (randomDamage < 0) randomDamage = 0;
        return randomDamage;
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

        var damagePercentage = damage / this.monster.getComponent("MonsterScript").hp;
        var subtractPercentage = damagePercentage * (this.hpBar.getChildByName("left").scaleX / 100);
        this.hpBar.getChildByName("left").scaleX = this.hpBar.getChildByName("left").scaleX - subtractPercentage;
        }

        if(this.monsterBar.getChildByName("monster_icon").x > 0){
        this.monsterBar.getChildByName("monster_icon").runAction(cc.moveBy(0.1, cc.v2(-1,0)))
        }
        var text = "ＭＣＨウォーリアの攻撃：" + damage + "ダメージ"

        this.dialogBox.getComponent("DialogBoxCtrl").showMessage(text);

        this.statusCtrl.getComponent("StatusCtrl").addMoney(1);
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