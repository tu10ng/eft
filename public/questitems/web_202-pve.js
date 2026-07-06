// script.js
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.myButton');
    var buttonCountElement = document.getElementById('buttonCount');
    var completedCountElement = document.getElementById('completedCount');
    var specificButtonCompletedCountElement = document.getElementById('specificButtonCompletedCount');
    var specificButtonCompletedCount1Element = document.getElementById('specificButtonCompletedCount1');

     // 从localStorage中读取按钮状态
     function readLocalStorage(name) {
         return JSON.parse(localStorage.getItem(name));
     }

     // 保存按钮状态到localStorage
     function saveLocalStorage(name, id, value) {
         var storage = {};
         var existingData = readLocalStorage(name);
         if (existingData) {
             storage = existingData;
         }
         storage[id] = value;
         localStorage.setItem(name, JSON.stringify(storage));
     }

     // 更新按钮数量显示
     function updateButtonCount() {
         buttonCountElement.textContent = '所有任务数量: ' + buttons.length;
         var completedCount = document.querySelectorAll('.myButton[data-status="true"]').length;
         completedCountElement.textContent = '已完成任务数量: ' + completedCount;

         // 3x4
         var specificCompletedCount = 0;
         buttons.forEach(function(button) {
             if (button.id === '101' || button.id === '47' || button.id === '164' || button.id === '306' || button.id === '1' || button.id === '66' || button.id === '250' || button.id === '278' || button.id === '48' || button.id === '3' || button.id === '2' || button.id === '381' || button.id === '436' || button.id === '437' || button.id === '132' || button.id === '134' || button.id === '69' || button.id === '70' || button.id === '4' || button.id === '5' || button.id === '259' || button.id === '260' || button.id === '262' || button.id === '263' || button.id === '133' || button.id === '145' || button.id === '146' || button.id === '195' || button.id === '196' || button.id === '198' || button.id === '199' || button.id === '71' || button.id === '72' || button.id === '135' || button.id === '6' || button.id === '9' || button.id === '10' || button.id === '17' || button.id === '382' || button.id === '383' || button.id === '384' || button.id === '402' || button.id === '88' || button.id === '73' || button.id === '136' || button.id === '137' || button.id === '138' || button.id === '139' || button.id === '140' || button.id === '35' || button.id === '93' || button.id === '159' || button.id === '391' || button.id === '392' || button.id === '399' || button.id === '397' || button.id === '252' || button.id === '253' || button.id === '257' || button.id === '258' || button.id === '77' || button.id === '157' || button.id === '7' || button.id === '8' || button.id === '96' || button.id === '74' || button.id === '272' || button.id === '261' || button.id === '254' || button.id === '316' || button.id === '314' || button.id === '174' || button.id === '175' || button.id === '315' || button.id === '108' || button.id === '256' || button.id === '255' || button.id === '393' || button.id === '394' || button.id === '395' || button.id === '406' || button.id === '398' || button.id === '420' || button.id === '327' || button.id === '329' || button.id === '328' || button.id === '341' || button.id === '342' || button.id === '343' || button.id === '156' || button.id === '225' || button.id === '226' || button.id === '11' || button.id === '12' || button.id === '13' || button.id === '92' || button.id === '56' || button.id === '432' || button.id === '400' || button.id === '33' || button.id === '34' || button.id === '141' || button.id === '142' || button.id === '161' || button.id === '162' || button.id === '265' || button.id === '271' || button.id === '417' ||  button.id === '425' || button.id === '426' || button.id === '427' || button.id === '428' || button.id === '429' || button.id === '430' || button.id === '739' || button.id === '401' || button.id === '403' || button.id === '434' || button.id === '79' || button.id === '80' || button.id === '81' || button.id === '82' || button.id === '83' || button.id === '106' || button.id === '97' || button.id === '98' || button.id === '18' || button.id === '19' || button.id === '20' || button.id === '21' || button.id === '22' || button.id === '23' || button.id === '40' || button.id === '41' || button.id === '43' || button.id === '27' || button.id === '32' || button.id === '251' || button.id === '202' || button.id === '203' || button.id === '204' || button.id === '205' || button.id === '206' || button.id === '207' || button.id === '208' || button.id === '235' || button.id === '238' || button.id === '107' || button.id === '435' || button.id === '200' || button.id === '201' || button.id === '228' || button.id === '227' || button.id === '229' || button.id === '86' || button.id === '85' || button.id === '158' || button.id === '89' || button.id === '90' || button.id === '91' || button.id === '415' || button.id === '268' || button.id === '147' || button.id === '148' || button.id === '154' || button.id === '155' || button.id === '215' || button.id === '216' || button.id === '217' || button.id === '218' || button.id === '219' || button.id === '220' || button.id === '210' || button.id === '211' || button.id === '212' || button.id === '213' || button.id === '333' || button.id === '345' || button.id === '346' || button.id === '336' || button.id === '337' || button.id === '340' || button.id === '352' || button.id === '334' || button.id === '335' || button.id === '344' || button.id === '348' || button.id === '353' || button.id === '355' || button.id === '349' || button.id === '354' || button.id === '347' || button.id === '338' || button.id === '339' || button.id === '356' || button.id === '350' || button.id === '404' || button.id === '407' || button.id === '408' || button.id === '405' || button.id === '421' || button.id === '412' || button.id === '410' || button.id === '413' || button.id === '414' || button.id === '409' || button.id === '422' || button.id === '411' || button.id === '223' || button.id === '224' || button.id === '237' || button.id === '29' || button.id === '279' || button.id === '280' || button.id === '281' || button.id === '282' || button.id === '283' || button.id === '284' || button.id === '285' || button.id === '286' || button.id === '287' || button.id === '288' || button.id === '289' || button.id === '290' || button.id === '291' || button.id === '292' || button.id === '293' || button.id === '294' || button.id === '295' || button.id === '296' || button.id === '297' || button.id === '298' || button.id === '299' || button.id === '273' || button.id === '87' || button.id === '264' || button.id === '222' || button.id === '38' || button.id === '267' || button.id === '266' || button.id === '95' || button.id === '117' || button.id === '30' || button.id === '31' || button.id === '50' || button.id === '57' || button.id === '197' || button.id === '59' || button.id === '439' || button.id === '373' || button.id === '178' || button.id === '110' || button.id === '318' || button.id === '111' || button.id === '440' || button.id === '112' || button.id === '60') {
                 if (button.getAttribute('data-status') === 'true') {
                     specificCompletedCount++;
                 }
             }
         });
         specificButtonCompletedCountElement.textContent = '3X4任务 ' + specificCompletedCount + ' / 257';

         // 仙女棒
         var specificButtonCompletedCount1 = 0;
         buttons.forEach(function(button) {
             if (button.id === '101' || button.id === '47' || button.id === '164' || button.id === '306' || button.id === '1' || button.id === '66' || button.id === '250' || button.id === '278' || button.id === '48' || button.id === '3' || button.id === '381' || button.id === '132' || button.id === '69' || button.id === '70' || button.id === '5' || button.id === '259' || button.id === '260' || button.id === '133' || button.id === '145' || button.id === '146' || button.id === '195' || button.id === '196' || button.id === '198' || button.id === '199' || button.id === '71' || button.id === '72' || button.id === '135' || button.id === '6' || button.id === '9' || button.id === '10' || button.id === '17' || button.id === '382' || button.id === '383' || button.id === '136' || button.id === '137' || button.id === '138' || button.id === '139' || button.id === '140' || button.id === '35' || button.id === '93' || button.id === '391' || button.id === '392' || button.id === '96' || button.id === '393' || button.id === '394' || button.id === '327' || button.id === '329' || button.id === '328' || button.id === '341' || button.id === '342' ||  button.id === '425' || button.id === '426' || button.id === '401' || button.id === '403' || button.id === '79' || button.id === '80' || button.id === '97' || button.id === '18' || button.id === '19' || button.id === '20' || button.id === '21' || button.id === '202' || button.id === '203' || button.id === '204' || button.id === '205' || button.id === '206' || button.id === '207' || button.id === '208' || button.id === '200' || button.id === '201' || button.id === '147' || button.id === '148' || button.id === '154' || button.id === '210' || button.id === '211' || button.id === '212' || button.id === '213' || button.id === '333' || button.id === '334' || button.id === '279' || button.id === '280' || button.id === '281' || button.id === '282' || button.id === '283' || button.id === '284' || button.id === '285' || button.id === '286' || button.id === '287' || button.id === '273' || button.id === '274' || button.id === '149' || button.id === '150' || button.id === '242' || button.id === '243' || button.id === '244' || button.id === '245' || button.id === '246' || button.id === '247' || button.id === '248' || button.id === '249' || button.id === '197') {
                 if (button.getAttribute('data-status') === 'true') {
                     specificButtonCompletedCount1++;
                 }
             }
         });
         specificButtonCompletedCount1Element.textContent = '仙女棒任务 ' + specificButtonCompletedCount1 + ' / 101';
     }

     // 初始化按钮状态
     function initButtonStatus() {
         buttons.forEach(function(button) {
             var id = button.id;
             var status = readLocalStorage('buttonStatus')?.[id];
             if (status !== null) {
                 button.setAttribute('data-status', status);
                 button.textContent = status ? '已完成' : '未完成'; // 更新按钮标题
                 button.style.backgroundColor = status ? 'green' : 'red'; // 更新按钮背景颜色
             }
         });
     }

     // 更新按钮状态并保存到localStorage
     function toggleStatus(button) {
         var id = button.id;
         var isCompleted = button.getAttribute('data-status') === 'true';
         button.setAttribute('data-status', !isCompleted);
         button.textContent = isCompleted ? '未完成' : '已完成'; // 更新按钮标题
         button.style.backgroundColor = isCompleted ? 'red' : 'green'; // 更新按钮背景颜色
         updateButtonCount();
         saveLocalStorage('buttonStatus', id, !isCompleted);
     }

     // 为每个按钮添加点击事件监听器
     buttons.forEach(function(button) {
         button.addEventListener('click', function() {
             toggleStatus(button);
         });
     });

     // 页面加载时，初始化按钮状态
     initButtonStatus();
     updateButtonCount();
});


        // 获取按钮和所有 div 元素
        const showSpecific1Button = document.getElementById('showSpecific1');
        const showSpecific2Button = document.getElementById('showSpecific2');
        const showSpecific3Button = document.getElementById('showSpecific3');
        const showSpecific4Button = document.getElementById('showSpecific4');
        const showSpecific5Button = document.getElementById('showSpecific5');
        const showSpecific6Button = document.getElementById('showSpecific6');
        const showSpecific7Button = document.getElementById('showSpecific7');
        const showSpecific8Button = document.getElementById('showSpecific8');
        const showSpecific9Button = document.getElementById('showSpecific9');
        const showSpecific10Button = document.getElementById('showSpecific10');
        const showSpecific11Button = document.getElementById('showSpecific11');
        const showSpecific12Button = document.getElementById('showSpecific12');
        const showSpecific13Button = document.getElementById('showSpecific13');
        const showAllButton = document.getElementById('showAll');
        const divs = document.querySelectorAll('.quest-items__items-list__item');

        // 定义要显示的 data-name 属性值
        const namesToShow1 = ['新手上路', '打靶训练', '快车初体验', '救援行动', '首秀', '短缺', '介绍', '枪匠 - 1', '奢靡人生', '背景调查', '搜索任务', '熟人', '事倍功半', '试炼之路', '危机四伏塔科夫', '猎人必修课', '供应商', '风波', '卫生标准 - 1', '卫生标准 - 2', '硝烟野餐', '往事速递', '挖矿 - 1', '挖矿 - 2', '挖矿 - 3', '工欲善其事', '挖矿 - 4', '敲诈者', '西方来客 - 1', '西方来客 - 2', '渔具', '猎虎行动', '破铜烂铁', '鹰眼', '人道主义援助', '止痛药', '药剂师', 'U盘里有什么？', '石油存储', '引路先驱', '罪证', '蛋卷冰淇淋', '探囊取物', '生存者之路 - 危险零距离', '生存者之路 - 省吃俭用', '美味香肠', '储备', '一般储备', '汽车修理', '金色失物', '化学品 - 1', '化学品 - 2', '化学品 - 3', '化学品 - 4', '大客户', '出于好奇', '安全通道', '生存者之路 - Zhivchik', '生存者之路 - 受伤的野兽', '生存者之路 - 战地军医', '生存者之路 - 瘾君子', '信号 - 1', '信号 - 2', '信号 - 3', '信号 - 4', '供给计划', '暗中破坏', '地堡 - 1', '地堡 - 2', '海边假期', '无主货物', '货运追踪', '平易近人', '病历', '能源危机', '不良嗜好', '侦查', '黑天鹅计划', '叉车拼多多', '出口在此', '隔墙有眼', '设施维护', '刨根问底', '后门', '物尽其用', '生存者之路 - 硬汉', '礼节性拜访', '怀旧之情', '鱼塘', '生存者之路 - 雕鸮', '隐士', '黑幕交易', '大甩卖', 'Make ULTRA Great Again', '浑水摸鱼', '数据库 - 1', '数据库 - 2', '微型客车', '租借法案 - 1', '租借法案 - 2', '维和任务', '叛无所依', '多鱼之漏', '邮递员派特 - 1', '邮递员派特 - 2', '占有者', '生意至上', '急救措施', 'Polikhim流浪汉', '管制材料', '维他命 - 1', '维他命 - 2', '长路漫漫', '失踪货物', '天神射手', '商业机密', '害虫防治', '塔科夫神射手 - 2', '塔科夫神射手 - 3', '塔科夫神射手 - 4', '塔科夫神射手 - 5', '塔科夫神射手 - 6', '塔科夫神射手 - 7', '塔科夫神射手 - 8', '猎人之路 - 周边安全', '猎人之路 - 杀戮森林', '幽闭恐惧症', '医疗隐私 - 1', '医疗隐私 - 2', '医疗隐私 - 3', '医疗隐私 - 4', '医疗隐私 - 5', '医疗隐私 - 6', '消失的线人', '缉毒行动', '惩罚者 - 1', '惩罚者 - 2', '惩罚者 - 3', '惩罚者 - 4', '惩罚者 - 5', '惩罚者 - 6', '小菜一碟 - 1', '小菜一碟 - 2', '踩点行动', '麻醉', '左右逢源', '圈内人', '疗养之旅 - 1', '疗养之旅 - 2', '疗养之旅 - 3', '疗养之旅 - 4', '疗养之旅 - 5', '疗养之旅 - 6', '疗养之旅 - 7', '人口过剩', '悬结已解', '健全替代', '妥善保管', '邪教 - 1', '邪教 - 2', '无中生有 - 储备站', '绝密技术', '无中生有 - 灯塔', '私人诊所', '运动员', '肮脏游戏', '同事 - 1', '同事 - 2', '同事 - 3', '猎人之路 - 虐待狂', '化学橱柜', '情报就是力量', '愿者上钩', '私人俱乐部', '借刀杀人', '坚如燧石', '湿活 - 1', '湿活 - 2', '湿活 - 3', '湿活 - 4', '湿活 - 5', '湿活 - 6', '神秘货物 - 1', '神秘货物 - 2', '神秘货物 - 3', '神秘货物 - 4', '战争之血 - 1', '战争之血 - 2', '战争之血 - 3', '盛装杀戮', '感恩的心', '大放送之夜', '财务总监', '雪中送炭', '清点库存', '临行密密缝 - 1', '临行密密缝 - 2', '临行密密缝 - 3', '临行密密缝 - 4', '成功的关键', '奢侈无罪 - 1', '奢侈无罪 - 2', '火线速递', '垃圾佬', '风流倜傥', '暗度陈仓', '猎人之路 - 控制者', '猎人之路 - 战利品', '猎人之路 - 正义', '猎人之路 - 邪恶守望者', '猎人之路 - 流浪汉', '猎人之路 - 工厂头目', '猎人之路 - 森林管理员', '猎人之路 - 蒸发密令 - 1', '猎人之路 - 蒸发密令 - 2', '猎人之路 - 脱销', '流浪狗', '狩猎之旅', '样品', 'TerraGroup 雇员', '彻夜难眠', '试驾 - 1', '试驾 - 2', '试驾 - 3', '试驾 - 4', '试驾 - 5', '试驾 - 6', '枪匠 - 2', '枪匠 - 3', '枪匠 - 4', '枪匠 - 5', '枪匠 - 6', '枪匠 - 7', '枪匠 - 8', '枪匠 - 9', '枪匠 - 10', '枪匠 - 11', '枪匠 - 12', '枪匠 - 13', '枪匠 - 14', '枪匠 - 15', '枪匠 - 16', '枪匠 - 17', '枪匠 - 18', '枪匠 - 19', '枪匠 - 20', '枪匠 - 21', '枪匠 - 22', '直播 - 1', '灭虫服务', '狙击疯魔', '向导', '恐吓者', '进口', '肥料', '急单', '收藏家'];
        const namesToShow2 = ['新手上路', '打靶训练', '快车初体验', '救援行动', '首秀', '短缺', '介绍', '枪匠 - 1', '奢靡人生', '背景调查', '熟人', '供应商', '卫生标准 - 1', '卫生标准 - 2', '往事速递', '挖矿 - 1', '挖矿 - 2', '敲诈者', '西方来客 - 1', '西方来客 - 2', '渔具', '猎虎行动', '破铜烂铁', '鹰眼', '人道主义援助', '止痛药', '药剂师', 'U盘里有什么？', '石油存储', '罪证', '蛋卷冰淇淋', '探囊取物', '生存者之路 - 危险零距离', '生存者之路 - 省吃俭用', '金色失物', '化学品 - 1', '化学品 - 2', '化学品 - 3', '化学品 - 4', '大客户', '出于好奇', '生存者之路 - Zhivchik', '生存者之路 - 受伤的野兽', '海边假期', '生存者之路 - 硬汉', '礼节性拜访', '生意至上', '大甩卖', 'Make ULTRA Great Again', '数据库 - 1', '数据库 - 2', '塔科夫神射手 - 2', '塔科夫神射手 - 3', '猎人之路 - 周边安全', '猎人之路 - 杀戮森林', '医疗隐私 - 1', '医疗隐私 - 2', '消失的线人', '惩罚者 - 1', '惩罚者 - 2', '惩罚者 - 3', '惩罚者 - 4', '疗养之旅 - 1', '疗养之旅 - 2', '疗养之旅 - 3', '疗养之旅 - 4', '疗养之旅 - 5', '疗养之旅 - 6', '疗养之旅 - 7', '邪教 - 1', '邪教 - 2', '情报就是力量', '愿者上钩', '借刀杀人', '神秘货物 - 1', '神秘货物 - 2', '神秘货物 - 3', '神秘货物 - 4', '战争之血 - 1', '雪中送炭', '枪匠 - 2', '枪匠 - 3', '枪匠 - 4', '枪匠 - 5', '枪匠 - 6', '枪匠 - 7', '枪匠 - 8', '枪匠 - 9', '枪匠 - 10', '直播 - 1', '直播 - 2', '老赖', '软禁 - 1', '网络供应商 - 1', '网络供应商 - 2', '试探 - 1', '试探 - 2', '试探 - 3', '灯塔之匙', '咚咚咚', '邂逅'];
        const namesToShow3 = ['油料交换', '打靶训练', '首秀', '奢靡人生', '背景调查', '硝烟野餐', '搜索任务', '往事速递', '石油存储', '引路先驱', '罪证', '蛋卷冰淇淋', '地堡 - 1', '邮递员派特 - 1', '占有者', 'Polikhim流浪汉', '无意冒犯', '大客户', '探囊取物', '地堡 - 2', '一信之缘', '惩罚者 - 1', '叛无所依', '苏共之辉 - 1', '惩罚者 - 2', '踩点行动', '小菜一碟 - 1', '小菜一碟 - 2', '多鱼之漏', '特别联络', '惩罚者 - 3', '掷弹兵', '艺术就是爆炸', '绿色通道', '惩罚者 - 4', '惩罚者 - 5', '货运延误 - 1', '缔结友谊', '半满半空', '横插一杠', '麻醉', '惩罚者 - 6', '不容置问', '出警 - 商场', '出警 - 检票', '出警 - 巡逻', '苏共之辉 - 2', '屋顶战神', '财不外露', '管制材料', '最好的差事', '往昔时光 - 1', '往昔时光 - 2', '忠实观众', '人间地狱 - 1', '人间地狱 - 2', '占山为王', '试驾 - 1', '试驾 - 2', '试驾 - 3', '试驾 - 4', '试驾 - 5', '试驾 - 6', '左右逢源', '掠地攻城', '恐吓者', '护送'];
        const namesToShow4 = ['战争从未改变', '生化分析', '新手上路', '短缺', '卫生标准 - 1', '口干舌燥 - 往日回响', '口干舌燥 - 秘密配方', '水瓶座行动 - 1', '水瓶座行动 - 2', '卫生标准 - 2', '止痛药', '药剂师', '邮递员派特 - 2', '一般储备', '汽车修理', '出于好奇', '重获信任', '人口普查', '兽医也是医 - 1', '兽医也是医 - 2', '街区之下', '刨根问底', '供给计划', '健全替代', '病历', '危险之路', '城市的解药', '海边假期', '无主货物', '货运追踪', '平易近人', '再寻救护车', '医疗隐私 - 1', '医疗隐私 - 2', '医疗隐私 - 3', '医疗隐私 - 4', '医疗隐私 - 5', '医疗隐私 - 6', '一天一个苹果 - 医生远离我', '同事 - 1', '同事 - 2', '同事 - 3', '消失的线人', '缉毒行动', '质量标准', '运动员', '私人诊所', '灭虫服务', '急单', '这带子糟透了'];
        const namesToShow5 = ['良心作祟 - 1', '建立联系', '陌路相交', '免疫力', '小本生意 - 1', '小本生意 - 2', '小本生意 - 3', '两害相权', '这是什么梗?', '收藏家', '抉择', '亡羊补牢 - 信任', '亡羊补牢 - 赌注', '亡羊补牢 - 酒保', '亡羊补牢 - 收藏', '亡羊补牢 - Wergild'];
        const namesToShow6 = ['快车初体验', '赚点快钱 - 1', '供应商', '口干舌燥 - 养家糊口', '口干舌燥 - 送货服务', '敲诈者', '风波', 'U盘里有什么？', '金色失物', '西方来客 - 1', '西方来客 - 2', '化学品 - 1', '化学品 - 2', '化学品 - 3', '化学品 - 4', '收买人心', '出口在此', '隔墙有眼', '暗中破坏', '安全通道', '借刀杀人', '长路漫漫', '人往高处走', '偏离路线', '后知后觉', '关键伙伴', '致命论据', '识时务者为俊杰', '肮脏游戏', '维他命 - 1', '维他命 - 2', '好吃到上瘾 - 1', '好吃到上瘾 - 2', '情报就是力量', '愿者上钩', '私人俱乐部', '禁止打劫', '租借法案 - 1', '一派胡言', '高光时刻', '严词指控', '一报还一报', '发财计划', '失踪货物', '大音希声', '北国新秀', '老赖', '软禁 - 1', '软禁 - 2', '坚如燧石', '诱人新货', '致命道具', '头号机密', '夜间扫荡', '绝对威信', '有利可图的生意', '安全保障', '学无止境', '站稳脚跟', '利润保留', '人生之课', '安慰奖', '公道价 - 1', '公道价 - 2'];
        const namesToShow7 = ['和平原子', '窃听风暴', '渔具', '猎虎行动', '破铜烂铁', '鹰眼', '人道主义援助', '先声夺人', '邪教 - 1', '疗养之旅 - 1', '疗养之旅 - 2', '疗养之旅 - 3', '疗养之旅 - 4', '疗养之旅 - 5', '疗养之旅 - 6', '疗养之旅 - 7', '神秘货物 - 1', '神秘货物 - 2', '神秘货物 - 3', '神秘货物 - 4', '无中生有 - 储备站', '绝密技术', '无中生有 - 灯塔', '湿活 - 1', '湿活 - 2', '湿活 - 3', '湿活 - 4', '湿活 - 5', '湿活 - 6', '导师', '人口过剩', '悬结已解', '无中生有 - 塔科夫街区', '新路线，新机遇', '邪教 - 2', '此路不通', '样品', 'TerraGroup 雇员', '彻夜难眠', '最烂的差事', '反抗', '租借法案 - 2', '维和任务', '你的车该洗了', '向导', '清洁工', '战利品', '特殊装备', '机密情报'];
        const namesToShow8 = ['救援行动', '枪匠 - 1', '介绍', '枪匠 - 2', '枪匠 - 3', '枪匠 - 4', '枪匠 - 5', '挖矿 - 1', '信号 - 1', '挖矿 - 2', '工欲善其事', '侦查', '不良嗜好', '信号 - 2', '直播 - 1', '圈内人', '黑天鹅计划', '叉车拼多多', '设施维护', '化工厂的秘密', '枪匠 - 6', '挖矿 - 3', '后门', '挖矿 - 4', '物尽其用', '天神射手', '轻重缓急', '信号 - 3', '直播 - 2', '枪匠 - 7', '枪匠 - 旧友之约', '信号 - 4', '神秘的门', '稳定信号', '商业机密', '枪匠 - 8', '枪匠 - 9', '你被盯上了', '枪匠 - 10', '一臂之力', '枪匠 - 11', '化学橱柜', '枪匠 - 12', '能源危机', '枪匠 - 13', '开发者之谜 - 1', '开发者之谜 - 2', '探望', '航空包裹', '镜头就位,开拍!', '枪匠 - 14', '枪匠 - 15', '肥料', '枪匠 - 16', '枪匠 - 17', '枪匠 - 18', '进口', '狙击疯魔', '网络供应商 - 1', '网络供应商 - 2', '试探 - 1', '试探 - 2', '试探 - 3', '灯塔之匙', '咚咚咚', '邂逅', '目标与手段', '破镜重圆 - 收买人心', '破镜重圆 - 装备', '破镜重圆', '破镜重圆 - 安保', '破镜重圆 - 大扫除', '枪匠 - 19', '枪匠 - 20', '枪匠 - 21', '枪匠 - 22', '枪匠 - 23', '枪匠 - 24', '枪匠 - 25', '致命校准', '急先锋', '影子雇员', '大海捞针', '暗藏玄机', '武装侦察', '检验假说', '同好俱乐部'];
        const namesToShow9 = ['新鲜到货', '生意至上', 'Make ULTRA Great Again', '浑水摸鱼', '大甩卖', '绝不上当', '审计', '战争之血 - 1', '数据库 - 1', '数据库 - 2', '雪中送炭', '清点库存', '盛装杀戮', '感恩的心', '芭蕾舞者', '再次延误', '稳定业务', '微型客车', '临行密密缝 - 1', '临行密密缝 - 2', '临行密密缝 - 3', '临行密密缝 - 4', '战争之血 - 2', '风流倜傥', '高保真', '成功的关键', '暗度陈仓', '奢侈无罪 - 1', '城市之匙', '火线速递', '垃圾佬', '人靠衣装 - 1', '人靠衣装 - 2', '大放送之夜', '战争之血 - 3', '此路是我开！', '奢侈无罪 - 2', '花花公子', '看不见的大手', '经济流动', '特殊提议', '实战考验', '旧情难却', '财务总监', '纺织业 - 1', '纺织业 - 2', '长期合作', '酒瘾', '感官分析 - 1', '清空外围'];
        const namesToShow10 = ['如楔在侧', '熟人', '事倍功半', '试炼之路', '危机四伏塔科夫', '猎人必修课', '生存者之路 - 危险零距离', '生存者之路 - 省吃俭用', '生存者之路 - Zhivchik', '生存者之路 - 受伤的野兽', '生存者之路 - 硬汉', '生存者之路 - 雕鸮', '生存者之路 - 战地军医', '生存者之路 - 瘾君子', '生存者之路 - 冷血', '猎人之路 - 周边安全', '猎人之路 - 杀戮森林', '猎人之路 - 邪恶守望者', '猎人之路 - 控制者', '猎人之路 - 战利品', '猎人之路 - 正义', '幽闭恐惧症', '塔科夫神射手 - 1', '塔科夫神射手 - 2', '塔科夫神射手 - 3', '塔科夫神射手 - 4', '塔科夫神射手 - 5', '塔科夫神射手 - 6', '塔科夫神射手 - 7', '塔科夫神射手 - 8', '美味香肠', '口干舌燥 - 猎犬行动', '别开枪！', '猎人之路 - 工厂头目', '妥善保管', '猎人之路 - 森林管理员', '猎人之路 - 大动作', '黑幕交易', '礼节性拜访', '储备', '直播 - 3', '害虫防治', '隐士', '猎人之路 - 蒸发密令 - 1', '猎人之路 - 流浪汉', '猎人之路 - 虐待狂', '猎人之路 - 管理者', '猎人之路 - 坏警察', '急救措施', '直播 - 4', '直播 - 5', '怀旧之情', '卑鄙的外乡人', '鱼塘', '猎人之路 - 蒸发密令 - 2', '猎人之路 - 脱销', '猎人', '狩猎之旅', '流浪狗', '屠宰场', '快枪手', '猎人之路 - 无情杀手'];
        const namesToShow11 = ['守望者箴言', '外部订单', '简单副业', '情报之源', '失踪的线人', '抢夺先机', '归还人情', '以牙还牙', '挑衅', '按图索骥', '观察员', '大显身手', '大都会之谜', '天降大礼'];
        const namesToShow12 = ['收视灵药', '赚点快钱 - 2', '平衡之力 - 1', '平衡之力 - 2', '惊喜', '声东击西 - 1', '声东击西 - 2', '专业热身 - 1', '专业热身 - 2', '保持领先', '竞技场差事', '再创新高！- 1', '再创新高！- 2', '再创新高！- 3', '再创新高！- 4', '再创新高！- 5', '再创新高！- 6', '良心作祟 - 2', '两难抉择', '迟来的奖励'];
        const namesToShow13 = ['坚持到底', '拯救大兵罗曼', '苦涩的胜利', '宿醉', '货运延误 - 2', '风火轮', '风火轮 - 再次出发', '现世报', '必然回应', '奠定基石', '自然交换', '投石问路', '电池换新', '对空遮断', '反将一军', '独立的代价', '感官分析 - 2'];

        // 添加按钮点击事件监听器
        showSpecific1Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow1.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });

        showSpecific2Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow2.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });
		
        showSpecific3Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow3.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });
		
        showSpecific4Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow4.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });

        showSpecific5Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow5.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });
		
        showSpecific6Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow6.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });		

        showSpecific7Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow7.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });

        showSpecific8Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow8.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });

        showSpecific9Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow9.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });

        showSpecific10Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow10.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });

        showSpecific11Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow11.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });

        showSpecific12Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow12.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });

        showSpecific13Button.addEventListener('click', () => {
            divs.forEach(div => {
                if (namesToShow13.includes(div.getAttribute('data-name'))) {
                    div.style.display = 'block'; // 显示
                } else {
                    div.style.display = 'none'; // 隐藏
                }
            });
        });
	
        showAllButton.addEventListener('click', () => {
            divs.forEach(div => {
                div.style.display = 'block'; // 显示所有
            });
        });