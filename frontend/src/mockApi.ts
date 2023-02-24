const LOCAL_STORAGE_KEY = 'user'

export const getUser = (profileId: number) => {

  const users = [{
    "_id": "2cb3baaa7528a9bb5e2c20d9",
    "createdAt": 1669314103470,
    "updatedAt": null,
    "email": "Reymundo.Harvey@hotmail.com",
    "cohort": "web+16",
    "name": "Mr. Daniel Anderson",
    "photo": "https://i.pravatar.cc/300",
    "role": "student"
  },
  {
    "_id": "a18ca3c1e13dd93ddded5bbc",
    "createdAt": 1647633379631,
    "updatedAt": null,
    "email": "Caden5@yahoo.com",
    "cohort": "web+16",
    "name": "Shari Kassulke DDS",
    "photo": "https://i.pravatar.cc/300",
    "role": "student"
  },
  {
    "_id": "418ca3c1e13dd93ddded5bb4",
    "createdAt": 1687633379631,
    "updatedAt": null,
    "email": "example@hotmail.com",
    "cohort": null,
    "name": null,
    "photo": null,
    "role": "curator"
  }]

  localStorage.setItem(LOCAL_STORAGE_KEY, profileId.toString())
  return users[profileId];
}

export const reset = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
  return null;
}