<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import RuntimeChart from '$lib/components/RuntimeChart.svelte';
	import { Button } from '$lib/components/ui/button';
	import { kruskalsMST } from '$lib/kruskals';
	import { randomEdges, createGraph, type Edge, type Graph } from 'mst-graphs';
	import { prims } from '$lib/prims';
	import D3Graph from '$lib/components/D3Graph.svelte';

	let numNodes = 9;
	let runtime = 0;
	let mst: Edge[] = [];
	let graph = newGraph(numNodes);

	function newGraph(numNodes: number) {
		let graph = createGraph(numNodes);
		mst = [];
		randomEdges(graph);
		return graph;
	}

	$: {
		graph = newGraph(numNodes);
	}

	$: handleCallKruskals = () => {
		mst = [];
		const startTime = performance.now();
		mst = kruskalsMST(graph);
		const endTime = performance.now();
		runtime = endTime - startTime;
	}

	$: handleCallPrims = () => {
		mst = [];
		// Calculate runtime
		const startTime = performance.now();
		mst = prims(graph);
		console.log(mst)
		const endTime = performance.now();
		runtime = endTime - startTime;
	}

</script>


<div class="min-h-screen flex font-mono">
	<Sidebar />
	<main class="flex-1 ml-64 p-8 bg-gray-100">
		<h1 class="text-2xl font-semibold mb-2">Kruskals vs. Prims</h1>
<!--		<div class="flex flex-wrap gap-2 mt-16">-->
<!--			<div class="bg-slate-200 rounded p-4 text-sm w-full h-[50vh]">-->
<!--				Runtime (s)-->
<!--				<RuntimeChart/>-->
<!--			</div>-->
<!--		</div>-->
		{#key [runtime, numNodes]}
			<p>Nodes: {numNodes}</p>
			<p>Runtime: <span class="text-xs {runtime ? 'text-slate-900' : 'text-slate-500'}">{runtime ? runtime + ' seconds' : 'Choose an algorithm'}</span></p>
		{/key}
		{#key [numNodes, mst, graph]}
			<input type="range" min="9" max="40" step="1" bind:value={numNodes} class="w-24">
			<D3Graph {graph} {mst} />
		{/key}
		<Button class="mt-8" on:click={handleCallKruskals}>Kruskals</Button>
		<Button class="mt-8" on:click={handleCallPrims}>Prims</Button>
	</main>
</div>

