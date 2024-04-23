import { Client, Account, ID } from 'react-native-appwrite'

export const appwriteConfig = {
  endpoints: 'https://cloud.appwrite.io/v1',
  platform: 'con.kingchen.aora',
  projectId: '661ff386066c39fa9043',
  databaseId: '661ff53dba286e6dac84',
  userCollectionId: '661ff5575a7dea043902',
  videoCollectionId: '661ff5751b2dd3d92cd0',
  storageId: '661ff710bb455bbad30d'
}

// Init your react-native SDK
const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoints) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

export const createUser = () => {
  const account = new Account(client)

  // Register User
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe').then(
    function (response) {
      console.log(response)
    },
    function (error) {
      console.log(error)
    }
  )
}
