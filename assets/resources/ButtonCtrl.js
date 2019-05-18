	
cc.Class({
    extends: cc.Component,
 
    properties: {
        attackButton: cc.Node,
        buyButton: cc.Node,
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
        },
        shopCtrl: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        var self = this;
        self.hpBarLeft = self.hpBar.getChildByName("left").scaleX;
        self.randomRange = cc.v2(100, 100);
        self.variability = 30;
        self.madoshoActive = false;
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
        var blue = new cc.Color(0, 10, 255);
        if(this.madoshoActive){
            damageCount.num = this.statusCtrl.getComponent("StatusCtrl").sumInt * 10;
            damageCount.color = blue; 
        }else{
            damageCount.num = this.statusCtrl.getComponent("StatusCtrl").sumPhy;
        }
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
        
        if (this.attackButton.scaleX < 1.178){
            this.attackButton.scaleX = 1.178;
            this.attackButton.scaleY = 1.178;
        }

        if (this.buyButton.scaleX < 1.178){
            this.buyButton.scaleX = 1.178;
            this.buyButton.scaleY = 1.178;
        }
    },

    onAttackButtonClicked: function() {
        var onPress = cc.sequence(cc.scaleBy(0.05, 0.98), cc.scaleBy(0.05, 1.02), cc.callFunc(this.reset(),this));
        var anim = this.frontAnim;
        var statusCtrl = this.statusCtrl.getComponent("StatusCtrl");

        anim.play('frontAttack');
        this.attackButton.runAction(onPress);
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
        var text = "ヒーローの攻撃：" + damage + "ダメージ"

        this.dialogBox.getComponent("DialogBoxCtrl").showMessage(text);

        statusCtrl.addMoney(statusCtrl.moneyRate);
    },
    onBuyButtonClicked: function() {
        var onPress = cc.sequence(cc.scaleBy(0.05, 0.98), cc.scaleBy(0.05, 1.02), cc.callFunc(this.reset(),this));
        this.buyButton.runAction(onPress);
        var price = 0;
        var active = false;
        var selectedItem = this.shopCtrl.getComponent("ShopCtrl").selectedItem
        var text = [];
        var self = this;
        var status = this.statusCtrl.getComponent("StatusCtrl");

        switch(selectedItem){
            case "kyoka":
            price = this.shopCtrl.getComponent("ShopCtrl").kyokaPrice;
            if (price <= this.statusCtrl.getComponent("StatusCtrl").money){
                active = true;
                text.push("肉体強化薬を買った");
                text.push("HPが５UPした");
                text.push("HPが全回復した")
                text.push("PHYが５UPした");
                status.maxHp += 5;
                status.frontHp = status.maxHp;
                status.middleHp = status.maxHp;
                status.backHp = status.maxHp;
                status.frontPhy += 5;
                status.middlePhy += 5;
                status.backPhy += 5;
            }
            break;
            case "madosho":
            price = this.shopCtrl.getComponent("ShopCtrl").madoshoPrice;
            if (price <= this.statusCtrl.getComponent("StatusCtrl").money && !this.madoshoActive){
                active = true;
                this.madoshoActive = true;
                text.push("魔導書を買った");
                text.push("7秒だけ魔法が使えるようになった");
                text.push("INTが５UPした");
                status.frontInt += 5;
                status.middleInt += 5;
                status.backInt += 5;
                this.attackButton.getChildByName("label").getComponent(cc.Label).string = "マホウコウゲキ";
                this.schedule(function(){
                    this.attackButton.getChildByName("label").getComponent(cc.Label).string = "コウゲキ";
                    this.madoshoActive = false;
                }, 7, false)
            }
            break;
            case "hane":
            price = this.shopCtrl.getComponent("ShopCtrl").hanePrice;
            if (price <= this.statusCtrl.getComponent("StatusCtrl").money){
                active = true;
                text.push("魔法の羽根を買った");
                text.push("シエンキンの調達料が増えた");
                text.push("AGIが1UPした");
                status.frontAgi += 1;
                status.middleAgi += 1;
                status.backAgi += 1;
                status.sumAgi = status.frontAgi + status.middleAgi + status.backAgi;
                status.moneyRate += 1;
                this.monster.getComponent("MonsterScript").resetSchedule();
            }
            break;
            default:
            break;
        }
        
        if(active){
        this.statusCtrl.getComponent("StatusCtrl").addMoney(-price);
        }else{
            text.push("シエンキンが足りません！");
        }
        text.forEach(function(element) {
            self.dialogBox.getComponent("DialogBoxCtrl").showMessage(element);
        });
        
        
    },

    getRandomPosition: function() {
        return cc.v2((Math.random() - 0.5) * 2 * this.randomRange.x, (Math.random() - 0.5) * 2 * this.randomRange.y);
    },
    

});