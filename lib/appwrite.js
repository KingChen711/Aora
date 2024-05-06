import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite'

export const appwriteConfig = {
  endpoints: 'https://cloud.appwrite.io/v1',
  platform: 'com.kingchen.aora',
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

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl
      }
    )

    return newUser
  } catch (error) {
    console.log('Error: CreateUser')
    throw new Error(error)
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password)

    return session
  } catch (error) {
    console.log('Error: SignIn')
    throw new Error(error)
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get()

    return currentAccount
  } catch (error) {
    throw new Error(error)
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount()
    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
      Query.equal('accountId', currentAccount.$id)
    ])

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.log('Error: GetCurrentUser')
    console.log(error)
    return null
  }
}
