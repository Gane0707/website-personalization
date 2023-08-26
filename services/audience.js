const dbconnection = require('../commonUtils/dbConnections')
async function getAudience(req,res){
    let audienceList = await getList(req.body.id)
   res.send(audienceList)
   
}
async function saveAudience(req,res){
    let saveAudience = await saveListAudience(req.body.id);
    res.send({status:200,result:"success"})

}
async function getList(id, projection={}) {
	const db = await dbconnection.websightsConnection();
	return await db.collection("audience").findOne(
		{
			_id: "12"
		}, {projection: projection}
	);
}
async function saveListAudience(id, projection={}) {
	const db = await dbconnection.websightsConnection();
	return await db.collection("audience").insertOne(
		{
			_id: id,
            audience:[]
		}
	);
}

module.exports = {
    getAudience,
    saveAudience
}
