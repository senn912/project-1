const { json } = require("express");
const connection = require('../config/database');
const { postInsertUser, putupdateUser, checkId, deleteUserById, postCheckNickname, postCheckEmail } = require('../services/CRUDServices')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || 'your-secret-key';


const getAllUsers = async (req, res) => {
    const [rows, fields] = await connection.execute('select * from Users');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

const createNewUser = async (req, res) => {
    const { email, fullName, nickName, password } = req.body || {};
    
    console.log("Create New user: ",req.body)
    if (!email || !fullName || !nickName || !password) {
        return res.status(400).json({
            message: 'You need to fill in the form',
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Email format is wrong"
        });
    }

    let [rowsNickname] = await postCheckNickname(nickName);
    if (rowsNickname.length > 0) {
        return res.status(409).json({
            message: 'Nickname has existed'
        })
    }
    let [rowsEmail] = await postCheckEmail(email);
    if (rowsEmail.length > 0) {
        return res.status(409).json({
            message: 'Email has existed'
        })
    }
    await postInsertUser(email, fullName, nickName, password);
    return res.status(201).json({ success: true,
        message: 'Created',
    })

}


const updateUser = async (req, res) => {
    const { email, fullName, password, role } = req.body || {};
    const id = req.params.id
    
    if (!email || !fullName || !password) {
        return res.status(400).json({
            message: 'missing infor',
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Email format is wrong"
        });
    }


    await putupdateUser(id, email, fullName, password, role);
    console.log("Update User : ", req.body)
    res.status(200).json({
        message: 'Updated',
    });
};


const deleteUser = async (req, res) => {
    const id = req.params.id || {};
    if (!id) {
        return res.status(400).json({
            message: 'missing',
        })
    }
    const rows = await checkId(id);

    if (rows.length === 0) {
        return res.status(404).json({
            message: 'ID not found',
        });
    }
    await deleteUserById(id);
    res.status(200).json({
        message: 'Deleted',
    });
}

const loginUser = async (req, res) => {
    const { nickName, password } = req.body || {};

    if (!nickName || !password) {
        return res.status(400).json({
            message: 'Nickname and Password are required'
        })
    }

    let [rows] = await postCheckNickname(nickName);
    if (rows.length > 0) {
        const user = rows[0];
        console.log("check user: ", user)
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign(
                {
                    id: user.id,
                    fullName: user.fullName,
                    nickName: user.nickName,
                    role: user.role
                },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '2h' }
            );

            res.cookie('token', token, {
                httpOnly: true,         
                secure: false,          
                // sameSite: 'Strict',     
                maxAge: 2 * 60 * 60 * 1000,
                path: '/',  
            });

            return res.status(200).json({
                message: 'Login success',
                token: token,
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    nickName: user.nickName,
                    role: user.role
                }
            })
        }
    }


    return res.status(401).json({
        message: 'Nickname or Password are wrong'
    })

}

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,     // để true nếu deploy HTTPS
      sameSite: "Strict",
      path: "/",         // ✅ thêm path
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUserAPI = (req,res) =>{
    try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    loginUser,
    logoutUser,
    getUserAPI,
    


}
