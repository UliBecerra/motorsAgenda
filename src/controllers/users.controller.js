const User = require("../models/user.model");

exports.findUsers = async (req, res) => {

  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  res.json({
    
    results: users.length,
    status: "succes",
    message: "users found",
    users,
  });
};

exports.createUser = async (req, res) => {
 try { 
  const { name, email, password, role } = req.body;
const validEmail = await User.findOne({
  where:{
    email
  }
})

if(validEmail){
  return res.status(300).json({
    status: "error",
    message: "User email already exists"
  })
}
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return res.status(201).json({
    message: "The user created",
    user
  })
 } catch (error) {
  console.log(error)
  return res.status(500).json({
    status: "fail",
    message:"Something went very wrong! U"
  })
 }
};

exports.findUser = async (req, res) =>{
  try {
    const {id} = req.params

  const user = await User.findOne({
    where:{
      id,
      status: true
    }
  })
  if(!user){
    return res.status(404).json({
      status:"error",
      message: `The user with id ${id} not found`
    })
  }
  return res.json({
    status: "succes",
    message: "the user find",
    id,   
    user
  })
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: "Something went wrong"
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const userUpdate = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!userUpdate) {
      return res.status(404).json({
        status: "error",
        message: `User with id ${id} not found`,
      });
    }
    await userUpdate.update({ name, email });

    res.status(200).json({
      status: "succes",
      message: "User has been updadte",
      id,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!userDelete) {
      return res.status(400).json({
        status: "error",
        message: `the user with ${id} not found `,
      });
    }

    await userDelete.update({ status: false });

    res.status(200).json({
      status: "succes",
      message: "The user has been delete",
      id,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};
