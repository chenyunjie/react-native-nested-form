# react native表单组件
react-native-nested-form用常见的表单提交功能，支持表单嵌套，最后通过表单对象获取到整个表单值对象

## 安装
`npm install react-native-nested-form --save`

## 使用示例
```javascript
import Form from './src/form';
 import Input from './src/form/input';
 export default class RCTNativeNestedForm extends Component {
     constructor(props) {     	 	
    	 	super(props);   
    		this.onPressed = this.onPressed.bind(this);
    }
     render() {
         return (
                     <View style={{padding: 30}}>
                          <Form ref={(form) => this.form = form}>
                                 <Input property="name" labelText="用户名" placeholder="请输入用户名"/>
                                 <Input property="password" labelText="密码" placeholder="请输入密码"/>
                                 <Form group={true} property="hobbies">
                                     <Input property="name" labelText="爱好一" placeholder="请输入爱好一"/>
                                     <Input property="name" labelText="爱好二" placeholder="请输入爱好二"/>
                                	</Form>
                 
                          </Form>
                        <TouchableOpacity style={{width: 250, height: 35, marginTop: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#40b0ff'}} onPress={this.onPressed}>
                             <Text>提交</Text>
              		</TouchableOpacity>
                 </View>
         );
     }
     onPressed() {
         console.log('form data: \n' + JSON.stringify(this.form.data()));
    }
}


```

## 示例结果输出
```
{
    "name":"chenyunjie",
    "password":"123456",
    "hobbies":[
        {
            "name":"足球"
        },
        {
            "name":"篮球"
        }
    ]
}

```

## 说明
#### 可自定义表单项，参考内置的Input实现，表单项需要实现

props

    a. 每个表单项需要传递propery属性,表单的group=true时可以不传递
    b. 非group类型的表单数据没有property参数，则不会将值记录到表单数据中去
    
方法：

    取值：getValue

    设值：setValue

属性：

    表单标识：isFormCell=true

表单自身也可以存在setValue方法，该方法会根据表单结构和从给定的数据中按照props.property进行设置值


