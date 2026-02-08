const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword
}

const checkPassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch;
}
module.exports = {hashPassword, checkPassword};