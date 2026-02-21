import bcrypt from "bcrypt"

const hashed = await bcrypt.hash("@Vikas8877", 10)
console.log(hashed)