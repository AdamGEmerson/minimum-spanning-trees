<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import RuntimeChart from '$lib/components/RuntimeChart.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { Graph, Vertex, Edge } from '$lib/kruskals';
	import { callPrimsMST } from '$lib/prims';

	function shuffle<T>(array: T[]): T[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function generateConnectedGraph(n: number): Graph {
		// Create an array of nodes
		const nodes: Vertex[] = Array.from({ length: n }, (_, i) => ({ parent: i, rank: 0, key: i}));

		// Shuffle the nodes to create random connections
		const shuffledNodes = shuffle(nodes);

		// Create the edges
		const edges: Edge[] = [];
		for (let i = 0; i < n - 1; i++) {
			const src = shuffledNodes[i];
			const dest = shuffledNodes[i + 1];
			const weight = Math.floor(Math.random() * 20) + 1; // Random weight between 1 and 20
			edges.push({ src: src.parent, dest: dest.parent, weight });
		}

		// Connect the last node to the first node
		const lastNode = shuffledNodes[n - 1];
		const firstNode = shuffledNodes[0];
		const weight = Math.floor(Math.random() * 20) + 1; // Random weight between 1 and 20
		edges.push({ src: lastNode.parent, dest: firstNode.parent, weight });

		// Add additional random edges
		const existingEdges = new Set(edges.map(edge => `${edge.src}-${edge.dest}`));
		const numAdditionalEdges = Math.floor(Math.random() * (n - 1)) + 1; // Random number of additional edges
		for (let i = 0; i < numAdditionalEdges; i++) {
			let src = Math.floor(Math.random() * n);
			let dest = Math.floor(Math.random() * n);
			while (src === dest || existingEdges.has(`${Math.min(src, dest)}-${Math.max(src, dest)}`)) {
				src = Math.floor(Math.random() * n);
				dest = Math.floor(Math.random() * n);
			}
			const weight = Math.floor(Math.random() * 20) + 1; // Random weight between 1 and 20
			edges.push({ src, dest, weight });
			existingEdges.add(`${Math.min(src, dest)}-${Math.max(src, dest)}`);
		}

		return {
			V: n,
			E: edges.length,
			edges,
			vertices: nodes,
		};
	}

	let numNodes = 9;

	let mst: Vertex[] = [];
	let graph: Graph = generateConnectedGraph(numNodes);

	$: {
		graph = generateConnectedGraph(numNodes);
	}

	$: handleCallPrims = () => {
		console.log("Old MST: ", mst)
		mst = callPrimsMST(graph);
		console.log("New MST: ", mst);
	}

</script>


<div class="min-h-screen flex font-mono">
	<Sidebar />

	<main class="flex-1 ml-64 p-8 bg-gray-100">
		<h1 class="text-2xl font-semibold mb-2">Prims</h1>
		<p class="mb-2 text-sm">Average Runtime: </p>
		<p class="text-gray-600 mb-4 text-sm max-w-prose">
			Prims algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.
		</p>
		<div class="flex flex-wrap gap-2 mt-16">
			{#key [numNodes, mst, graph]}
				<input type="range" min="1" max="20" step="1" bind:value={numNodes} class="w-24">
<!--				<KruskalsGraph {graph} {mst} />-->
			{/key}
			<div class="bg-slate-200 rounded p-4 text-sm">
			  Runtime: O(n log n)
				<RuntimeChart/>
			</div>
		</div>
		<Button class="mt-8" on:click={handleCallPrims}>Run Prims</Button>
	</main>
</div>

