<template>
  <el-container class="out-container">
      <el-header>
        <div class="user-right">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>注销</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>童爸爸</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div id="nav">
            <router-link to="/">Home</router-link> 
            <!-- <router-link to="/about">About</router-link> -->
            <!-- <router-link to="/user">User</router-link> -->
            <router-link to="/cutImg">裁切图片</router-link>
            <router-link to="/uploadImg">拖拽上传</router-link>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .el-header, .el-footer {
    background-color: teal;
    color: #fff;
    // text-align: center;
    line-height: 60px;
    .el-dropdown {
      i {
        color: #fff;
      }
    }
  }

  .el-header {
    .user-right {
      float: right;
    }
  }
  
  .el-aside {
    box-sizing: border-box;
    background-color: #5cafaf;
    color: #333;
    text-align: center;
    #nav {
      box-sizing: border-box;
      a {
        text-align: left;
        padding: 10px 20px;
        display: block;
        text-decoration: none;
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
          background:rgba(0, 0, 0,.1);
          color: #fff;
        }
      }
    }
    // line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    // line-height: 160px;
  }
</style>
