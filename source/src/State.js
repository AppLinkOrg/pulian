// 编写一个简单的store模式
import { reactive } from 'vue'

const store = {
    debug: true, // 开启调试模式

    state: reactive({
        name: '',
        name2: '',
        title:'',
        carbrand_id:0,
        carseries_id:0,
        carmodel_id:0,
        first:0,
        cityid:0,
        cityname:'',
        biaoindex:0





    }),

    changeName(value) {
        this.state.name = value
    },
    changeName2(value) {
        this.state.name2 = value
    },
    changeTitlt(value) {
        this.state.title = value
    },
    changecarbrand_id(value) {
        this.state.carbrand_id = value
    },
    changecarseries_id(value) {
        this.state.carseries_id = value
    },
    changecarmodel_id(value) {
        this.state.carmodel_id = value
    },
    changefirst(value) {
        this.state.first = value
    },
    changecityid(value) {
        this.state.cityid = value
    },
    changecityname(value) {
        this.state.cityname = value
    },
    changebiaoindex(value) {
        this.state.biaoindex = value
    },

}

export default store
