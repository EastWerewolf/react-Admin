import {MenuData} from '../Menu/menuData'
import {flat} from '../../Config/utils';

const arr = flat(MenuData);
const tabData = {};
arr.forEach(i=>{
    i.subMenu.forEach(j=>{
        if(!tabData[j.linkTo]){
            tabData[j.linkTo] = j.name
        }
    })
});
export default tabData
