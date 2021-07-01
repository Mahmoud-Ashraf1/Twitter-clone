import navbar from '../components/common/navbar.js'
import newTweet from '../components/new-tweet.js'
import homeFeed from '../components/feed.js'
import sideBar from '../components/common/sidebar.js'
import store from '../store/store.js'
import fakeTweetsService from '../fakeServices/fakeTweetsService.js'

export default function HomePage () {
  const dom = document.createElement('div')
  dom.id = 'HomePage'
  dom.innerHTML = `
	<div id='page-layout'>
		<header id="navbar"></header>
		<main id="main-section">
			<div class="heading">
				<img alt="Mahmoud" width="30px" height="30px" draggable="true" src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png">
				<div>
					<h1>Home</h1>
					<div class="icon color-primary">
						<svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path></g></svg>
					</div>
				</div>
			</div>
			<div class="new-tweet-container"></div>
			<div class="homeFeedContainer" ></div>
		</main>
		<div class="sidebarContainer"></div>
	</div>

	`

  // render sidebar
  dom.querySelector('.sidebarContainer').appendChild(sideBar())

  // This part is responsible for rerender elements
  dom.querySelector('.new-tweet-container').appendChild(newTweet())
  dom.querySelector('#navbar').appendChild(navbar('home'))

  const loadFeed = () => {
    const feedTweets = fakeTweetsService.getHomeFeed()

    dom.querySelector('.homeFeedContainer').innerHTML = ''
    dom.querySelector('.homeFeedContainer').appendChild(homeFeed(feedTweets))
  }

  loadFeed()

  store.subscribe('tweets', loadFeed)

  return dom
}
