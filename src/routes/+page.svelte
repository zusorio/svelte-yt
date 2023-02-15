<script lang="ts">
	import { YouTube } from 'svelte-yt';
	import type { Options, YouTubePlayer } from 'youtube-player/dist/types';

	let videoId = 'M7lc1UVf-VE';
	let player: YouTubePlayer;

	const options: Options = {
		playerVars: {
			modestbranding: 1
		}
	};
</script>

<main>
	<h1>svelte-yt</h1>
	<p>Embedding a single video:</p>
	<YouTube bind:player on:play={(e) => console.log(e)} {videoId} {options} />
	<button on:click={() => player.playVideo()}>Play</button>
</main>
