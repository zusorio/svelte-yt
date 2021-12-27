# svelte-yt

A wrapper around the YouTube IFrame API.

Based on [svelte-youtube](https://github.com/PandaWhisperer/svelte-youtube).

# Installation

```
npm install svelte-yt
```

# Usage

```html
<script lang="ts">
	import { YouTube } from 'svelte-yt';

	let videoId = 'M7lc1UVf-VE';
    // Can be used to control full YouTube player
    // See https://developers.google.com/youtube/iframe_api_reference#Functions
	let player;

    // See https://developers.google.com/youtube/player_parameters#Parameters
	const options = {
		playerVars: {
			modestbranding: 1
		}
	};
</script>

<YouTube bind:player on:play={(e) => console.log(e)} {videoId} {options} />
<button on:click={() => player.playVideo()}>Play</button>
```
