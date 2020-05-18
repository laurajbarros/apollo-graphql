import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const UserList = () => {
  const userQuery = gql`
    {
      users {
        name
        lastName
      }
    }
  `
  return (
    <Query query={userQuery}>
      {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          console.log('error')
          console.log(error)
          return (
            <div>
              We got data
            </div>
          )
        }}
    </Query>
  )
}
export default UserList
