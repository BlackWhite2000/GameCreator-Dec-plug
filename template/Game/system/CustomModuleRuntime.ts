/**
 * #1 道具
 */
class Module_Item {
    id: number;
    name: string;
    icon: string; // = ""; 图标
    intro: string; // = "";
    sell: number; // = 0; 商店售价
    isUse: boolean; // = false; 可使用
    sellEnabled: boolean; // = false; 允许出售给商店
    isConsumables: boolean; // = false; 消耗品
    se: string; // = ""; 使用时音效
    callEvent: string; // = ""; 使用后执行的事件
}
/**
 * #2 解谜线索
 */
class Module_dec_yyvhc {
    id: number;
    name: string;
    textName: string; // = ""; 线索名称
    textC: string; // = ""; 描述
    textNum: number; // = 0; 数值集合模式下的线索数值
    decType: number; // = 0; 线索类型
}
/**
 * #3 线索类型
 */
class Module_decType_yyvhc {
    id: number;
    name: string;
}