<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import RuntimeChart from '$lib/components/RuntimeChart.svelte';
	import { Button } from '$lib/components/ui/button';
	import { callKruskalsMST } from '$lib/kruskals';
	import { randomVertices, createGraph, type Edge, type Graph } from 'mst-graphs';

	let numNodes = 9;
	let mst: Edge[] = [];
	let graph: Graph = createGraph(numNodes);
	randomVertices(graph)

	$: {
		graph = createGraph(numNodes);
	}

	$: handleCallKruskals = () => {
		mst = callKruskalsMST(graph);
	}

</script>


<div class="min-h-screen flex font-mono">
	<Sidebar />

	<main class="flex-1 ml-64 p-8 bg-gray-100">
		<h1 class="text-2xl font-semibold mb-2">Kruskals vs. Prims</h1>
		<p class="text-gray-600 mb-4 text-sm max-w-prose">
			Kruskal's algorithm is a minimum-spanning-tree algorithm which finds an edge of the least possible weight that connects any two trees in the forest.
			It is a greedy algorithm in graph theory as it finds a minimum spanning tree for a connected weighted graph adding increasing cost arcs at each step.
		</p>
		<div class="flex flex-wrap gap-2 mt-16">
			<!--{#key [numNodes, mst, graph]}-->
			<!--	<input type="range" min="1" max="20" step="1" bind:value={numNodes} class="w-24">-->
			<!--	<KruskalsGraph {graph} {mst} />-->
			<!--{/key}-->
			<div class="bg-slate-200 rounded p-4 text-sm w-full h-[50vh]">
			  Runtime (s)
				<RuntimeChart/>
			</div>
		</div>
		<Button class="mt-8" on:click={handleCallKruskals}>Call Kruskals</Button>
	</main>
</div>

