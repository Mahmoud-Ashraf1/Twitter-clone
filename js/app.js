import HomePage from './pages/home.js'
import ProfilePage from './pages/profile.js'
import tweetPage from './pages/tweetPage.js'
import followingsPage from './pages/followings.js'
import followersPage from './pages/followers.js'

const routes = {
  '#home': HomePage,
  '#user': ProfilePage,
  '#tweet': tweetPage,
  '#followings': followingsPage,
  '#followers': followersPage
}

const routing = () => {
  // [1] => Get url hash
  // [2] => load page based on the hash value

  const hash = window.location.hash

  if (!hash.length) return loadPage(HomePage)

  let pageName = hash
  if (hash.includes('?')) {
    pageName = hash.slice(0, hash.indexOf('?'))
    let props = hash.slice(hash.indexOf('?') + 1)
    loadPage(routes[pageName], props)
    return
  }

  loadPage(routes[pageName])
}
routing()
window.addEventListener('popstate', routing)

// *
function loadPage (page, props) {
  console.log(page)

  document.querySelector('.root').innerHTML = ''
  document.querySelector('.root').appendChild(page(props))
}

export function goToPage (pageName) {
  history.pushState(null, null, `#${pageName}`)
  routing()
}
