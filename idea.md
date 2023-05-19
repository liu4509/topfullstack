# 多平台

- [ ] web 端

- [ ] 管理端

- [ ] App 

- [ ] 小程序端

- [x] 服务端(管理端)

- [ ] 服务端(客户端)

# 思路步骤

## 后台管理服务

1. 先写服务端 确定架构的思想

2. 服务端设计好接口 前端方便对接接口

3. 创建 server 
   
   > App端接口
   
   ```cmd
   nest new server
   ```

4. nest cli 有两种模式
   
   > standard mode /   单个项目
   
   > monorepo mode / 单体仓库
   > 
   > ```cmd
   > nest g app admin
   > ```
   > 
   > 1. 一个仓库可以有多个项目
   > 
   > 2. 接口不同，数据库同样，模型相同 可以复用

5. 启动 server/admin 并监听改变重启服务
   
   > 后台接口
   
   ```cmd
   nest start -w admin 
   ```

6. 创建库 lib 
   
   > 数据库模块 db 独立的模块可复用
   
   ```cmd
   nest g lib db 
   ```
   
   ```cmd
   What prefix would you like to use for the library (default: @app)?
   @libs
   ```
   
   > 在 admin.module.ts imports DBDbService

7. 安装 nest 数据库模块
   
   ```cmd
   yarn add nestjs-typegoose @typegoose/typegoose
   ```

8. 安装 mongoose 
   
   ```cmd
   yarn add mongoose @types/mongoose
   ```
   
   > mongoDB 需要通过 shell 连接

9. db 添加 nest-typegoose

10. 添加 数据模型
    
    > user.model.ts

11. 在子项目 admin 创建模块 users
    
    module -- mo
    
    controller -- co
    
    ```cmd
    nest g mo -p admin users
    nset g co -p admin users
    ```

12. 通过模块实现 crud(增删改查)
    
    ```cmd
    yarn add nestjs-mongoose-crud
    ```
    
    依赖 swagger 
    
    ```cmd
    yarn add @nestjs/swagger swagger-ui-express
    ```
    
    访问 xxx/users 数据库是否成功

13. nestjs+jest测试框架
    
    在 users.controller.spec 出现 error
    
    > Nest can't resolve dependencies of the UsersController (?). Please make sure that the argument UserModel at index [0] is available in the RootTestModule context.
    
    对于依赖于数据库的nest框架，需要在async 函数声明module时imports我们的数据库模块。否则会报错
    
    ```ts
    // old
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [UsersController],
        }).compile();
    // new 
    import { DbModule } from '@libs/db';
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [UsersController],
          imports: [DbModule],
        }).compile();
    ```

14. 模型的名称一般为单数 模块或控制台一般用复数
    
    > user.model.ts // 数据库模型
    > 
    > users.module.ts // 模块

15. 定义 课程模型 -- course.model.ts

16. 定义 课时模型 -- episode.model.ts 通过 ID 关联课程字段 episodes

17. 创建课程模块
    
    ```cmd
    nest g mo -p admin courses
    nest g co -p admin courses
    ```
    
    > 注意在 db.modeule.ts 中 统一引用中(forFeatrue)添加 Course 

18. 创建课时模块

```cmd
nest g mo -p admin episodes
nest g co -p admin episodes
```

> 注意在 db.modeule.ts 中 统一引用中(forFeatrue)添加 Course

## 后台管理前端

1. 安装 vue/cli
   
   ```cmd
   npm install @vue/cli -g
   ```

2. 创建 vue 项目
   
   ```cmd
   vue cerate admin
   ```

3. 添加 element
   
   ```cmd
   vue add element
   ```

4. 加 routert
   
   ```cmd
   vue add router
   ```

5. vue add typescript
   
   ```cmd
   vue add typescript
   ```

6. 安装 axios
   
   ```cmd
   yarn add axios @types/axios
   ```

7. 安装 vue-ele-form 
   
   ```cmd
   yarn add vue-ele-form
   ```

8. 使用 Avue 重写 CRUD 
   
   ```cmd
   yarn add @smallwei/avue
   ```

9. 通过 multer-aliyun-oss 上传图片到阿里云 oss 
   
   ```
   yarn add multer-aliyun-oss
   ```

10. 检测 包 更新
    
    ```cmd
    yarn upgrade-interactive --latest
    ```

11. 配置 项目环境变量
    
    ```bash
    yarn add @nestjs/config
    ```
    
    .env 配置文件
    
    .env.example 配置范例文件

12. 前端添加 项目环境变量 
    
    .env 配置文件
    
    
