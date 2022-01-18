/*
 * @Author: E-Dreamer
 * @Date: 2022-01-17 11:54:28
 * @LastEditTime: 2022-01-18 13:28:22
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import './main.css';
import './main2.scss'
import './main1.less'
import './font/iconfont'
import logo from '../public/logo.png'

const a = 'Hello'
console.log(a)

const img = new Image()
img.src = logo

// document.getElementById('imgBox').appendChild(img)

class Author {
  name = '11'
  age = 18
  email = 'xxxxx@163.com'

  info =  () => {
    return {
      name: this.name,
      age: this.age,
      email: this.email
    }
  }
}


module.exports = Author