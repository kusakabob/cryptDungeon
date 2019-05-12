	
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
        }
    },

    onLoad: function () {
        var self = this;
        self.hpBarLeft = self.hpBar.getChildByName("left").scaleX;
        self.randomRange = cc.v2(100, 100);
    },

    showDamage: function() {
        var damageCount = cc.instantiate(this.damage);
        damageCount.parent = this.monster;
        damageCount.scaleX = -1;
        damageCount.position = this.getRandomPosition();
        setTimeout(function () {
            damageCount.runAction(cc.sequence(cc.fadeOut(0.1),cc.removeSelf()));
            
            //damageCount.destroy();
          }.bind(this), 500);
    },
 
    onFrontButtonClicked: function() {
        var onPress = cc.sequence(cc.scaleBy(0.05, 0.98), cc.scaleBy(0.05, 1.02));
        var anim = this.frontAnim;
        anim.play('frontAttack');
        console.log('front button clicked!');
        this.frontButton.runAction(onPress);
        this.monster.runAction(cc.blink(0.2,2));
        if(this.hpBar.getChildByName("left").scaleX > 0){
        this.hpBar.getChildByName("left").scaleX -= 0.1;
        }
        this.showDamage();
    },
    onMiddleButtonClicked: function() {
        var onPress = cc.sequence(cc.scaleBy(0.05, 0.98), cc.scaleBy(0.05, 1.02));
        console.log('middle button clicked!');
        this.middleButton.runAction(onPress);
        this.monster.runAction(cc.blink(0.2,2));
    },
    onBackButtonClicked: function() {
        var onPress = cc.sequence(cc.scaleBy(0.05, 0.98), cc.scaleBy(0.05, 1.02));
        console.log('back button clicked!');
        this.backButton.runAction(onPress);
        this.monster.runAction(cc.blink(0.2,2));
    },

    getRandomPosition: function() {
        return cc.v2((Math.random() - 0.5) * 2 * this.randomRange.x, (Math.random() - 0.5) * 2 * this.randomRange.y);
    },
    

});