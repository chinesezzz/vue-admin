<template>
  <div id="loginOrg">
    <div class="loginOrg-wrap">
        <ul class="menu-tab">
          <li>
            更换角色
          </li>
        </ul>
        <!-- 表单 start -->
        <el-form :model="ruleForm" status-icon ref="ruleFormRef" class="loginOrg-form" size="default">
          <el-form-item prop="clientID" class="item-from">
          <label>实体</label>
            <el-select v-model="ruleForm.clientID" style="width:100%" @change="selectClient">
              <el-option
                v-for="item in client_options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item prop="roleID" class="item-from">
          <label>角色</label>
            <el-select v-model="ruleForm.roleID" style="width:100%" @change="selectRole">
              <el-option
                v-for="item in role_options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item prop="orgID" class="item-from">
          <label>组织</label>
            <el-select v-model="ruleForm.orgID" style="width:100%" @change="selectOrganization">
              <el-option
                v-for="item in org_options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item prop="storageID" class="item-from">
          <label>仓库</label>
            <el-select v-model="ruleForm.storageID" style="width:100%" @change="selectStorage">
              <el-option
                v-for="item in storage_options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item prop="trxDate" class="item-from">
          <label>事务日期</label>
            <el-date-picker
              v-model="ruleForm.trxDate"
              type="date"
              style="width:100%"  
            />
          </el-form-item>

          <el-form-item>
            <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="danger" class="login-btn block" @click="cancleForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeMount, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getRoleByClientID, getOrgByClientID, getUserStorageInfo } from '@/api/login'

export default {
    name: 'loginOrg',
    setup() {
        // 表单绑定数据
        const ruleFormRef = ref(null);
        const ruleForm = reactive({
            clientID: '',
            roleID: '',
            orgID: '',
            storageID: '',
            trxDate: new Date(),
            });

        // 路由
        const router = useRouter();
        const route = useRoute();

        const client_options = JSON.parse(route.params.clients);
        const token = route.params.token;

        let role_options = reactive([]);
        let org_options = reactive([]);
        let storage_options = reactive([]);

        /**
         * 生命周期
         */
        // 挂载前
        onBeforeMount(() => {
          ruleForm.clientID = client_options[0].id
          // 根据实体ID获取用户角色
          getRoleByClientID(ruleForm.clientID, token).then(res => {
            role_options.length = 0;
            res.data.roles.forEach(element => {
              role_options.push(element);
            });
            ruleForm.roleID = role_options[0].id;
            
            // 根据实体、角色获取组织信息
            getUserOrgInfo(ruleForm.clientID, ruleForm.roleID);

            // 重置仓库
            storage_options.length = 0;
          }).catch(error => {
            console.log('根据实体获取用户角色失败！');
          });

        });

        // 挂载完成后
        onMounted(() => {
          // console.log('挂载完成');
        });

        // 选择实体
        function selectClient(val){
          ruleForm.clientID = val;
          // 根据实体ID获取用户角色
          getRoleByClientID(ruleForm.clientID, token).then(res => {
            role_options.length = 0;
            res.data.roles.forEach(element => {
              role_options.push(element);
            });
            ruleForm.roleID = role_options[0].id;
            
            // 根据实体、角色获取组织信息
            getUserOrgInfo(ruleForm.clientID, ruleForm.roleID);

            // 重置仓库
            storage_options.length = 0;
          }).catch(error => {
            console.log('根据实体获取用户角色失败！');
          });
        }

        // 选择角色
        function selectRole(val){
          ruleForm.roleID = val;
          // 根据实体、角色获取组织信息
          getUserOrgInfo(ruleForm.clientID, ruleForm.roleID);

            // 重置仓库
            storage_options.length = 0;
        }

        // 选择组织
        function selectOrganization(val){
          ruleForm.orgID = val;
          // 根据选择的组织获取仓库信息
          getUserStorageInfo(ruleForm.clientID, ruleForm.roleID, ruleForm.orgID, token).then( res => {
            storage_options.length = 0;
            res.data.warehouses.forEach(element => {
              storage_options.push(element);
            })
            
            if(storage_options.length > 0){
              ruleForm.storageID = storage_options[0].id;
            }
          }).catch(error => {
              console.log('根据用户仓库信息失败！');
          });
        }

        // 选择仓库
        function selectStorage(val){
          ruleForm.storageID = val;
        }

        // 根据实体ID获取用户组织
        function getUserOrgInfo(client_id, role_id){
            getOrgByClientID(client_id, role_id, token).then(res => {
              org_options.length = 0;
              res.data.organizations.forEach(element => {
                org_options.push(element);
              });
              ruleForm.orgID = 0;

              ruleForm.storageID = '';
            }).catch(error => {
              console.log('根据实体获取用户组织失败！');
            });
        }

        function getFormatDate(date){
          var year= date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          return [year, '-', month , '-', day].join('');
        }

        // 提交表单
        const submitForm = () => {
          console.log(ruleForm);
          console.log(getFormatDate(ruleForm.trxDate));
        }

        return {
            ruleFormRef,
            ruleForm,
            client_options,
            role_options,
            org_options,
            storage_options,
            selectClient,
            selectRole,
            selectOrganization,
            selectStorage,
            submitForm
        };
    }
}
</script>

<style lang='scss' scoped>
#loginOrg {
  height: 100vh;
  background-color: #344a5f;
}
.loginOrg-wrap {
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
  }
  .current {
    background-color: rgba(0, 0, 0, .1);
  }
}
.loginOrg-form {
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
    width: 45%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>