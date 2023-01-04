import mongoose from "mongoose";

mongoose.connect("mongodb+srv://root:6040@cluster0.yu1rqqd.mongodb.net/alura-node")

const db = mongoose.connection

export default db
