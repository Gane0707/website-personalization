const stores = require('../store/store');
const visitor = require('../config/visitor')
async function getAudience(req,res){
    let audienceList = await stores.getList()
    res.send(audienceList)
   
}
async function saveAudience(req,res){

	let id = req.body.id;
    let query = {
        employeeRange:req.body.employeeRange,
    }
    let saveAudience = await stores.saveListAudience(id,query);
    res.send({status:200,data:[]})

}
async function personalisation(req,res){

    let id = req.query.id;
    let audienceList = await stores.getList();
    // let audienceList = [
    //     {
    //         "id": 1,
    //         "name": "Audience1",
    //         "employeeRange":5000,
    //         "experiences": [
    //             {
    //                 "name": "Header",
    //                 "value": "dark-header"
    //             },
    //             {
    //                 "name": "Category",
    //                 "value": "education"
    //             },
    //             {
    //                 "name": "cta-text",
    //                 "value": "Continue"
    //             }
    //         ]
    //     }
    // ]

    
    let result = visitor.find(item => item.id ===id);
    let audienceRUle =  audienceList.find((list => list.employeeRange ===result.employeeRange));

    if(audienceRUle){
        res.send({status:200,data:audienceRUle})
    }
    else{
        res.send({status:200,data:[]})
    }
    res.send(result)

}



module.exports = {
    getAudience,
    saveAudience,
	personalisation
}
