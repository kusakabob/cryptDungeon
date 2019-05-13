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
        frontHp: 0,
        frontPhy: 0,
        frontInt: 0,
        frontAgi: 0,
        middleHp: 0,
        middlePhy: 0,
        middleInt: 0,
        middleAgi: 0,
        backHp: 0,
        backPhy: 0,
        backInt: 0,
        backAgi: 0,
        sumPhy:0,
        sumInt:0,
        sumAgi:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sumPhy = this.frontPhy + this.middlePhy + this.backPhy;
    },

    start () {

    },

    // update (dt) {},
});
