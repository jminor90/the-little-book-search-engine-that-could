const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
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
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    //login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    //saveBook
    saveBook: async (parent, args, context) => {
      //findOneAndUpdate
      if (context.user) {
        return Book.findOneAndUpdate(
          {}
        )
      }
    },

    //deleteBook
    removeBook: async (parent, args, context) => {
      //findOneAndDelete
    }


  }
}

module.exports = resolvers;