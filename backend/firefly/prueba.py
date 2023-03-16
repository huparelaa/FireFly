import pymongo



client = pymongo.MongoClient("mongodb+srv://julianv12:Julian.12@cluster0.pbec261.mongodb.net/test")
db = client["sampleApptest"]
users_collection = db["accounts_useraccount"]

# Verificar la estructura de la colección
print(users_collection.find_one())
# Agregar el campo "preferences" a la estructura de la colección
# users_collection.update_many({}, {"$set": {"preferences": []}})