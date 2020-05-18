module.exports = {
    Query: {
        users: async (_, __, { dataSources }) => {
          const users = await dataSources.UserAPI.getAllUsers();
          return users
        },
        getUserById: async (_, {_id}, {dataSources}) => {
          const user = await dataSources.UserAPI.getUserById({_id})
          if(!user){
            return {
              success: false,
              message: "Problems fetching User",
            }
          }
          return {
            success: true,
            message: "User found with Success",
            users:[user]
          }
        }
    },
    Mutation: {
      createUser: async(_, { user }, { dataSources }) => {
        const createdUser = await dataSources.UserAPI.createNewUser({ user });
        if(!createdUser){
          return {
            success: false,
            message: "There was a problem creating the User",
          }
        } else {
          return {
            success: true,
            message: "User created with Sucess",
            users:[createdUser]
          }
        }
      },
      deleteUser: async(_, {_id}, { dataSources }) => {
        const user = await dataSources.UserAPI.deleteUser({_id});
        if(!user){
          return {
            success: false,
            message: "There was a problem deleting the User",
          }
        } else {
          return {
            success: true,
            message: "User deleted with Sucess",
          }
        }
      },
      updateUser: async(_, {_id, user}, { dataSources }) => {
        const newUser = JSON.parse(JSON.stringify(user));
        const updatedUser = await dataSources.UserAPI.updateUser({_id, newUser});

        if(!updatedUser){
          return {
            success: false,
            message: "There was a problem updating the User",
          }
        } else {
          return {
            success: true,
            message: "User updated with Sucess",
            users: [updatedUser]
          }
        }
      },
      updateProfile: async(_, {_id, profile}, { dataSources }) => {
        const newProfile = JSON.parse(JSON.stringify(profile));
        const updatedUser = await dataSources.UserAPI.updateProfile({_id, newProfile});
        if(!updatedUser){
          return {
            success: false,
            message: "There was a problem updating the Profile",
          }
        } else {
          return {
            success: true,
            message: "User updated with Sucess",
            users: [updatedUser]
          }
        }
      },
      deleteProfile: async(_, {_id}, { dataSources }) => {
        const updatedUser = await dataSources.UserAPI.deleteProfile({_id});
        if(!updatedUser){
          return {
            success: false,
            message: "There was a problem deleting the Profile",
          }
        } else {
          return {
            success: true,
            message: "Profile deleted with Sucess",
            users: [updatedUser]
          }
        }
      },
      deleteFieldProfile: async(_, {_id, field}, { dataSources }) => {
        const updatedUser = await dataSources.UserAPI.deleteFieldProfile({_id, field});
        if(!updatedUser){
          return {
            success: false,
            message: "There was a problem deleting this Field",
          }
        } else {
          return {
            success: true,
            message: "Field deleted with Sucess",
            users: [updatedUser]
          }
        }
      },
      createJobApplication: async(_, {_id, application}, { dataSources }) => {
        const newApplication = JSON.parse(JSON.stringify(application));
        await dataSources.UserAPI.createNewAppplication({_id, newApplication});
        const newProfile = newApplication.application
        await dataSources.UserAPI.updateProfile({_id, newProfile})
        const updatedUserAndApplication = await dataSources.UserAPI.getUserById({_id})
        if(!updatedUserAndApplication){
          return {
            success: false,
            message: "There was a problem creating Job Application",
          }
        } else {
          return {
            success: true,
            message: "Job Application created with sucess",
            users: [updatedUserAndApplication]
          }
        }
      },
    }
};
