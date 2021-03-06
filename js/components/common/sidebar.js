import searchBar from './searchBar.js'
import friendsSuggestions from './friendsSuggestions.js'
import store from '../../store/store.js'

export default function sidebar () {
  const dom = document.createElement('div')
  dom.innerHTML = `
	<aside id="sidebar">
  <!-- Search bar --> 
  ${searchBar()}
  <!-- People to follow -->
  <div class="friendSuggesstions"></div>
  
  <!-- Copyrights -->
  <div class="copyrights">
  All &copy; rights reserved <br>
  code by <span>Mahmoud</span>
  </div>
	</aside>
	`

  const loadFriendsSuggesstions = () => {
    // TODO: get this data from users service
    const usersnames = [
      'OsamaElzero',
      'MahmoudAshraf',
      'JavaScript',
      'droos_online'
    ]

    //

    dom.querySelector('.friendSuggesstions').innerHTML = ''
    dom
      .querySelector('.friendSuggesstions')
      .appendChild(friendsSuggestions(usersnames))
  }
  loadFriendsSuggesstions()
  store.subscribe('users', loadFriendsSuggesstions)

  return dom
}
