//定时任务
var later = require('later');
    /**
     * 时间格式配置
     *  s: 秒, 取值范围:[0-59]
    m：分, 取值范围:[0-59]
    h: 时, 取值范围:[0-23]
    t: 秒每日, 取值范围:[0-86399]
    D: 日, 取值范围:[1-31]
    dw, d: 日每周, 取值范围:[1-7]
    dy: 日每年，取值范围:[1-365]
    wm: 周每月，取值范围:[1-5]
    wy: 周每年，取值范围:[1-52]
    M: 月，取值范围:[1-12]
    Y: 年，取值范围:[1970-2099] */
    var composite=[
        {t:[5]},  //设置每天的第5秒钟执行
        {h:[00],m:[00]},  //设置每天凌晨执行
        {s:[1]},//设置每一分钟的第一秒执行
    ];
    var sched={
        schedules:composite
    };
    later.date.localTime();  //设置本地时区
    /*var t= later.setInterval(function(){
        var d=new Date()
        console.log(d.toTimeString());
    },sched);*/
    /**
     * 

        时间定义API
        second();
        minute();
        hour();
        time();
        dayOfWeek();
        dayOfWeekCount();
        dayOfMonth();
        dayOfYear();
        weekOfMonth();
        weekOfYear();
        month();
        year(); 
        **************
  时间计算API
    on(vals): 设置时间值
    first(): 最小的时间值
    last(): 最大的时间值
    onWeekend(): 周末，等价于on(1,7).dayOfWeek()
    onWeekday(): 工作日，等价于on(2,3,4,5,6).dayOfWeek()
    every(val): 循环每个时间
    after(val): 在之后
    before(val): 在之前
    startingOn(val): 每个时间段开始的偏移量
    between(start, end): 在两个时间之间
    and():
    except():
    customPeriod(id):
    customModifier(id, vals):
  */    
    var sched = later.parse.recur().every(5).second();//每5秒执行一次
    var t= later.setInterval(function(){
        var d=new Date()
        console.log(d.toTimeString());
    },sched);
module.exports=t;
