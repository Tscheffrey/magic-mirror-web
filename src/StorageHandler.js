let instance

class StorageHandler {


  constructor(){
      if(instance) instance = this
      else this.init()

      return instance
    }

  init(){
    this.prefix = '-mm-'
    this.internalStorage = {}

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if(!key.startsWith(this.prefix)) continue
      let value = localStorage.getItem(key)
      key = key.substr(this.prefix.length)
      if(value.length === 0) continue
      value = JSON.parse(value)
      this.internalStorage[key] = value
    }
  }

  setProperty(name, value){
    this.internalStorage[name] = value
    this.saveToLocalstorage(name, value)
    return this
  }

  getProperty(name){
    if(!name) return this.getAllProps()
    if(this.internalStorage.hasOwnProperty(name)) return this.internalStorage[name]
    else return null
  }

  getAllProps(){
    return this.internalStorage
  }

  async saveToLocalstorage(name,value){
    name = this.prefix + name
    value = JSON.stringify(value)
    localStorage.setItem(name, value)
  }

}


let storageHandlerObject = new StorageHandler()


export default storageHandlerObject
