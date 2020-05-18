const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor({User}) {
    super();
    this.User = User;
  }

  async getAllUsers() {
    const result = await this.User.find({});
    return result
  }
  async getUserById({_id}) {
    const result = await this.User.findById({_id:_id});
    return result
  }
  async deleteUser({_id}) {
    const result = await this.User.findOneAndRemove({_id:_id});
    return result
  }
  async deleteProfile({_id}) {
    const result = await this.User.updateOne({_id:_id}, {$set:{profile:[]}});
    const updatedUser = await this.User.findById({_id:_id});
    return updatedUser
  }

  async deleteFieldProfile({_id, field}) {
    const result = await this.User.findById({_id:_id});
    const filter = result.profile.filter(item => item.field !== field)
    await this.User.updateOne({_id:_id},{
      $set: { profile: filter}
    })
    const updatedUser = await this.User.findById({_id:_id});
    return updatedUser
  }


  async createNewUser({user}) {
    const newUser = {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      profile: user.profile
    }
    const res = await this.User.create(newUser)
    return res
  }

  async createNewAppplication({_id, newApplication}) {
    await this.User.updateOne({_id:_id},{
      $push:{ jobapplication: newApplication }
    })
    const result = await this.User.findById({_id:_id});
    return result
  }

  compareUserInfo(current, newProfile) {
    const currentDic = {}
    current.forEach(item => {
      currentDic[item.field] = item.value
    })
    const newDic = {}
    newProfile.forEach(item => {
      newDic[item.field] = item.value
    })
    Object.keys(newDic).forEach(k => {
        currentDic[k] = newDic[k]
    })
    let res = [];
    Object.keys(currentDic).forEach(key => {
      let newObj = {};
      newObj["field"] = key
      newObj["value"] = currentDic[key]
      res.push(newObj)
    })
    return res
  }


  async updateProfile({ _id, newProfile}) {
    const currentUser = await this.User.findById({_id:_id});
    const profile = JSON.parse(JSON.stringify(currentUser.profile));
    const updatedProfile = this.compareUserInfo(profile, newProfile);
    await this.User.updateOne({_id:_id},{
      $set: { profile: updatedProfile}
    })
    const updatedUser = await this.User.findById({_id:_id});
    return updatedUser
  }

  async updateUser({ _id, newUser}) {
    const { name, lastName, email} = newUser;
    await this.User.updateOne({_id:_id},{
      $set: { name: name, lastName: lastName, email: email}
    })
    const updatedUser = await this.User.findById({_id:_id});
    return updatedUser
  }
}

module.exports = UserAPI;
