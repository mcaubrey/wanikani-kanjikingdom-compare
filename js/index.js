var waniComp = [];

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
};

function makeWaniComp(limiter) {
    waniComp = [];
    for (m = 0; m <= waniData.length && m <= limiter; m++) {
        for (n = 0; n <= waniData[m].length; n++) {
            waniComp.push(waniData[m][n]);
        }
    }
}

$("document").ready(function() {
    $("#summon").click(summon);
    $("#rally").click(rally);
    $("#compareJalupWani").click(rally);
    $("#compareWaniJalup").click(summon);
    $("#jalupLevel").on("keyup", function(e) {
        if (e.keyCode == 13) {
            $("#compareWaniJalup").click();
        }
    });
    $("#waniLevel").on("keyup", function(e) {
        if (e.keyCode == 13) {
            $("#compareJalupWani").click();
        }
    });
});

function compareWaniJalup(item, jalupLevel) {

    for (k = 0; k < jalupData.length && k < jalupLevel; k++) {
        if (jalupData[k] == item) {
            return "matched";
        }
    }
    return "";
}

function compareJalupWani(item, waniLevel) {
    for (k = 0; k < waniComp.length; k++) {
        if (waniComp[k] == item) {
            return "matched";
        }
    }
    return "";
}

function rally() {
    $("main").text("");
    $("#jalup-controls").show();
    $("#wani-controls").hide();
    var waniLevel = parseInt($("#waniLevel").val());
    if (waniLevel > 60) {
        $("main").html("<p class='warning'>There are only 60 WaniKani levels.</p>");
        return false;
    }
    if (Number.isInteger(waniLevel) == false || waniLevel < 0) {
        $("main").html("<p class='warning'>Please enter a number between 0 and 60</p>");
        return false;
    }
    makeWaniComp(waniLevel);
    var levelString = '';
    for (i = 0; i < jalupData.length; i++) {
        if (i > 0) {
            if (i == 1 || i % 100 === 0) {
                if (levelString != "") {
                    if (i == 2300) {
                        levelString = levelString + '<div class="item ' + compareJalupWani(jalupData[i]) + '">' + jalupData[i] + '</div>';
                    }
                    $("main").append($(levelString + "</div>"));
                    levelString = "";
                    if (i == 2300) {
                        return false
                    };
                }
                $("main").append($("<h3>" + i + " - " + ((i == 1 ? 0 : i) + (i === 2200 ? 100 : 99)) + "</h3>"));
                levelString = '<div class="division"><div class="item ' + compareJalupWani(jalupData[i]) + '">' + jalupData[i] + '</div>';
            } else {
                levelString = levelString + '<div class="item ' + compareJalupWani(jalupData[i]) + '">' + jalupData[i] + '</div>';
            }

        }
    }
}

function summon() {
    $("main").text("");
    $("#wani-controls").show();
    $("#jalup-controls").hide();
    var jalupLevel = parseInt($("#jalupLevel").val());
    if (jalupLevel > 2300) {
        $("main").html("<p class='warning'>There are only 2300 JalupNEXT kanji.</p>");
        return false;
    }
    if (Number.isInteger(jalupLevel) == false || jalupLevel < 0) {
        $("main").html("<p class='warning'>Please enter a number between 0 and 2300</p>");
        return false;
    }
    for (i = 0; i < waniData.length; i++) {
        if (i > 0) {
            $("main").append($("<h3>Level " + i + "</h3>"));
            var levelString = '<div class="division">';

            for (j = 0; j < waniData[i].length; j++) {
                levelString = levelString + '<div class="item ' + compareWaniJalup(waniData[i][j], jalupLevel) + '">' + waniData[i][j] + '</div>';
            }
            levelString = levelString + "</div>";
            $("main").append($(levelString));
        }
    }
}

var waniData = [
    [],
    ["上", "下", "大", "八", "入", "工", "山", "口", "九", "一", "人", "力", "川", "七", "十", "三", "二", "女"],
    ["又", "玉", "本", "子", "丸", "正", "犬", "夕", "出", "目", "了", "火", "五", "四", "才", "手", "天", "刀", "王", "左", "中", "月", "々", "田", "右", "六", "小", "土", "立", "石", "丁", "日", "千", "木", "水", "白", "文", "円"],
    ["矢", "市", "牛", "切", "方", "戸", "太", "父", "少", "友", "毛", "半", "心", "内", "生", "久", "台", "母", "午", "北", "今", "古", "兄", "元", "外", "分", "公", "引", "止", "用", "万", "広", "冬"],
    ["竹", "車", "央", "写", "仕", "耳", "早", "気", "平", "花", "足", "世", "打", "百", "氷", "虫", "字", "男", "主", "名", "不", "号", "他", "去", "皿", "先", "赤", "休", "申", "見", "貝", "皮", "代", "礼", "糸", "町", "村", "年"],
    ["角", "青", "体", "色", "来", "社", "図", "毎", "羽", "林", "行", "金", "草", "里", "作", "多", "肉", "会", "交", "近", "池", "雨", "米", "当", "走", "同", "言", "自", "売", "形", "空", "音", "学", "光", "考", "回", "谷", "声", "西", "何", "麦", "弟"],
    ["全", "後", "血", "両", "明", "京", "化", "国", "死", "亡", "画", "地", "東", "食", "直", "前", "有", "知", "活", "長", "曲", "首", "次", "夜", "姉", "点", "安", "室", "科", "海", "羊", "店", "南", "星", "州", "茶", "思", "歩", "向", "妹"],
    ["辺", "付", "札", "鳥", "黒", "船", "以", "必", "末", "氏", "失", "魚", "組", "家", "欠", "未", "紙", "通", "民", "由", "理", "校", "雪", "強", "夏", "高", "教", "時", "弱", "週", "風", "記", "黄"],
    ["答", "反", "君", "局", "買", "雲", "楽", "数", "決", "絵", "住", "電", "森", "助", "馬", "間", "場", "医", "朝", "番", "所", "究", "道", "役", "研", "身", "者", "合", "支", "話", "投", "対"],
    ["受", "事", "美", "予", "始", "服", "度", "発", "定", "談", "表", "客", "重", "持", "負", "相", "要", "新", "部", "和", "県", "返", "乗", "屋", "送", "苦", "泳", "仮", "物", "具", "実", "使", "待", "勝", "界"],
    ["進", "酒", "業", "算", "運", "漢", "鳴", "集", "配", "飲", "終", "顔", "落", "農", "速", "頭", "聞", "院", "調", "鉄", "語", "葉", "習", "軽", "線", "最", "開", "親", "読", "転", "路", "病", "横", "歌", "起"],
    ["功", "成", "岸", "競", "争", "便", "老", "命", "指", "初", "味", "追", "神", "良", "意", "労", "好", "昔", "低", "育", "令", "拾", "注", "利", "位", "級", "仲", "放", "秒", "別", "特", "共", "努", "伝", "戦", "波", "洋", "働"],
    ["悪", "息", "章", "登", "寒", "深", "倍", "勉", "消", "祭", "野", "階", "庭", "港", "暑", "湯", "島", "童", "員", "商", "都", "動", "第", "期", "植", "根", "悲", "短", "球", "泉", "流", "陽", "歯", "族", "旅", "温", "着"],
    ["皆", "謝", "整", "橋", "選", "想", "器", "暗", "疑", "感", "情", "料", "様", "養", "緑", "熱", "億", "殺", "宿", "福", "鏡", "然", "詩", "練", "賞", "問", "館", "映", "願", "士", "課", "標", "銀", "駅", "像", "題", "輪"],
    ["能", "芸", "術", "雰", "骨", "束", "周", "協", "例", "折", "基", "性", "妥", "卒", "固", "望", "私", "材", "参", "完", "松", "約", "残", "求", "季", "技", "格", "頑", "囲", "的", "念", "希"],
    ["紀", "軍", "秋", "信", "岩", "仏", "建", "猫", "変", "晴", "築", "勇", "泣", "司", "区", "英", "丈", "夫", "飯", "計", "法", "晩", "昼", "毒", "昨", "帰", "式", "列", "浅", "単", "坂", "春", "寺"],
    ["浴", "箱", "係", "治", "危", "冒", "留", "弁", "証", "遠", "園", "門", "府", "幸", "阪", "急", "笑", "荷", "政", "保", "品", "守", "辞", "真", "喜", "関", "険", "典", "専", "冗", "存", "面", "取", "曜", "書"],
    ["是", "結", "底", "因", "識", "干", "敗", "渉", "果", "官", "署", "察", "堂", "幻", "非", "愛", "薬", "覚", "常", "鼻", "無", "原", "栄", "恋", "塩", "席", "側", "兵", "説", "細", "梅", "虚", "警"],
    ["告", "達", "焼", "借", "弓", "脳", "胸", "喫", "等", "枚", "忘", "訓", "種", "報", "句", "許", "可", "祈", "僧", "禁", "静", "座", "煙", "汽", "験", "試", "類", "洗", "禅"],
    ["得", "加", "冊", "履", "忙", "閥", "布", "比", "歴", "続", "減", "昆", "困", "易", "絡", "笛", "容", "団", "史", "徒", "宙", "混", "善", "順", "宇", "詞", "改", "乱", "節", "連", "舌", "暴", "財", "若"],
    ["裕", "尻", "確", "械", "犯", "害", "議", "難", "災", "嫌", "夢", "震", "在", "飛", "産", "罪", "穴", "被", "個", "機", "妨", "倒", "経", "率", "圧", "防", "臭", "余", "尾", "論", "厚", "妻"],
    ["責", "条", "済", "委", "省", "制", "批", "断", "任", "素", "敵", "設", "評", "検", "岡", "増", "査", "判", "審", "件", "際", "企", "挙", "認", "資", "義", "権", "派", "務", "税", "解", "総"],
    ["援", "態", "誕", "状", "賀", "各", "費", "姿", "勢", "示", "寝", "営", "坊", "罰", "策", "案", "提", "置", "域", "応", "宮", "吸", "過", "領", "脱", "統", "値", "価", "副", "観", "藤"],
    ["呼", "崎", "施", "城", "護", "鬼", "割", "職", "秀", "俳", "停", "宅", "裁", "律", "導", "革", "贅", "乳", "収", "演", "現", "備", "則", "規", "準", "張", "優", "沢", "師", "幹", "看"],
    ["庁", "額", "腕", "境", "燃", "担", "祝", "届", "違", "差", "象", "展", "層", "視", "環", "製", "述", "武", "型", "狭", "管", "載", "質", "量", "販", "供", "肩", "株", "触", "輸", "腰"],
    ["慣", "居", "逮", "票", "属", "捕", "候", "輩", "況", "響", "効", "抜", "鮮", "満", "与", "掛", "隠", "模", "含", "訟", "限", "肥", "豊", "替", "景", "巻", "捜", "構", "影", "絞", "訴", "補", "渡"],
    ["接", "再", "独", "獣", "菓", "討", "故", "較", "造", "創", "往", "励", "激", "占", "障", "我", "徴", "授", "鉛", "郵", "針", "従", "豚", "復", "河", "貯", "印", "振", "刺", "突", "怪", "汗", "筆"],
    ["怒", "昇", "迷", "招", "腹", "睡", "端", "極", "郎", "康", "健", "誘", "貸", "惑", "痛", "退", "途", "給", "就", "靴", "眠", "暇", "段", "胃", "症", "濃", "締", "迫", "訪", "織", "悩", "屈"],
    ["攻", "撃", "浜", "綺", "益", "児", "憲", "冷", "処", "微", "修", "博", "程", "絶", "凍", "巨", "稚", "幼", "並", "麗", "奇", "衆", "潔", "清", "録", "逆", "移", "精", "隊", "庫", "妙", "券", "傘", "婦"],
    ["略", "積", "添", "寄", "宴", "板", "壊", "督", "僚", "杯", "娘", "診", "乾", "欧", "恐", "猛", "江", "韓", "雄", "航", "監", "宗", "請", "怖", "索", "臣", "催", "街", "詰", "緊", "閣", "促", "烈"],
    ["更", "魅", "背", "騒", "飾", "預", "詳", "版", "旗", "浮", "越", "照", "漏", "系", "覧", "婚", "懐", "撮", "枕", "遊", "快", "貧", "延", "押", "乏", "盗", "購", "適", "翌", "渇", "符"],
    ["帯", "廊", "離", "径", "融", "均", "除", "貨", "孫", "墓", "幾", "尋", "編", "陸", "探", "豪", "鑑", "泥", "巣", "普", "棒", "粉", "既", "救", "似", "富", "散", "華", "嘆", "偵", "驚", "掃", "菜", "脈", "徳", "倉"],
    ["酸", "賛", "祖", "銭", "込", "衛", "机", "汚", "飼", "複", "染", "卵", "永", "績", "眼", "液", "採", "党", "志", "興", "恩", "序", "雑", "桜", "密", "秘", "厳", "捨", "訳", "欲", "暖", "迎", "傷"],
    ["灰", "装", "著", "裏", "閉", "垂", "漠", "異", "皇", "拡", "暮", "忠", "肺", "誌", "操", "筋", "否", "盛", "宣", "賃", "敬", "尊", "熟", "砂", "簡", "蒸", "蔵", "糖", "納", "宝", "諸", "窓"],
    ["豆", "枝", "揮", "刻", "爪", "承", "幕", "紅", "歓", "降", "劇", "奴", "聖", "推", "臓", "損", "磁", "誤", "源", "芋", "純", "薦", "丼", "腐", "沿", "射", "縮", "隷", "粋", "吐", "貴", "縦", "勤", "拝"],
    ["熊", "噌", "彫", "杉", "銅", "舎", "酔", "炎", "彼", "紹", "介", "湖", "講", "寿", "測", "互", "油", "己", "払", "鍋", "獄", "為", "恥", "遅", "汁", "醤", "滞", "剣", "破", "亀", "厄", "酢"],
    ["諾", "盟", "将", "舞", "債", "伎", "鹿", "換", "牙", "旧", "般", "津", "療", "継", "遺", "維", "奈", "核", "廃", "献", "沖", "摘", "及", "依", "縄", "踏", "伸", "姓", "甘", "貿", "頼", "超", "幅"],
    ["患", "狙", "陣", "塁", "弾", "葬", "抗", "崩", "遣", "掲", "爆", "恵", "漁", "香", "湾", "跳", "抱", "旬", "聴", "臨", "兆", "契", "刑", "募", "償", "抵", "戻", "昭", "闘", "執", "跡", "削"],
    ["伴", "齢", "宜", "賂", "賄", "房", "慮", "託", "却", "需", "致", "避", "描", "刊", "逃", "扱", "奥", "併", "傾", "緩", "奏", "娠", "妊", "贈", "択", "還", "繰", "抑", "懸", "称", "緒", "盤"],
    ["控", "充", "渋", "岐", "埋", "鈴", "埼", "棋", "譲", "雇", "免", "群", "枠", "銃", "仙", "邦", "御", "慎", "躍", "謙", "阜", "片", "項", "斐", "隆", "圏", "勧", "拒", "稲", "奪", "鋼", "甲", "壁", "祉"],
    ["敏", "吹", "唱", "衝", "戒", "兼", "薄", "堀", "剤", "雅", "孝", "頻", "駆", "俊", "誉", "茂", "殿", "殖", "隣", "繁", "巡", "柱", "携", "褒", "排", "駐", "顧", "犠", "獲", "鋭", "敷", "透"],
    ["棄", "至", "拠", "蜂", "儀", "炭", "衣", "潜", "偽", "畑", "蛍", "拳", "郷", "蜜", "仁", "遜", "侵", "鉱", "伺", "徹", "瀬", "墟", "酎", "措", "誠", "虎", "艦", "撤", "樹", "包"],
    ["析", "弧", "到", "軸", "綱", "挑", "焦", "掘", "紛", "範", "括", "床", "握", "枢", "揚", "潟", "芝", "肝", "喪", "網", "克", "泊", "双", "柄", "哲", "斎", "袋", "揺", "滑", "堅", "暫", "糾", "荒"],
    ["襲", "沼", "朗", "摩", "懲", "慰", "懇", "筒", "滅", "距", "籍", "露", "炉", "柔", "趣", "擦", "琴", "垣", "即", "威", "滋", "牧", "泰", "岳", "旨", "刷", "珍", "封", "斉", "沈", "撲", "裂", "潮", "貢", "誰"],
    ["刃", "砲", "笠", "竜", "縁", "忍", "釣", "吉", "粒", "髪", "丘", "俺", "僕", "斗", "寸", "桃", "梨", "姫", "娯", "謎", "侍", "叱", "棚", "叫", "匹", "辛", "芽", "嵐", "涙", "雷", "缶", "塔", "朱", "翼"],
    ["頃", "菌", "鐘", "舟", "嫁", "暦", "曇", "也", "塾", "呪", "湿", "稼", "疲", "翔", "賭", "霊", "溝", "矛", "狩", "脚", "澄", "塊", "狂", "嬢", "裸", "磨", "陰", "肌", "魂", "眺", "硬", "卓", "凶", "滝", "井"],
    ["墨", "瞬", "泡", "穏", "孔", "椅", "菊", "涼", "綿", "魔", "寮", "鳩", "鈍", "鍛", "碁", "癖", "穂", "吾", "鍵", "盆", "庄", "猿", "棟", "誇", "瞳", "寧", "俵", "幽", "架", "黙", "斬", "帝", "租", "錬", "阻", "歳", "零"],
    ["幣", "箸", "瞭", "崖", "炊", "粧", "墜", "欺", "滴", "塀", "霧", "扇", "扉", "恨", "帽", "憎", "佐", "挿", "伊", "詐", "如", "唇", "掌", "婆", "哀", "虹", "爽", "憩", "尺", "砕", "粘", "畳", "胴", "巾", "芯", "柳"],
    ["遂", "蓄", "脇", "殴", "咲", "鉢", "賢", "彩", "隙", "培", "踊", "闇", "斜", "尽", "霜", "穫", "麻", "騎", "辱", "灯", "畜", "溶", "蚊", "帳", "塗", "貼", "輝", "憶", "悔", "耐", "盾", "蛇", "班", "餓", "飢", "迅", "脅"],
    ["概", "拘", "煮", "覆", "駒", "悟", "謀", "鶴", "拓", "衰", "奨", "淡", "礎", "陛", "浸", "劣", "勘", "隔", "桑", "尼", "珠", "抽", "壇", "陶", "妃", "刈", "紫", "唯", "剛", "征", "誓", "俗", "潤"],
    ["偶", "巧", "鰐", "把", "駄", "洞", "伯", "唐", "諮", "廷", "蟹", "晶", "堰", "漂", "淀", "堤", "后", "疫", "翻", "鬱", "涯", "銘", "仰", "漫", "彰", "簿", "亭", "訂", "壮", "軌", "奮", "峰", "墳", "搬", "邪"],
    ["肯", "浦", "挟", "沸", "瓶", "召", "貞", "亮", "襟", "隅", "郡", "燥", "釈", "脂", "偉", "軒", "蓮", "慈", "塚", "玄", "肪", "耕", "媛", "邸", "喚", "苗", "隻", "膚", "軟", "郊", "頂", "濯", "渦", "聡", "枯"],
    ["祥", "呂", "偏", "茨", "陥", "鎖", "賠", "恒", "綾", "没", "擁", "遭", "噴", "殊", "倫", "陳", "隼", "乃", "輔", "猟", "唆", "惰", "怠", "覇", "須", "牲", "秩", "孤", "芳", "貫", "糧", "颯", "慢", "膨", "遇"],
    ["諭", "随", "胡", "搭", "錦", "鯉", "胞", "浄", "帥", "諒", "蒙", "曙", "惨", "稿", "啓", "披", "繊", "徐", "葵", "騰", "据", "莉", "緯", "瓜", "虐", "戴", "艇", "丹", "緋", "准", "舗", "壌", "駿", "剰", "寛"],
    ["庶", "且", "顕", "杏", "栞", "欄", "冠", "酷", "叙", "逸", "紋", "阿", "愚", "尚", "拐", "悠", "勲", "疎", "謡", "哺", "栽", "践", "呈", "傲", "疾", "茜", "酬", "呆", "鎌", "粛", "茎", "痴", "荘", "鯨", "卸"],
    ["累", "伏", "虜", "循", "粗", "凝", "栓", "瑛", "旦", "奉", "遼", "郭", "抹", "佳", "惜", "憂", "悼", "癒", "栃", "龍", "弥", "髄", "傍", "愉", "赴", "昌", "憾", "朴", "脊", "該", "之", "鎮", "尿", "賓", "那"],
    ["匠", "拍", "縛", "飽", "柴", "蝶", "弦", "凛", "庸", "錯", "轄", "悦", "窮", "嘉", "弊", "遥", "洪", "紳", "呉", "穀", "摂", "寂", "宰", "陵", "凡", "尉", "靖", "恭", "縫", "舶", "搾", "猶", "窒", "碑", "智"],
    ["款", "鼓", "盲", "醸", "凹", "弔", "凸", "烏", "敢", "堕", "衡", "伐", "酵", "閲", "遮", "腸", "瑠", "乙", "楓", "膜", "紺", "蒼", "漬", "哉", "峡", "賊", "旋", "俸", "喝", "羅", "萌", "槽", "坪", "遍", "胎"],
    ["陪", "扶", "迭", "鶏", "瑞", "暁", "剖", "凌", "藩", "譜", "璃", "淑", "傑", "殻", "錠", "媒", "忌", "濁", "椎", "赦", "戯", "享", "嘱", "肖", "憤", "漣", "朽", "奔", "帆", "菅", "酌", "慨", "絹", "窃", "硫"],
    ["亜", "屯", "岬", "鋳", "拙", "詠", "慶", "酪", "篤", "侮", "堪", "禍", "雌", "睦", "胆", "擬", "漆", "閑", "憧", "卑", "姻", "曹", "吟", "礁", "峠", "沙", "蔑", "汰", "紡", "遷", "叔", "甚", "浪", "梓", "崇"],
    ["煩", "蛮", "廉", "劾", "某", "矯", "囚", "痢", "逝", "狐", "漸", "升", "婿", "匿", "謹", "藍", "桟", "殉", "坑", "罷", "妄", "藻", "泌", "唄", "畔", "倹", "拷", "醜", "渓", "湧", "寡", "慕"]
];

var jalupData = ["", "乙", "一", "人", "入", "八", "七", "十", "丁", "力", "九", "刀", "了", "二", "又", "亡", "士", "工", "土", "子", "才", "寸", "女", "乞", "凡", "上", "下", "山", "口", "小", "川", "干", "千", "巾", "夕", "及", "己", "久", "与", "弓", "丈", "大", "三", "万", "丸", "刃", "午", "牛", "王", "区", "凶", "匹", "太", "夫", "犬", "天", "日", "月", "円", "比", "匂", "仇", "化", "水", "木", "不", "尺", "中", "戸", "方", "切", "分", "幻", "仏", "公", "支", "反", "友", "文", "父", "厄", "収", "五", "井", "互", "内", "欠", "火", "心", "今", "乏", "双", "牙", "介", "片", "元", "六", "氏", "冗", "止", "予", "弔", "刈", "毛", "手", "引", "少", "爪", "叩", "右", "古", "石", "兄", "召", "叶", "占", "叱", "加", "台", "申", "由", "甲", "田", "払", "広", "弁", "用", "皿", "冊", "旦", "旧", "白", "目", "主", "生", "玉", "未", "末", "半", "失", "矢", "本", "犯", "代", "汁", "刊", "庁", "令", "巨", "央", "史", "礼", "付", "札", "丼", "他", "世", "瓦", "丘", "北", "巧", "写", "号", "必", "氷", "永", "四", "母", "囚", "立", "平", "正", "幼", "功", "玄", "市", "左", "布", "司", "可", "句", "民", "尻", "込", "辺", "仙", "打", "矛", "圧", "仕", "去", "処", "奴", "皮", "以", "穴", "出", "外", "示", "冬", "汚", "汗", "江", "年", "羊", "寺", "多", "各", "名", "光", "米", "先", "全", "企", "合", "会", "百", "早", "自", "耳", "再", "両", "西", "毎", "血", "曲", "因", "団", "回", "叫", "扱", "吸", "吐", "忙", "竹", "州", "任", "伝", "件", "争", "危", "色", "好", "安", "妄", "次", "巡", "迅", "糸", "灯", "兆", "弛", "地", "池", "列", "刑", "死", "守", "宇", "宅", "字", "肉", "舟", "向", "同", "尖", "行", "劣", "考", "旨", "老", "伐", "休", "壮", "旬", "充", "芝", "伏", "仰", "仮", "匠", "舌", "吉", "如", "仲", "虫", "存", "有", "在", "朴", "肌", "朽", "机", "当", "印", "羽", "至", "式", "衣", "共", "缶", "交", "尽", "気", "成", "灰", "妨", "励", "助", "村", "対", "肘", "近", "返", "迎", "走", "廷", "足", "良", "卵", "即", "却", "見", "児", "貝", "身", "困", "囲", "図", "医", "更", "伸", "車", "戻", "尾", "尿", "何", "局", "伺", "材", "杖", "杉", "庇", "批", "屁", "序", "応", "床", "町", "里", "男", "含", "余", "冷", "呑", "豆", "呂", "臣", "来", "串", "弟", "妥", "災", "芯", "芳", "花", "芸", "完", "究", "売", "赤", "利", "別", "私", "判", "坂", "均", "坊", "妙", "妖", "妊", "呆", "克", "束", "技", "抜", "岐", "忘", "志", "忍", "忌", "決", "択", "沢", "吠", "吹", "状", "汲", "汽", "沈", "似", "伴", "低", "佐", "役", "投", "没", "呈", "狂", "弄", "改", "攻", "快", "努", "労", "秀", "否", "告", "谷", "声", "君", "把", "求", "条", "寿", "麦", "初", "乱", "社", "言", "角", "肖", "抗", "折", "抑", "位", "住", "体", "作", "戒", "形", "我", "希", "系", "辛", "兵", "邦", "防", "肝", "押", "呻", "果", "尚", "画", "雨", "周", "妬", "拓", "岩", "協", "拗", "効", "抽", "油", "宙", "届", "炊", "炎", "炉", "昔", "昏", "者", "的", "泊", "拍", "迫", "肯", "育", "肩", "青", "枢", "殴", "欧", "拒", "肪", "肢", "肥", "股", "明", "服", "突", "定", "空", "宝", "房", "居", "刷", "泥", "姉", "妹", "始", "事", "妻", "垂", "知", "委", "和", "呼", "呟", "呪", "味", "拡", "拝", "抹", "招", "沼", "拐", "到", "制", "刻", "刺", "毒", "取", "侮", "邪", "阻", "邸", "況", "治", "泳", "沸", "併", "供", "価", "受", "学", "乳", "宜", "狙", "直", "具", "祈", "析", "所", "彼", "披", "版", "波", "枕", "枠", "板", "岸", "拙", "屈", "若", "苦", "店", "英", "東", "典", "苗", "松", "林", "杯", "法", "沿", "泡", "金", "命", "舎", "念", "武", "延", "些", "依", "使", "例", "夜", "卒", "京", "怯", "怖", "怪", "径", "性", "姓", "往", "注", "枚", "枝", "放", "府", "抵", "底", "物", "忽", "忠", "易", "承", "参", "季", "実", "宗", "官", "宛", "祉", "歩", "征", "奇", "河", "斉", "苛", "茂", "芽", "茎", "盲", "昆", "昇", "卓", "担", "抱", "拘", "拠", "券", "奔", "虎", "並", "述", "泣", "免", "弦", "侍", "玩", "非", "固", "門", "国", "表", "奉", "長", "幸", "訂", "訃", "計", "郎", "恨", "限", "郊", "型", "剃", "則", "削", "変", "哀", "亭", "貞", "頁", "負", "赴", "施", "甚", "政", "卸", "歪", "是", "送", "迷", "逃", "前", "面", "首", "皇", "星", "牲", "奏", "巻", "美", "為", "県", "点", "珍", "叙", "食", "炭", "幽", "峠", "品", "飛", "盆", "垢", "垣", "城", "拭", "拷", "挑", "疫", "段", "度", "咲", "咽", "咳", "革", "帝", "南", "風", "殆", "故", "軌", "俗", "促", "俄", "侵", "契", "臭", "泉", "専", "封", "耐", "厚", "威", "虐", "盾", "査", "看", "恰", "悔", "恒", "某", "架", "柔", "染", "信", "便", "係", "保", "退", "逆", "追", "砕", "砂", "研", "窃", "宥", "宣", "畑", "背", "胃", "怒", "怨", "怠", "急", "括", "指", "拾", "浄", "洞", "海", "虹", "狩", "紅", "独", "活", "派", "洗", "浅", "洪", "洋", "昧", "昨", "昭", "映", "約", "級", "紀", "律", "建", "津", "皆", "音", "香", "春", "軍", "栄", "冠", "後", "待", "持", "穿", "客", "室", "屋", "屍", "昼", "卑", "単", "勇", "祖", "祝", "神", "冒", "省", "眉", "畏", "界", "思", "発", "重", "乗", "秋", "科", "秒", "狭", "峡", "挟", "孤", "狐", "弧", "茨", "茸", "荘", "要", "姦", "姻", "姿", "荒", "茶", "草", "胞", "肺", "胎", "胆", "柄", "柱", "枯", "相", "閃", "座", "挫", "差", "砲", "祥", "師", "紋", "蚊", "眩", "罠", "眠", "挙", "拳", "益", "般", "航", "殺", "匿", "馬", "島", "疲", "被", "破", "竜", "祟", "峰", "討", "射", "将", "笑", "弱", "帯", "恥", "時", "耽", "特", "逝", "唆", "哲", "倉", "剣", "飢", "恭", "党", "俸", "旅", "孫", "索", "素", "班", "帰", "浸", "兼", "書", "冥", "辱", "娠", "振", "唇", "扇", "屑", "展", "徐", "除", "途", "捜", "捕", "捉", "挿", "称", "秩", "秘", "租", "剥", "剛", "剤", "高", "華", "荷", "衰", "朗", "狼", "既", "根", "悩", "悟", "悦", "症", "病", "疾", "耕", "栽", "耗", "珠", "殊", "株", "娘", "姫", "娯", "捗", "挽", "捌", "通", "速", "透", "造", "陥", "降", "院", "納", "純", "紐", "紛", "舐", "紙", "配", "酒", "酌", "勉", "従", "起", "徒", "挨", "捩", "涙", "埃", "凄", "凌", "凍", "員", "財", "針", "釘", "恐", "恵", "恋", "恩", "核", "栓", "桁", "脅", "骨", "宵", "留", "袖", "畜", "息", "鬼", "埋", "残", "能", "烈", "真", "夏", "貢", "家", "容", "宴", "案", "宮", "害", "連", "軒", "庫", "陣", "原", "席", "庭", "料", "粉", "粋", "胸", "脈", "脂", "脇", "胴", "脆", "敏", "致", "倒", "梅", "格", "校", "桃", "桜", "浪", "浜", "浮", "浴", "流", "消", "俳", "修", "候", "俺", "倫", "個", "値", "借", "倍", "記", "訓", "託", "進", "週", "逸", "副", "側", "酔", "執", "務", "殻", "袋", "移", "瓶", "釈", "寄", "宿", "密", "欲", "盗", "盛", "唱", "望", "崩", "庶", "鳥", "魚", "菓", "巣", "異", "偵", "偶", "偏", "偽", "祭", "票", "崇", "描", "菌", "黄", "猫", "率", "章", "商", "虚", "産", "鹿", "麻", "累", "略", "亀", "術", "得", "痒", "痕", "彫", "彩", "惨", "済", "淡", "添", "停", "涼", "液", "械", "桶", "梯", "眼", "眺", "郷", "符", "第", "笛", "舵", "舶", "船", "脳", "脱", "豚", "脚", "掃", "授", "捲", "掴", "捧", "排", "控", "掛", "接", "採", "捨", "据", "患", "悠", "悪", "窓", "惚", "偲", "著", "猪", "都", "探", "梨", "深", "唸", "捻", "斜", "釣", "渉", "寂", "戚", "渋", "婦", "婆", "婚", "萎", "剰", "唾", "郵", "猟", "猛", "動", "勘", "雪", "常", "堂", "強", "張", "帳", "掻", "蛍", "蛇", "推", "唯", "雀", "部", "陪", "培", "販", "旋", "敗", "族", "域", "掘", "堀", "理", "野", "黒", "康", "健", "逮", "粛", "規", "現", "視", "習", "混", "翌", "基", "涯", "崖", "惜", "措", "悼", "掲", "喝", "渇", "断", "粗", "粘", "粒", "情", "責", "清", "貧", "貨", "貫", "斬", "乾", "転", "軟", "頃", "貪", "頂", "菜", "渓", "淫", "閉", "爽", "問", "険", "陶", "陰", "陸", "隆", "陳", "絆", "経", "紹", "紺", "赦", "教", "球", "救", "終", "細", "紳", "組", "許", "設", "訳", "訪", "訟", "這", "弾", "圏", "湾", "補", "傍", "偉", "備", "揺", "遥", "援", "猥", "湧", "隈", "閑", "焚", "森", "普", "道", "着", "湿", "鈍", "飯", "飲", "悲", "扉", "斐", "喜", "善", "量", "童", "達", "就", "報", "晴", "惰", "博", "葬", "募", "落", "棺", "椅", "棒", "塀", "堰", "堪", "幾", "紫", "傘", "滋", "番", "歯", "奥", "尊", "猶", "酢", "富", "帽", "幅", "粧", "距", "堅", "覚", "営", "覗", "象", "隊", "遂", "創", "割", "慌", "街", "御", "復", "循", "棟", "疎", "棘", "塁", "畳", "喧", "握", "硬", "属", "裁", "装", "喪", "裂", "搭", "塔", "裕", "答", "集", "葉", "喋", "絞", "給", "結", "敢", "敬", "散", "寒", "衆", "掌", "換", "喚", "喫", "喉", "測", "貯", "貼", "雇", "雄", "焦", "喘", "嵐", "嵌", "隅", "過", "渦", "遇", "場", "湯", "陽", "揚", "稀", "税", "程", "絶", "絵", "統", "絡", "媒", "欺", "揉", "智", "替", "晶", "揃", "愉", "喩", "満", "減", "渡", "湖", "港", "温", "暑", "最", "景", "煮", "然", "無", "随", "殖", "階", "痢", "痛", "痩", "尋", "惑", "廊", "廃", "遍", "遅", "遊", "開", "悶", "間", "検", "植", "極", "等", "策", "筋", "筆", "筒", "詞", "腕", "腔", "勝", "越", "提", "堤", "超", "揮", "運", "軽", "軸", "暁", "晩", "焼", "期", "朝", "棚", "厨", "登", "短", "買", "貰", "貿", "雰", "勤", "雲", "順", "項", "須", "賀", "貸", "貴", "費", "評", "証", "詐", "訴", "詠", "診", "裏", "蓄", "塊", "嗅", "漠", "奨", "滞", "羨", "溝", "義", "較", "摂", "聖", "寛", "窟", "碗", "寝", "詳", "新", "群", "辞", "睨", "鼠", "献", "慎", "債", "慨", "督", "僧", "腎", "夢", "置", "署", "罪", "虜", "勢", "廉", "傑", "準", "携", "傷", "嗜", "嗄", "嘩", "滝", "溶", "滑", "福", "隔", "隙", "照", "蒸", "煎", "腫", "勧", "働", "睡", "頑", "預", "傾", "鼓", "頓", "煩", "靴", "僅", "煙", "戦", "裸", "禅", "歳", "滅", "載", "腺", "腹", "腰", "腸", "継", "続", "絹", "賃", "資", "損", "催", "稚", "雅", "搬", "殿", "裾", "源", "溺", "溜", "豊", "嵩", "農", "嫌", "嫁", "嫉", "跡", "跳", "路", "嘆", "漢", "酬", "賊", "賂", "賄", "鈴", "鉄", "鉢", "鉛", "鉱", "幹", "跨", "誇", "該", "飽", "飼", "飾", "節", "溢", "禁", "塗", "塩", "盟", "塞", "話", "誉", "詫", "誠", "詰", "詣", "試", "詩", "詮", "馴", "鳩", "墓", "幕", "雷", "零", "電", "触", "蜂", "解", "愛", "暇", "暗", "暖", "遠", "園", "猿", "想", "感", "愚", "意", "棄", "楽", "業", "微", "違", "数", "痴", "痺", "遣", "魂", "銃", "鞄", "寧", "僕", "窪", "算", "箇", "管", "鼻", "徴", "旗", "複", "疑", "穀", "製", "需", "歌", "端", "彰", "障", "境", "塵", "腐", "塾", "貌", "稲", "種", "暮", "蔑", "慕", "像", "豪", "僚", "歴", "暦", "蜜", "踊", "慣", "賑", "領", "構", "様", "模", "憎", "増", "層", "遭", "遮", "適", "嘘", "碑", "鳴", "磁", "漂", "漏", "漕", "演", "漁", "漆", "銘", "銀", "銅", "銭", "酸", "酵", "酷", "慢", "漫", "髪", "聞", "閥", "関", "閣", "静", "精", "漬", "奪", "雑", "維", "雌", "徳", "態", "熊", "遜", "腿", "膜", "罰", "誓", "獄", "際", "察", "隠", "駆", "駄", "駅", "概", "滴", "摘", "認", "誘", "語", "誌", "説", "読", "誤", "練", "綴", "緑", "緒", "総", "綿", "綱", "網", "綻", "聡", "歓", "舞", "確", "権", "監", "盤", "蔵", "舗", "澄", "皺", "撫", "墜", "撲", "魅", "頬", "踏", "憂", "履", "膝", "嘲", "潮", "糊", "審", "寮", "窮", "儚", "養", "僻", "儀", "趣", "暴", "撮", "褒", "敵", "敷", "劇", "慮", "戯", "膚", "嬉", "弊", "幣", "餅", "餌", "餓", "蝿", "蝶", "縄", "噂", "嘱", "噛", "編", "緩", "縁", "線", "締", "緊", "潔", "撤", "徹", "撒", "衝", "霊", "器", "震", "憧", "導", "選", "影", "稽", "稼", "稿", "遺", "賞", "潰", "勲", "熟", "黙", "熱", "慰", "億", "穂", "暫", "輝", "輩", "輪", "摩", "撃", "鋭", "標", "横", "槽", "賠", "閲", "賜", "潤", "賛", "質", "潜", "罵", "駒", "駐", "範", "箸", "箱", "憤", "諸", "噴", "課", "調", "談", "請", "誕", "論", "誰", "諾", "誼", "賭", "賢", "獣", "薦", "磨", "糖", "輸", "麺", "壇", "醒", "曇", "積", "縦", "髭", "縛", "縫", "緯", "繁", "還", "避", "壁", "獲", "擁", "奮", "操", "薬", "築", "衛", "衡", "燃", "興", "膨", "龍", "骸", "橋", "樹", "機", "穏", "憶", "憲", "整", "憩", "凝", "親", "隣", "頼", "頭", "激", "濃", "薄", "融", "館", "濁", "錬", "錆", "錠", "録", "錯", "鋼", "嬢", "壊", "懐", "謀", "諭", "諦", "謡", "濯", "環", "燥", "轄", "繋", "儲", "贅", "曜", "難", "観", "鎮", "鎌", "鎖", "擬", "擦", "鮮", "闇", "癌", "療", "聴", "臆", "懇", "鍛", "鍵", "鍋", "醜", "講", "購", "醤", "繊", "績", "縮", "霜", "霞", "濡", "償", "覧", "頻", "齢", "曖", "犠", "優", "謝", "謙", "謹", "謎", "厳", "糞", "翼", "瞳", "職", "織", "繕", "礎", "襟", "襖", "鯉", "贈", "糧", "騎", "騒", "験", "癒", "懲", "覆", "臨", "穫", "瞬", "鞭", "簡", "闘", "翻", "類", "題", "顔", "顕", "癖", "額", "韓", "鏡", "爆", "願", "繰", "蹴", "蟻", "覇", "麗", "霧", "識", "警", "臓", "離", "羅", "艶", "瀕", "瀬", "簿", "騙", "蘇", "鯨", "鶏", "懸", "鐘", "騰", "欄", "競", "籍", "響", "議", "譲", "護", "轟", "魔", "艦", "顧", "露", "躍", "驚", "鑑", "鶴", "襲", "沖", "硫", "礁", "俊", "伯", "啓", "或", "享", "祷", "禍", "曹", "瞑", "瞭", "羞", "甥", "瘤", "摯", "俵", "壌", "蓋", "藻", "菊", "掟", "楚", "淀", "抉", "扮", "拶", "汰", "沙", "炒", "鬱", "遷", "粥", "墨", "牽", "尉", "碁", "猾", "狡", "狸", "獅", "徘", "徊", "凧", "此", "麓", "雛", "於", "筈", "泰", "薪", "秤", "宰", "款", "淑", "叔", "隷", "愕", "酎", "顎", "睦", "贄", "壷", "淵", "浦", "泌", "涎", "慶", "唐", "俯", "隻", "斎", "巫", "傲", "倣", "冴", "牧", "遡", "胡", "萌", "暢", "帥", "幌", "矮", "嬌", "矯", "楼", "辿", "迭", "迂", "辻", "韻", "剖", "拉", "笠", "緻", "縺", "縞", "糾", "醸", "酪", "晒", "洒", "牢", "竿", "芋", "鋳", "鉤", "鋏", "鎧", "箔", "箋", "篠", "籠", "煽", "灼", "炸", "丹", "鞍", "帆", "彷", "紡", "劫", "勃", "崎", "埼", "綺", "阪", "岡", "阜", "媛", "畿", "奈", "蛮", "蛙", "蝉", "螺", "賓", "窒", "寡", "践", "蹄", "踪", "鮭", "鮨", "鮫", "餃", "曙", "孝", "巷", "逐", "塚", "遽", "曰", "昂", "臼", "憾", "惣", "惹", "愁", "慈", "憑", "恣", "棋", "槍", "栃", "棲", "樽", "槌", "梱", "櫛", "楓", "柵", "杭", "桟", "柳", "柏", "柿", "烏", "鴎", "潟", "鷲", "鷹", "鵜", "蔦", "奸", "婿", "妃", "汝", "姑", "姪", "姜", "后", "勿", "斥", "但", "渾", "軋", "坦", "藤", "脛", "腑", "膳", "膿", "腱", "嚇", "囁", "嘔", "噌", "爺", "釜", "斧", "篤", "馳", "匙", "仄", "凹", "凸", "訛", "諺", "訝", "訣", "譜", "謳", "諜", "那", "陛", "阿", "兎", "兜", "禿", "栗", "朱", "粟", "云", "仁", "孔", "旺", "閏", "逞", "只", "苔", "侶", "頷", "頒", "琴", "咎", "吟", "嗽"];