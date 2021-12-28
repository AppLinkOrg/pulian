// 编写一个简单的store模式
import { reactive } from 'vue'

const store = {
    debug: true, // 开启调试模式

    state: reactive({
        name: '',
        ios:false
    }),

    changeName(value) {
        this.state.name = value
    }
}

export default store
