const Repair = require('../models/repair.model')

exports.repairsFind = async(req, res) =>{

  const repairs = await Repair.findAll({
    where:{
      status: "pending"
    }
    
  })
  res.json({
    
    results: repairs.length,
    status: "succes",
    message: "Repairs found",
    repairs,
  });
}
exports.repairCreate = async(req, res) =>{
  try {
    const {date, userId} = req.body

  const repair = await Repair.create({
    date, userId
  })
  return res.status(201).json({
    message: "product created",
    repair

  })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status:"fail", 
      message: "Something went wrong"
    })
  }
}
exports.repairFind = async(req, res) =>{
  const {id} = req.params

  const repair = await Repair.findOne({
    where: {
      id,
      status:"pending"
    }
  }) 

  if (!repair){
    return res.status(404).json({
      status:"error",
      message:`The repair with id ${id} not found`
    })
  }

  return res.status(200).json({
    status:"sucess",
    message:"Repair found",
    id,
    repair
  })
}
exports.repairUpdate = async(req, res) =>{
  try{
    const {id} = req.params
    const repairUpdate = await Repair.findOne({
      where:{
        id,
        status: "pending"
      }
    })
    if(!repairUpdate){
        return res.status(404).json({
          status: "error",
          message:`The repair with id ${id} not found`
        })
    }
    await repairUpdate.update({status: "completed"})
    return res.status(200).json({
      status:"succes",
      message:"The repair completed "
    })
  }catch(err){
    console.log(err)
 return res.status(500).json({
  status:"fail",
  message:"Something went wrong"
  
 })
  }
  
}
exports.repairDelete = async (req, res) =>{
    try {
      const {id} = req.params

    const repairDelete = await Repair.findOne({
      where:{
        id,
        status: "pending"
      }
    })

    if(!repairDelete){
      return res.status(404).json({
        status:"error",
        message:`The repair with id ${id} not found`
      })
    }

    await repairDelete.update({status: "cancelled"})
    res.status(200).json({
      status: "succes",
      message: "The user has been delete",
      id,
    });
    } catch (error) {
      return res.status(500).json({
        where:{
          id,
          status:"true"
        }
      })
    }

}
