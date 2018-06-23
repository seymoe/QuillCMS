import validator from 'validator'

export default {
  checkUserName(name) {
    let uPattern = /^[a-zA-Z0-9_-]{4,16}$/
    return uPattern.test(name)
  },
  checkEmail(email) {
    return validator.isEmail(email)
  },
  checkPass(passwd) {
    let pattern = /^([a-zA-Z0-9!.@#$%^&*()_?<>{}]){8,16}$/
    return pattern.test(passwd)
  },
  checkMobile(phone) {
    return validator.isMobilePhone(phone, 'zh-CN')
  }
}
