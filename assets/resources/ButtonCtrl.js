	
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
            default:null,
            type: cc.Animation
        }
    },

    onLoad: function () {
        this.hpBarLeft = this.hpBar.getChildByName("left").scaleX;
    },
 
    onFrontButtonClicked: function() {
        var onPress = cc.blink(0.1, 1);
        var anim = this.frontAnim;
        anim.play('frontAttack');
        console.log('front button clicked!');
        this.frontButton.runAction(onPress);
        if(this.hpBar.getChildByName("left").scaleX > 0){
        this.hpBar.getChildByName("left").scaleX -= 0.1;
        }
    },
    onMiddleButtonClicked: function() {
        var onPress = cc.blink(0.1, 1);
        console.log('middle button clicked!');
        this.middleButton.runAction(onPress)
    },
    onBackButtonClicked: function() {
        var onPress = cc.blink(0.1, 1);
        console.log('back button clicked!');
        this.backButton.runAction(onPress)
    },

    

});