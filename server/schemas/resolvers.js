const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  
  
  Query: {
    //getSingleUser
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id}).populate('books')
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
  
  Mutation: {
    //createUser

    //login

    //saveBook

    //deleteBook


  }
}

module.exports = resolvers;