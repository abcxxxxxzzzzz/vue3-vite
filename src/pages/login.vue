<template>
    <el-row class="login-container">

        <!-- 登录页左边 -->
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>欢迎光临</div>
                <div>这是描述信息</div>
            </div>
        </el-col>

        <!-- 登录页右边 -->
        <el-col :lg="8" :md="12"  class="right">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>


<el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
    <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
                <el-icon><User /></el-icon>
            </template>
        </el-input>
    </el-form-item>
    <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入用户密码" show-password>
            <template #prefix>
                <el-icon><Lock /></el-icon>
            </template>
        </el-input>
    </el-form-item>
    <el-form-item>
        <el-button round color="#626aef" class="w-[250px] " type="primary" :loading="loading" @click="onSubmit">登录</el-button>
    </el-form-item>
</el-form>
        </el-col>
    </el-row>
</template>



<script setup>
import { ref, reactive, onMounted,onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from '~/composables/util'
import store from '~/store'

const router = useRouter()

// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
  
})

// 定义验证规则
const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        },
    ]
}

// 点击登录验证
const formRef = ref(null)
const loading = ref(false)

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('error')
        }
        // 加载按钮动画
        loading.value = true

        store.dispatch('login', form).then(res=>{
            toast('登录成功')
            router.push('/')

        }).finally(()=> {
            loading.value = false
        })
    })
}

// 坚挺回车事件
function onKeyUp(e){
    // console.log(e)
    if(e.key == 'Enter') onSubmit();
}

// 添加键盘添加
onMounted(()=>{
    document.addEventListener('keyup', onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(()=>{
    document.removeEventListener('keyup', onKeyUp)
})
</script>


<style scoped>
.login-container {
    @apply min-h-screen;
}

.login-container .left, .login-container .right {
    @apply flex justify-center items-center;
}

.login-container .left {
    @apply bg-indigo-500;
}

.login-container .right {
    @apply bg-light-500  flex-col ;
}


.left>div>div:first-child {
    @apply text-3xl font-bold text-light-50 mb-8;
}

.left>div>div:last-child {
    @apply text-gray-50 text-sm;
}


.right .title {
    @apply font-bold text-gray-800 text-3xl;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
    @apply h-1 w-16 bg-gray-200;
}

</style>

