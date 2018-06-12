import validator from 'validator'

export default {
  checkEmail(email) {
    return validator.isEmail(email)
  },
  checkPass(passwd) {
    let pattern = /^([a-zA-Z0-9!.@#$%^&*()_?<>{}]){6,16}$/
    return pattern.test(passwd)
  },
  checkMobile(phone) {
    return validator.isMobilePhone(phone, 'zh-CN')
  }
}
