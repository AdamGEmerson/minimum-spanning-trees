<script lang="ts">
	import { flip } from 'svelte/animate';
	let items: number[] = [];
	let nextItem = 1;
	let isSorting = false;
	let speed = 7;
	let currentlySorting: number[] = []; // Indices of elements being compared
	let finalPositions: number[] = []; // Indices of elements in final position

	for (let i = 0; i < 10; i++) {
		addItem();
	}

	shuffle();

	function addItem() {
		items = [...items, nextItem++];
		finalPositions = [];
	}

	async function sort() {
		if (isSorting) return;
		isSorting = true;
		finalPositions = [];

		let n = items.length;
		for (let i = 0; i < n-1; i++) {
			for (let j = 0; j < n-i-1; j++) {
				// Show which elements we're currently comparing
				currentlySorting = [j, j+1];
				items = [...items]; // Trigger update

				await new Promise(resolve => setTimeout(resolve, 1000 - (100 * speed)));

				if (items[j] > items[j+1]) {
					let temp = items[j];
					items[j] = items[j+1];
					items[j+1] = temp;
					items = [...items];

					await new Promise(resolve => setTimeout(resolve, 1000 - (100 * speed)));
				}
			}
			// Mark the last element in this pass as in its final position
			finalPositions = [...finalPositions, n-i-1];
		}
		// Mark the first element as in its final position
		finalPositions = [...finalPositions, 0];
		currentlySorting = [];
		isSorting = false;
	}

	function shuffle() {
		items.sort(() => Math.random() - 0.5);
		items = items;
		finalPositions = [];
	}
</script>

<div class="flex flex-col gap-4 items-start border rounded p-4 bg-slate-200 max-w-md">
	<h3 class="font-semibold self-start">Animation</h3>
	<div class="flex justify-center gap-2">
		<button
			on:click={sort} class:opacity-50={isSorting} disabled={isSorting}
			class="bg-neutral-900 text-white h-6 text-sm rounded-md px-4"
		>
			Sort
		</button>

		<button
			on:click={shuffle}
			class="bg-neutral-900 text-white h-6 text-sm rounded-md px-4"
		>
			Shuffle
		</button>

<!--		<button-->
<!--			on:click={addItem}-->
<!--			class="bg-neutral-900 text-white h-6 text-sm rounded-md px-4"-->
<!--		>-->
<!--			Add-->
<!--		</button>-->
	</div>

	<!-- Speed Slider -->
	<div class="flex items-center gap-2">
		<label for="speed" class="text-xs">Speed:</label>
		<input type="range" id="speed" min="1" max="10" step="1" bind:value={speed} class="w-24">
	</div>

	<div class="flex flex-row items-end w-full justify-center">
		{#each items as item, i (item)}
			<div
				class="p-4 transition-colors duration-200 border border-neutral-900 text-xs rounded"
				class:bg-yellow-200={currentlySorting.includes(i)}
				class:bg-green-200={finalPositions.includes(i)}
				class:bg-neutral-200={!currentlySorting.includes(i) && !finalPositions.includes(i)}
				class:-translate-y-2={currentlySorting.includes(i)}
				style="height: {32 * item}px; width: 8px;"
				animate:flip
			>
				<span class="flex justify-center items-center h-full">{item}</span>
			</div>
		{/each}
	</div>
</div>