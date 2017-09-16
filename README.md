# react-12306
### 使用create-react-app模板模仿12306app，实现了登陆和查票购票管理，结合express+mysql做后台，实现数据存储
       前一阵边学react边做，用antdmobile搭建了一套牛客app的页面，比较基础[(界面)](https://github.com/jinqiang12345/rreact-niukeAPP)，感兴趣的可以去看看，前辈让我模仿一下12306把前后端都联系起来,我就建了这个项目，上次使的是antd提供的模板，这次选用了create-react-app模板，自己引入redux、react-router、material-UI搭建前端界面，用express+mysql做后端，用fetchAPI连接，用redux存数据，在不同页面使用，项目过程中有很多问题，不过通过google，segmentfault提问都得到了解决。
#### 实现功能
* 用户登录
* 用户注册
* 选择出发车站和目的车站
* 查询指定车站车次车票
* 购买车票
* 删除已购买的车票
* 退出登录
#### 项目截图
* app页面

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%BD%A6%E7%A5%A8%E6%9F%A5%E8%AF%A2%E9%A1%B5%E9%9D%A2.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E5%95%86%E6%97%85%E6%9C%8D%E5%8A%A1%E9%A1%B5%E9%9D%A2.png "github")
> 未登陆时点击订单查询页面会自动跳转到登陆页面

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%AE%A2%E5%8D%95.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/12306%E9%A1%B5%E9%9D%A2.png "github")
* 登陆验证部分截图

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E7%99%BB%E9%99%86%E9%A1%B5%E9%9D%A2.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E7%99%BB%E9%99%86.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%B4%A6%E5%8F%B7%E6%88%96%E5%AF%86%E7%A0%81%E9%94%99%E8%AF%AF.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E6%89%8B%E6%9C%BA%E5%8F%B7%E6%A0%BC%E5%BC%8F%E9%94%99%E8%AF%AF.png "github")
> 登陆成功

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E5%B7%B2%E7%99%BB%E9%99%86.png "github")
* 注册失败

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E6%B3%A8%E5%86%8C%E5%A4%B1%E8%B4%A5.png "github")
* 查询车票和筛选车次

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%BD%A6%E7%A5%A8%E6%9F%A5%E8%AF%A2.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%BD%A6%E7%A5%A8%E6%9F%A5%E8%AF%A22.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%BD%A6%E7%A5%A8%E7%AD%9B%E9%80%891.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%BD%A6%E7%A5%A8%E7%AD%9B%E9%80%892.png "github")
* 查询中

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E6%9F%A5%E8%AF%A2loading.png "github")

* 购票退票

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%B4%AD%E4%B9%B0%E8%BD%A6%E7%A5%A8.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E8%B4%AD%E4%B9%B0%E6%88%90%E5%8A%9F.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E5%88%A0%E9%99%A4%E8%AE%A2%E5%8D%95.png "github")
![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E5%88%A0%E9%99%A4%E6%88%90%E5%8A%9F.png "github")
* 退出登陆

![github](https://github.com/jinqiang12345/react-12306/blob/master/screenshots/%E9%80%80%E5%87%BA%E7%99%BB%E5%BD%95.png "github")


#### 运行项目
* 首先确保已安装mysql(因为mysql官网上下载mysql需要注册，我使用的是免费版的wampserver，里面含有mysql，同样也可以使用)
* 导入文件夹下两个sql文件
>* 在mysql中创建用户名数据表user(id, password)
>* 在mysql中创建train火车票数据表train(id, start, end, number, title, time, type)
* 在运行之前要在12306server/router文件夹下更改数据库配置(用户名，登陆密码，数据库名，表名等)
* 上述工作完成后打开12306server文件夹运行
>* npm install
>* node app.js
> //这样你的服务器已经在localhost:5000打开了
* 接下来打开12306文件夹运行
>* npm install
>* npm start //这样12306就在localhost:3000打开了

#### 项目目录
##### 12306server
>* -node_modules
>* -router //路由文件夹，存放处理不同请求的文件
>>* --insertrecord.js //购买火车票后，将数据存入数据库
>>* --login.js //用户登陆时调用
>>* --record.js //查询用户所有火车票传回前端
>>* --removerecord.js //用户删除火车票时处理
>>* --signin.js //新用户注册时调用
>>* --train.js //指定出发地和目的地的全部车次
>* -app.js //项目入口文件
>* -package.json

##### 12306
>* -node_modules
>* -public
>* -src
>>* --actions //redux action
>>>* ---index.js //存放redux action 例如登陆后保存用户名，退出登陆后删除记录
>>* --components //页面复用组件
>>>* ---dashtable.jsx //对应page/order界面最上部功能栏
>>>* ---dialog.jsx //购买车票和删除车票弹出的确认框
>>>* ---history.js //路由跳转插件可以使用history.push('***')跳转页面
>>>* ---logindialog.jsx //登陆验证弹出框，例如输入为空或错误，注册失败
>>>* ---Navbar.jsx //顶部标题栏
>>>* ---refresh.jsx //获取后台传回数据时加载中标志
>>>* ---sitelist.jsx //车站列表，我只是静态添加了几个，可以在文件中修改
>>>* ---ticket.jsx //对应page/order页面车票查询组件
>>>* ---tooltip.jsx //购票成功或失败，删除车票成功或失败底部信息提示
>>* --pages //app页面
>>>* ---bottomBar.jsx //底部导航
>>>* ---endsite.jsx //目的车站页面
>>>* ---login.jsx //登陆页面
>>>* ---my12306.jsx //12306页面，登陆信息
>>>* ---order.jsx //车票预定页面，可查询车票
>>>* ---record.jsx //购票记录页面，可删除车票
>>>* ---server.jsx //商旅服务页面
>>>* ---site.jsx //出发车站页面
>>>* ---train.jsx //车票页面，车次根据车型筛选有效
>>>* ---user.jsx //用户信息页面，退出登录有效
>>* --reducers //redux reducer 对action 处理的函数
>>* --index.css
>>* --index.js //项目入口
>>* --registerServiceWorker.js
>>* --router.js //路由配置
>* -.gitignore
>* -package.json
>* -README.md
>* -yarn.lock


