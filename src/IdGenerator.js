let instance;

class IdGenerator {


  constructor(){
      if(instance) instance = this
      else this.init()

      return instance;
    }

  init(){
    this.idList = {}
    this.counter = 1
  }

  generateId(){
    let id = this.counter
    this.counter++
    return id
  }

  assignId(id, object){
    this.idList[id] = object
  }

  generateAndAssignId(object){
    let id = this.generateId()
    this.assignId(id, object)
    return id
  }

}


export default new IdGenerator();
