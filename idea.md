# 多平台

- [ ]  web 端

- [ ] 管理端

- [ ] App 

- [ ] 小程序端

- [ ] 服务端(管理端)

- [ ] 服务端(客户端)

# 思路步骤

1. 先写服务端 确定架构的思想

2. 服务端设计好接口 前端方便对接接口

3. nest cli 有两种模式
   
   > standard mode /   单个项目
   
   > monorepo mode / 单体仓库
   > 
   > ```cmd
   > nest g app NewApp
   > ```
   > 
   > 1. 一个仓库可以有多个项目
   > 
   > 2. 接口不同，数据库同样，模型相同 可以复用

4. 启动 server/admin 并监听改变重启服务
   
   ```cmd
   nest start -w admin 
   ```

5. 创建库 lib 
   
   > 数据库模块 db 独立的模块可复用
   
   ```cmd
   nest g lib db 
   What prefix would you like to use for the library (default: @app)?
   @libs
   ```
   
   
