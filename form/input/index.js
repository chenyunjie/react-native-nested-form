/**
 * 表单项目
 *
 * Created by chenyunjie on 2017/1/17.
 */

import React, {
    Component, PureComponent
} from 'react';

import {
    View, StyleSheet, Text, TextInput
} from 'react-native';




/**
 *
 * labelText: label文本
 *
 * property: 值字段属性，用于表单集成数据
 *
 * value: 值，设置默认值
 *
 * valueFunction: 如果存在该参数，则直接取该字段函数返回值对象
 *
 * unit: 单位
 *
 * editable: true 是否可编辑
 *
 * editableOnEmpty 为空值时是否可编辑，覆盖editable
 *
 * labelStyle: 左侧文本样式
 *
 * valueStyle: 右侧值样式
 *
 * placeholder: 占位字符串
 *
 * maxLength:   允许输入的最大值
 *
 * keyboardType:  弹出键盘类型
 *
 * onChange: 内容变化回调
 *
 * onPress: 点击事件   可选
 *
 * rightIconRender 输入框后的icon渲染函数
 *
 */
export default class Input extends PureComponent {

    static defaultProps = {
        editable:true,
        maxLength:200,
        placeholder:'',
        keyboardType:'default',
        editableOnEmpty: true,  //为空值时是否可编辑，覆盖editable
    };

    constructor(props) {
        super(props);

        this.value = this.props.value;

        this.state = {
            inputVal : this.props.value
        };

        this.onTextChange = this.onTextChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== undefined && nextProps.value != this.value) {
            this.value = nextProps.value;
            this.setState({
                inputVal :  nextProps.value
            })
        }
    }


    render() {

        let inputVal = this.state.inputVal;

        let editable = true;

        if (this.props.editable == false) {
            if (!inputVal || inputVal == '') {
                if (this.props.editableOnEmpty == false) {
                    editable = false;
                }
            } else {
                editable = false;
            }
        }

        return (
            <View style={[styles.container,{flexDirection: 'row'}, this.props.style]}>
                {this.renderLabel()}
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TextInput onChangeText={this.onTextChange}
                               underlineColorAndroid='transparent'
                               value={inputVal}
                               placeholder={this.props.placeholder}
                               maxLength={this.props.maxLength}
                               keyboardType={this.props.keyboardType}
                               style={[styles.input, this.props.valueStyle]}
                               allowFontScaling={false}
                               editable={editable}/>
                    {
                        this.props.unit ?
                            <Text style={[styles.unitStyle]} allowFontScaling={false}>{this.props.unit}</Text> : null
                    }

                    {this.renderRightIcon()}

                </View>

            </View>
        );

    }

    renderRightIcon() {
        let editable = true;
        if (this.props.editable == false) {
            if (!this.state.inputVal || this.state.inputVal == '') {
                if (this.props.editableOnEmpty == false) {
                    editable = false;
                }
            } else {
                editable = false;
            }
        }

        if (editable) {
            if (this.props.rightIconRender) {
                return this.props.rightIconRender();
            }
        }

    }

    renderLabel() {
        if (this.props.labelText) {
            return (
                <Text style={[styles.label, this.props.labelStyle]} allowFontScaling={false}>
                    {this.props.labelText}
                </Text>
            );
        }
    }


    onTextChange(text) {
        this.value = text;

        this.setState({
            inputVal : text
        });

        if (this.props.onChange) {
            this.props.onChange(text);
        }
    }

    getValue() {
        if (this.props.valueFunction) {
            return this.props.valueFunction(this.value, this.props.data);
        } else {
            return this.value;
        }
    }

    setValue(text) {

        if (text) {
            text = text.toString();
        }

        this.value = text;

        this.setState({inputVal: text});
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#fff'
    },

    label: {
        color: '#333'
    },

    input: {
        textAlign: 'right',
        textAlignVertical:'center',
        paddingTop:0,
        paddingBottom:0
    },

    unitStyle:{
        marginLeft:3
    }
});