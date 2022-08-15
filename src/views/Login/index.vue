<template>
  <div id="login">
    <div class="login-wrap">
        <ul class="menu-tab">
          <li>
            登 录
          </li>
        </ul>
        <!-- 表单 start -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleFormRef" class="login-form" size="default">
          <el-form-item prop="userName" class="item-from">
          <label>邮箱</label>
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="password" class="item-from">
          <label>密码</label>
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import { userLogin } from '@/api/login';
import { stripscript, validateEmail, validatePSW } from '@/uitls/validate';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default {
  name: 'login',
  setup() {
    // 存放Data数据、生命周期、自定义函数
    // 表单绑定数据
    const ruleFormRef = ref(null);
    const ruleForm = reactive({
          userName: 'hugevision-scm @ ivision-china.cn',
          password: '',
        });
    // 路由
    const router = useRouter();

      // 验证用户名
      let validateUserName = (rule, value, callback) => {
        
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!validateEmail(value)){
          callback(new Error('用户名格式不正确'));
        }
        else{
          callback();
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
        // 过滤数据
        ruleForm.password = stripscript(value);
        value = ruleForm.password;

        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        // else if(!validatePSW(value)){
        //   callback(new Error('密码为6至20位数字+字母'));
        // }
        else {
          callback();
        }
      };
    // 表单的验证
    const  rules = reactive({
          userName: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        });

    /**
     * 声明函数
     */

    // 获取验证码
    // const getSms = (() => {
    //   let data = {
    //         userName: 'hugevision-scm @ ivision-china.cn',
    //         password: '1'
    //     };
    // });  

    // 提交表单
    const submitForm = () => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          // 调用API
          userLogin(ruleForm).then(res => {
            router.push({
              name: 'LoginOrg',
              params: {
                clients: JSON.stringify(res.data.clients),
                token: res.data.token
              }
            })
          }).catch(error => {
            ElMessage.error('用户名或密码不正确！');
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }; 

    return { 
      ruleForm,
      ruleFormRef,
      rules,
      submitForm,
    };
  }
};
</script>
<style lang='scss' scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 19px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {margin-bottom: 13px;}
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>