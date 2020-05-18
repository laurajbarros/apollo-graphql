const apiResponses = require('./helpers/apiResponses');

module.exports = {
    Query: {
        users: async (_, __, { dataSources }) => {
          const users = await dataSources.UserAPI.getAllUsers();
          return users
        },
        user: async (_, {_id}, {dataSources}) => {
          const user = await dataSources.UserAPI.getUserById({_id})
          if(!user){
            return []
          }
          return user
        }
    },
    Mutation: {
      createUser: async(_, { user }, { dataSources }) => {
        const createdUser = await dataSources.UserAPI.createNewUser({ user });
        if(!createdUser){
          return apiResponses.ErrorResponse(false,"There was a problem creating the User")
        } else {
          return apiResponses.successResponseWithData(true,"User created with Sucess", [createdUser])
        }
      },
      deleteUser: async(_, {_id}, { dataSources }) => {
        const user = await dataSources.UserAPI.deleteUser({_id});
        if(!user){
          return apiResponses.ErrorResponse(false,"There was a problem deleting the User")
        } else {
          return apiResponses.successResponseWithoutData(true,"User deleted with Sucess")
        }
      },
      updateUser: async(_, {_id, user}, { dataSources }) => {
        const newUser = JSON.parse(JSON.stringify(user));
        const updatedUser = await dataSources.UserAPI.updateUser({_id, newUser});
        if(!updatedUser){
          return apiResponses.ErrorResponse(false,"There was a problem updating the User")
        } else {
          return apiResponses.successResponseWithData(true,"User updated with Sucess", [updatedUser])
        }
      },
      updateProfile: async(_, {_id, profile}, { dataSources }) => {
        const newProfile = JSON.parse(JSON.stringify(profile));
        const updatedUser = await dataSources.UserAPI.updateProfile({_id, newProfile});
        if(!updatedUser){
          return apiResponses.ErrorResponse(false,"There was a problem updating the Profile")
        } else {
          return apiResponses.successResponseWithData(true,"Profile updated with Sucess", [updatedUser])
        }
      },
      deleteProfile: async(_, {_id}, { dataSources }) => {
        const updatedUser = await dataSources.UserAPI.deleteProfile({_id});
        if(!updatedUser){
          return apiResponses.ErrorResponse(false,"There was a problem deleting the Profile")
        } else {
          return apiResponses.successResponseWithData(true,"Profile deleted with Sucess", [updatedUser])
        }
      },
      deleteFieldProfile: async(_, {_id, field}, { dataSources }) => {
        const updatedUser = await dataSources.UserAPI.deleteFieldProfile({_id, field});
        if(!updatedUser){
          return apiResponses.ErrorResponse(false,"There was a problem deleting this Field")
        } else {
          return apiResponses.successResponseWithData(true,"Field deleted with Sucess", [updatedUser])
        }
      },
      createJobApplication: async(_, {_id, application}, { dataSources }) => {
        const newApplication = JSON.parse(JSON.stringify(application));
        await dataSources.UserAPI.createNewAppplication({_id, newApplication});
        const newProfile = newApplication.application
        await dataSources.UserAPI.updateProfile({_id, newProfile})
        const updatedUserAndApplication = await dataSources.UserAPI.getUserById({_id})
        if(!updatedUserAndApplication){
          return apiResponses.ErrorResponse(false,"There was a problem creating the Job Application")
        } else {
          return apiResponses.successResponseWithData(true,"Job Application created with sucess", [updatedUserAndApplication])
        }
      },
    }
};
