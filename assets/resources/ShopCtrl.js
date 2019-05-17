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
        moneyLabel: {
            default: null,
            type: cc.Label
        },
        selectionLabel: {
            default: null,
            type: cc.Label
        },
        statusCtrl: {
            default: null,
            type: cc.Node
        },
        kyokaLabel: {
            default: null,
            type: cc.Node,
        },
        madoshoLabel: {
            default: null,
            type: cc.Node,
        },
        haneLabel: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onKyokaClicked (){
        this.selectionLabel.node.y = 29;
        this.selectedItem = "kyoka";
    },

    onMadoshoClicked (){
        this.selectionLabel.node.y = 0;
        this.selectedItem = "madosho";
    },

    onHaneClicked (){
        this.selectionLabel.node.y = -29;
        this.selectedItem = "hane";
    },

    reflectLabel() {
        this.kyokaLabel.getComponent(cc.Label).string = ("肉体強化薬："+ this.kyokaPrice +"エン").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.madoshoLabel.getComponent(cc.Label).string = ("魔導書："+ this.madoshoPrice +"エン").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        this.haneLabel.getComponent(cc.Label).string = ("黄金の羽："+ this.hanePrice +"エン").replace(/[A-Za-z0-9]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
    },

    changeLabelColor(money) {
        var gray = new cc.Color(124, 124, 124);
        var white = new cc.Color(255, 255, 255);

        if(money < this.kyokaPrice) {
            this.kyokaLabel.color = gray;
            
        }else{
            this.kyokaLabel.color = white;
            
        }
        if(money < this.madoshoPrice){
            this.madoshoLabel.color = gray;
            
        }else{
            this.madoshoLabel.color = white;
            
        }
        if(money < this.hanePrice){
            this.haneLabel.color = gray;
            
        }else{
            this.haneLabel.color = white;
            
        }
    },

    onLoad () {
        this.selectedItem = "kyoka";
        this.kyokaPrice = 100;
        this.madoshoPrice = 500;
        this.hanePrice = 1000;

        this.kyokaActive = false;
        this.madoshoActive = false;
        this.haneActive = false;

        this.money = this.statusCtrl.getComponent("StatusCtrl").money;
        this.changeLabelColor(this.money);
        this.reflectLabel();
    },

    start () {

    },

    // update (dt) {},
});
