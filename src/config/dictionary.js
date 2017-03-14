/*Dictionary 配置*/
let dictionarySelect=[];
export function setDictonarySelect(dictionary){
    dictionarySelect=[];
    dictionarySelect=dictionary;
}
//全局菜单
window.getDictionarySelectByType=function(t){
    let defaultSelectedLabel = "",newArray = [];
    if (dictionarySelect.length > 0) {
        newArray = dictionarySelect.filter(function(e) {
            return e.type === t;
        });
        var defaultSelectedArray = newArray.filter(function(e) {
            return Boolean(e.selected) === true;
        });
        if (defaultSelectedArray.length == 0) {
            defaultSelectedLabel = newArray[0].label;
        } else {
            defaultSelectedLabel = defaultSelectedArray[0].label;
        }
    }
    return {
        defaultSelectedLabel: defaultSelectedLabel,
        selectList: newArray
    }
};

let dictionaryApplyType={};
export function setDictonaryApplyType(dictionary){
    dictionaryApplyType={};
    dictionary.forEach(function(item) {
        if (dictionaryApplyType.hasOwnProperty(item.bm)) {
            dictionaryApplyType[item.bm].push({
                label: item.splx,
                value: item.code
            });
        } else {
            dictionaryApplyType[item.bm] = [{
                label: item.splx,
                value: item.code
            }];
        }
    });
}
window.getDictionaryApplyType=function(t){
    return dictionaryApplyType[t] || [];
}