## 问题
1. 关于样式
描述：最后WEBPACK会把所有版块的CSS合并在一起，如果编写样式的时候命名以及一些处
理不够规范，很容易导致样式之间的冲突！
解决：使用LESS/SASS预编译语言，每一个版块最外层的样式类名保证唯一性（命名规则
：版块名称+BOX等修饰词），把当前版块下的子内容都嵌套到这个里面。需要公用的样式写
在CoMMON中即可。
=>有一些JS/WEBPACK插件自动进行了版块区分，目的是为了保证CSS不冲突

2. 真实项目中并不是所有的组件都和REDUX有关系，所以对于那些和REDUX没关系的组件，我们不要在？
SCONNECT高阶处理了（同理对于不需要使用路由中属性的一些组价，也没必要withRouter...）；也就是。
s尽可能少使用高阶组件，因为高阶组件都是利用柯理化函数思想，形成闭包嵌套，这样导致很多内存不。
s销毁，影响性能！|

3. 真实项目中，完成数据绑定，我们可以按照以下方案处理：
方案一：第一次加载组件之前或者之后（WillMount/DidMount），发送AJAX请求，等待数据请求成功
后，把请求回来的数据更新组件内部的状态信息（第一次加载的是空数据，第二次更新的时候加载真实的
数据）从而重新渲染组件，展示真实的内容。

  弊端：在路由切换的时候，当前组件很有可能需要重新加载（组件完成了从页面移除到再次展示的过程
，这样需要从CONSTRUCTOR从头加载组件），这样就导致，只要路由切换到这个组件，都需要重新发送一次AJAX请求，对于一些不是随时更新数据的组件，这样处理会增加HTTP请求的次数，增重服务器的处理压力！

  方案二：每一次加载组件，我们首先验证REDUX中是否存储了展示的信息，如果有，直接从REDUX获取
即可，如果没有，发送一个DISPATCH派发，在派发的ACTION CREATOR中基于AJAx获取数据，把获取
的数据传递给REDUCER，把信息存储到REDUX中，RUDUX中的信息更改，那么用到它的组件也会重新渲染

  弊端：某些特定的案例中会存在一些问题，需要额外处理，例如（在个人中心，A用户登录成功，我们进
入个人信息页面，首先会把A的信息存储到REDUX中，这样只要进入到信息页，展示的都是A的信息，不会
重新从服务器获取最新的信息，即使A的信息己经改变，或者是登录的用户己经变为B了，都不会改变）
这种情况，我们需要在一些其它操作的时候（例如：重新登录、修改用户信息、退出登录等操作），都才需要REDUX中存储的个人信息更新才可以！


4. 在REDUX-PROMISE中间件使用的时候，ACTION-CREATOR中返回的ACTION对象，传递给REDUCER的ACTION数据（从服务器获取的数据，开始返回的是一个PROMISE）中的属性名必须要是payload（严格区分大小写）,只有这样，当PROMISE成功，中间件才会帮我们重新发送一次派发给REDUCER，然后把获取的数据信息更新REDUX容器中的状态！=> “PROMISR值必须放到payload属性名下才可以”

   可以使用THUNK中间件的语法

   ```
   queryBanner() {
       return async dispatch => {
           let bannerData = await queryBanner();
           dispatch({
               type: TYPES.COURSE_QUERY_BANNER,
               bannerData
           });
       }
   }
   ```

5. 实现购物车的流程

  [点击加入购物车]
     1. 向服务器发送请求，让服务器存储当前新加的信息（为了防止页面刷新，购物车信息消失：REDUX中的信息在页面刷新后就没有了； 可以跨平台(前提是用户已经登录)；）

```
 2. 当服务器返回存储成功后，我们把信息往REDUX中存储一份（建议最好是：从服务器获取我的购物车信息，存储到REDUX中）
   ->存储到REDUX中，目的是以后切换到我的购物车页面，没必要总是从服务器获取，从REDUX获取也可以，提高性能
   ->之所以是从服务器获取信息存储到REDUX中，因为服务器的信息是最准确的，即使页面刷新了，即使某些操作我们忘记向REDUX中存储了，每一次派发都可以获取最新的信息（只要你向服务器发送了即可）
```

6. 实现全选和非全选等
   [全选]
   现在的项目都是数据驱动（点击复选框也会是把数据中的选中信息更新，从而更新组件让其有选中或非选中的效果） =>当前案例操作的是REDUX中UNPAY里面的数据
   1.先把REDUX->UNPAY中的每一个商品信息额外增加一个属性，记录是否被选中（默认都是被选中的），还要有一个属性记录全选或者全不选的操作
   2.编写一个DISPATCH任务，用来控制哪些课程需要被选中或者不选中（包含全选和全不选）

  [删除]
    首先在所有数据中找出选中的那些项，分别执行API：removeShopCart(courseID)这个方法，等到删除操作完成（所有的删除操作都完成了），我们重新从服务器获取最新的购物车信息，更新REDUX中的状态（DISPATCH：queryUnpay），REDUX信息更新，页面重新渲染

  [支付]
    类似于删除(支付之前需要先登录)














## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
