class Task{
    constructor(description, completed){
        this.description = description
        this.completed = completed
    }
    toggle(){
        if(this.completed === false){
            this.completed === true
        }
        else{
            this.completed === false
        }
    }
}