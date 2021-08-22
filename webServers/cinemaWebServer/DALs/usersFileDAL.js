const js = require('jsonfile')
const usersPath = './DataSources/users.json';

const readUsers = () => {
    return new Promise((resolve, reject) => {
        js.readFile(usersPath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.users);
            }
        })
    })
}
const readUserById = (id) => {
    return new Promise((resolve, reject) => {
        js.readFile(usersPath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                let userById = data.users.filter(user => user.id == id)
                resolve(userById)
            }
        })
    })
}
const addUserFile = async (newUser) => {
    return new Promise((resolve, reject) => {
        js.readFile(usersPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let userToAdd = {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    createdDate: newUser.createdDate,
                    sessionTimeOut: newUser.sessionTimeOut
                }
                let newUsers = [...data.users, userToAdd]
                data.users = newUsers;
                js.writeFile(usersPath, data, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data.users)
                    }
                })
            }
        })
    })


}
const updateUserFile = async (id, updatedUser) => {
    return new Promise((resolve, reject) => {
        js.readFile(usersPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let userToUpdate = {
                    id: updatedUser.id,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    createdDate: updatedUser.createdDate,
                    sessionTimeOut: updatedUser.sessionTimeOut
                }
                let updatedUsers = data.users.map(user => {
                    if (user.id == id) {
                        return userToUpdate
                    } else {
                        return user
                    }
                })
                data.users = updatedUsers;
                js.writeFile(usersPath, data, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("User Updated")
                    }
                })
            }
        })
    }
    )
}
const deleteUserFile = (id) => {
    return new Promise((resolve, reject) => {
        js.readFile(usersPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let index = data.users.findIndex(user => user.id == id);
                if (index) {
                    data.users.splice(index, 1)
                } js.writeFile(usersPath, data, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("User Deleted");
                    }
                })
            }
        })
    })

}
module.exports = { readUsers, readUserById, addUserFile, updateUserFile, deleteUserFile }
