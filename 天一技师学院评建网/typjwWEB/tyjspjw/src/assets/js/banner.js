function TowerBanner(getarr) {
    // 定义默认选项
    var arr = {
        hasIcon: true,
        hasBtn: true,
        autoPaly: true,
        palySpeed: 3000
    }
    // 获取用户指定选项
    $.extend(arr, getarr);
    
    var timer;
    var temp = 0;
    var lastNode = 0;
    var boxW = arr.boxW;
    // 初始化显示图片
    $(arr.moveBox).find("ul li").eq(0).css("left","0px");
    
    // 是否自动轮播
    if(arr.autoPaly) {
        if ($(arr.moveBox).find("ul li").length>1) {
            timer = setInterval(function() {
            temp++;
            fnmove("L");
        }, arr.palySpeed);
        // 移入停止自动轮播
        $(arr.moveBox).hover(function() {
            clearInterval(timer);
        }, function() {
            timer = setInterval(function() {
                temp++;
                fnmove("L")
            }, arr.palySpeed);
        })
        }
        
    }
    // 是否拥有小点
    if(arr.hasIcon) {
        for(var i = 0; i < $(arr.moveBox).find("ul li").length; i++) {
            $(arr.moveBox).find("dl").append("<dd></dd>");
        }
        $(arr.moveBox).on("click", "dl dd", function() {
            
            if (temp<$(this).index()) {
                temp = $(this).index();
                fnmove("L");
            }else if(temp>$(this).index()){
                temp = $(this).index();
                fnmove("R");
            }else{
                return false;
            }
            
        })
    }
    // 初始化显示小点
    $(arr.moveBox).find("dl dd").eq(0).addClass("on")
    // 是否拥有切换按钮
    if(arr.hasBtn) {
        $(arr.moveBox).find("p span").click(function() {
            if($(this).hasClass("fl")) {
                temp--;
                fnmove("R");
            } else {
                temp++;
                fnmove("L");
            }
            
        })
    } else {
        $(arr.moveBox).find("p").css("display", "none");
    }

    // banner主方法
    function fnmove(direction) {
        if(temp > $(arr.moveBox).find("ul li").length - 1) {
            temp = 0;
        } else if(temp < 0) {
            temp = $(arr.moveBox).find("ul li").length - 1
        }

        if (direction == "L") {
            $(arr.moveBox).find("ul li").eq(lastNode).stop().css({"left":"0px"}).animate({"left":"-"+boxW+"px"});
            $(arr.moveBox).find("ul li").eq(temp).stop().css({"left":boxW+"px"}).animate({"left":"0px"});				
        }else if(direction == "R"){		
            $(arr.moveBox).find("ul li").eq(lastNode).stop().css({"left":"0px"}).animate({"left":boxW+"px"});
            $(arr.moveBox).find("ul li").eq(temp).stop().css({"left":"-"+boxW+"px"}).animate({"left":"0px"});				
        }
        $(arr.moveBox).find("dl dd").eq(temp).addClass("on").siblings().removeClass("on");	
        lastNode = temp;
    }
}
export {
    TowerBanner
}