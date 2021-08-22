const js = require('jsonfile')
const premissionsPath = './DataSources/premissions.json';


const readPremissions = () => {
    return new Promise((resolve, reject) => {
        js.readFile(premissionsPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.premissions);
            }
        })
    })
}
const readPremissionById = (id) => {
    return new Promise((resolve, reject) => {
        js.readFile(premissionsPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let userById = data.premissions.filter(user => user.id == id);
                resolve(userById)
            }
        })
    })
}
const addPremissionFile = async (newPremission) => {
    return new Promise((resolve, reject) => {
        js.readFile(premissionsPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let permissionToAdd = {
                    id: newPremission.id,
                    premissions: newPremission.premissions
                }
                let newPremissions = [...data.premissions, permissionToAdd]
                data.premissions = newPremissions
                js.writeFile(premissionsPath, data, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data.premissions)
                    }
                })
            }
        })
    })

}


const updatePremissionFile = async (id, updatedPremission) => {
    return new Promise((resolve, reject) => {
        js.readFile(premissionsPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let premissionToUpdate = {
                    id: updatedPremission.id,
                    premissions: updatedPremission.premissions
                }
                let updatedPremissions = data.premissions.map(premission => {
                    if (premission.id == id) {
                        return premissionToUpdate;
                    } else {
                        return premission
                    }
                })
                data.premissions = updatedPremissions;
                js.writeFile(premissionsPath, data, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("Premission Updated")
                    }
                })
            }
        })
    })
}
const deletePremissionFile = (id) => {
    return new Promise((resolve, reject) => {
        js.readFile(premissionsPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let index = data.premissions.findIndex(prem => prem.id == id);
                if (index) {
                    data.premissions.splice(index, 1)
                } js.writeFile(premissionsPath, data, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("Premission Deleted")
                    }
                })
            }
        })
    })
}
module.exports = { readPremissions, readPremissionById, addPremissionFile, updatePremissionFile, deletePremissionFile }