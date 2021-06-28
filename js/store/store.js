import mainReducer from './mainReducer.js'

function createStore (reducer) {
  let state = {
    users: {
      MahmoudAshraf: {
        name: 'Mahmoud Ashraf',
        image:
          'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
        coverImage: 'https://source.unsplash.com/random/600x200',
        bio: 'Front end web Developer ',
        followers: new Set(['JavaScript']),
        followings: new Set(['JavaScript', 'OsamaElzero']),
        tweetsIds: new Set([0]),
        likedTweets: new Set([0, 1]),
        isVerified: true
      },
      JavaScript: {
        name: 'JavaScript',
        image:
          'https://pbs.twimg.com/profile_images/827354992377860096/sUe4dG_L_200x200.jpg',
        coverImage:
          'https://pbs.twimg.com/profile_banners/539345368/1517367231/600x200',
        bio: 'Tweets from the Oracle Developer Relations Team @groundbreakers',
        followers: new Set(['MahmoudAshraf']),
        followings: new Set(['OsamaElzero']),
        tweetsIds: new Set([1, 2]),
        likedTweets: new Set([0, 1]),
        isVerified: true
      },
      OsamaElzero: {
        name: 'Osama Elzero',
        image:
          'https://pbs.twimg.com/profile_images/961969993314373632/37fwNOPW_200x200.jpg',
        coverImage:
          'https://pbs.twimg.com/profile_banners/883839043/1475182691/600x200',
        bio: 'Addicted To Programming. #ElzeroWebSchool',
        followers: new Set(['MahmoudAshraf', 'JavaScript']),
        followings: new Set(['MahmoudAshraf']),
        tweetsIds: new Set([3]),
        likedTweets: new Set([0, 1]),
        isVerified: true
      }
    },
    tweets: {
      0: {
        author: 'MahmoudAshraf',
        publishDate: 'Jul 22, 2020',
        text: '<h3 class="text-headings">Welcome to Twitter clone</h3>',
        links: [],
        images: [],
        retweeters: new Set(),
        likers: new Set(['JavaScript,MahmoudAshraf'])
      },
      1: {
        author: 'JavaScript',
        publishDate: 'Jul 22, 2020',
        text: '5 Great JavaScript Frameworks for 2020 -',
        links: ['https://t.co/otyPN0C9PE?amp=1'],
        images: [],
        retweeters: new Set(['MahmoudAshraf']),
        likers: new Set([])
      },
      2: {
        author: 'JavaScript',
        publishDate: 'Jul 22, 2020',
        text: 'Do you really need javascript frameworks ?',
        links: [],
        images: [],
        retweeters: new Set(['OsamaElzero']),
        likers: new Set(['OsamaElzero'])
      },
      3: {
        author: 'OsamaElzero',
        publishDate: 'Oct 22, 2020',
        publishTime: '2:05 am',
        text:
          'ساعد اي شخص ولا تنتظر مقابل فربما يمر الزمان وتقع في محنة ولا يقف بجانبك الا من ساعدته',
        links: [],
        images: [],
        retweeters: new Set(['MahmoudAshraf']),
        likers: new Set(['MahmoudAshraf', 'JavaScript', 'OsamaElzero']),
        direction: 'rtl'
      }
    },
    auth: {
      currentUser: 'MahmoudAshraf'
    }
  }
  let callbacks = {}

  const getState = slice => (slice ? state[slice] : state)

  const dispatch = action => {
    // Get the slice that the action belongs to
    // Pass the action to the reducer
    // Update the slice in the state with the returned value

    const sliceName = action.slice
    state = {
      ...state,
      [sliceName]: reducer(state[sliceName], action)
    }

    console.log(action.slice + '/' + action.type, '=>', state[sliceName])

    // Execute any callback functions related to this slice
    if (callbacks[sliceName]) {
      callbacks[sliceName].forEach(func => {
        func()
      })
    }
  }

  // Add callback function ex.(rerender of an element)
  const subscribe = (sliceName, func) => {
    if (!callbacks[sliceName]) callbacks[sliceName] = []
    callbacks[sliceName].push(func)
  }

  return { getState, dispatch, subscribe }
}

export default createStore(mainReducer)
