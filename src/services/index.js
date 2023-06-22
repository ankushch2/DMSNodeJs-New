exports.generateCrudMethods= Model=>{
    return{
        getAll:()=>Model.find(),
        getById:id=>Model.findById(id),
        create:record=>Model.create(record),
        delete:record=>Model.remove(record),
        update:record=>Model.update(record),

    }
}