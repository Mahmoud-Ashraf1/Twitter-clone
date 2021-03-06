import authService from '../fakeServices/fakeAuthService.js'
import store from './store.js'

export default (tweets, action) => {
  // Copying the state to another variable to avoid direct mutation
  let updatedTweets = { ...tweets }

  // * Creating a tweet
  if (action.type === 'createTweet') {
    // Get last tweet id
    let newTweetId = Object.keys(tweets)[Object.keys(tweets).length - 1] + 1

    // get tweet data from the action
    let { text, images } = action.payload
    let author = authService.getCurrentUser()

    // Get and format publish date
    let publishDate = getFormattedDate()

    // Update the tweets List
    updatedTweets[newTweetId] = {
      author,
      text,
      images: images || [],
      publishDate,
      likers: new Set(),
      retweeters: new Set()
    }

    // add the tweet to the user's tweets list
    store.dispatch({
      slice: 'users',
      type: 'addTweet',
      payload: { tweetId: newTweetId }
    })
  }

  // * Like a tweet
  else if (action.type === 'likeTweet') {
    const { tweetId } = action.payload

    // get current logged in user id
    const currentUser = authService.getCurrentUser()

    updatedTweets[tweetId].likers.add(currentUser)
  }

  // * Unlike a tweet *
  else if (action.type === 'unlikeTweet') {
    const { tweetId } = action.payload

    // get current logged in user id
    const currentUser = authService.getCurrentUser()

    updatedTweets[tweetId].likers.delete(currentUser)
  }

  return updatedTweets
}

function getFormattedDate () {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  let publishDate = new Date()
  publishDate = `${
    monthNames[publishDate.getMonth()]
  } ${publishDate.getDate()} ${publishDate.getFullYear()}`
  return publishDate
}
