<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import YoutubePlayer from 'youtube-player';
	import type { Options, YouTubePlayer } from 'youtube-player/dist/types';
	import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

	export let videoId: string; // Youtube video ID (required)
	export let options: Options = {}; // YouTube player options (optional)
	export let player: YouTubePlayer = undefined; // player API instance

	let playerElem: HTMLElement; // player DOM element reference

	const dispatch = createEventDispatcher<{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ready: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		error: any;
		stateChange: { data: PlayerStates };
		end: { data: PlayerStates };
		play: { data: PlayerStates };
		pause: { data: PlayerStates };
		playbackRateChange: { data: number };
		playbackQualityChange: { data: string };
	}>();

	// Create and tear down player as component mounts or unmounts
	onMount(() => createPlayer());

	// Update videoId and load new video if URL changes
	$: play(videoId);

	function createPlayer(): () => void {
		player = YoutubePlayer(playerElem, options);

		// Register event handlers
		player.on('ready', (e: CustomEvent) => {
			dispatch('ready', e);
			// Start playing
			play(videoId);
		});
		player.on('error', (e: CustomEvent) => {
			dispatch('error', e);
		});
		player.on('stateChange', (e: CustomEvent & { data: PlayerStates }) => {
			dispatch('stateChange', e);

			switch (e.data) {
				case PlayerStates.ENDED:
					dispatch('end', e);
					break;

				case PlayerStates.PLAYING:
					dispatch('play', e);
					break;

				case PlayerStates.PAUSED:
					dispatch('pause', e);
					break;
			}
		});
		player.on('playbackRateChange', (e: CustomEvent & { data: number }) => {
			dispatch('playbackRateChange', e);
		});
		player.on('playbackQualityChange', (e: CustomEvent & { data: string }) => {
			dispatch('playbackQualityChange', e);
		});

		// Tear down player when done
		return () => player.destroy();
	}

	function play(videoId: string) {
		// this is needed because the loadVideoById function always starts playing,
		// even if you have set autoplay to 1 whereas the cueVideoById function
		// never starts autoplaying
		if (player && videoId) {
			if (options && options.playerVars && options.playerVars.autoplay === 1) {
				player.loadVideoById(videoId);
			} else {
				player.cueVideoById(videoId);
			}
		}
	}
</script>

<div bind:this={playerElem} />
