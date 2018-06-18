let instance

class Config {

  constructor(){
      if(instance) instance = this
      else this.init()

      return instance
    }

  init(){
    let SecretStuff
    try {
      SecretStuff = require('./SecretStuff')
      console.log("secret file found")
    } catch (e) {
      console.log("secret file not found")
    } finally {
      if(SecretStuff) Object.assign(this, SecretStuff.default)
    }
  }

  testValue = "Hello Config!"

}

export default new Config()
