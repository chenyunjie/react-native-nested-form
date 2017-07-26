###react native表单组件
===
react-native-nested-form用常见的表单提交功能，支持表单嵌套，最后通过表单对象获取到整个表单值对象

##安装
`npm install react-native-nested-form --save`

##使用示例
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


