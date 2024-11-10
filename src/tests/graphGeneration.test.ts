import { expect, test, describe, beforeEach } from 'vitest';
import { addEdge, randomEdges, createGraph } from 'mst-graphs';
import { kruskalsMST } from '$lib/kruskals';
import { callPrimsMST } from '$lib/prims';


let graph;
let mst;
describe('Graph Generation', () => {
	beforeEach(() => {
		// Reset the graph before each test
		graph = null;
	});

	test('Generate a graph with the specified (9) number of nodes', () => {
		graph = createGraph(9);
		expect(graph.vertices.length).toBe(9);
		expect(graph.V).toBe(9);
	});

	test('Graph contains no edges', () => {
		graph = createGraph(9);
		// No edges should be added yet
		expect(graph.edges.length).toBe(0);
	});

	test('Add an edge to the graph, verify keys', () => {
		graph = createGraph(9)
		addEdge(graph, 0, 1, 4);
		expect(graph.edges.length).toBe(1);
		expect(graph.edges[0].src).toBe(0);
		expect(graph.edges[0].dest).toBe(1);
		expect(graph.edges[0].weight).toBe(4);
	});

	test('Connect vertices.', () => {
		graph = createGraph(9);
		randomEdges(graph);
		expect(graph.edges.length).gt(0);
		expect(graph.edges.length).lte(graph.V * 2) // Cycle graph plus random edges between 1 and n
	})

	test('No duplicate edges in graph.', () => {
		graph = createGraph(9);
		randomEdges(graph);
		const edgeSet = new Set();
		graph.edges.forEach(edge => {
			const edgeKey = `${edge.src}-${edge.dest}`;
			edgeSet.add(edgeKey);
		});
		expect(edgeSet.size).toBe(graph.edges.length)
	})
})

describe('Kruskal\'s MST Algorithm', () => {
	beforeEach(() => {
		graph = null
		mst = null
	})

	test('Number of edges is n-1', () => {
		graph = createGraph(12)
		randomEdges(graph)
		mst = kruskalsMST(graph)
		expect(mst.length).toBe(graph.V - 1)
	})

	test('Single Node', () => {
		graph = createGraph(1)
		randomEdges(graph)
		mst = kruskalsMST(graph)
		expect(mst.length).toBe(0)
	})

	test('Two Nodes', () => {
		graph = createGraph(2)
		console.log(graph)
		addEdge(graph, 0, 1, 4)
		mst = kruskalsMST(graph)
		console.log(mst)
		expect(mst.length).toBe(1)
		expect(mst[0].src).toBe(0)
		expect(mst[0].dest).toBe(1)
		expect(mst[0].weight).toBe(4)
	})

	test('Triangle Graph', () => {
		graph = createGraph(3)
		addEdge(graph, 0, 1, 4)
		addEdge(graph, 1, 2, 5)
		addEdge(graph, 0, 2, 6)
		mst = kruskalsMST(graph)
		// The two smallest edges should be in the MST
		expect(mst.length).toBe(2)
		expect(mst[0].src).toBe(0)
		expect(mst[0].dest).toBe(1)
		expect(mst[0].weight).toBe(4)
		expect(mst[1].src).toBe(1)
		expect(mst[1].dest).toBe(2)
		expect(mst[1].weight).toBe(5)
	})

})

describe('Prims\'s MST Algorithm', () => {

	beforeEach(() => {
		graph = null
		mst = null
	})

	test('Number of edges is n-1', () => {
		graph = createGraph(12)
		randomEdges(graph)
		mst = callPrimsMST(graph)
		expect(mst.length).toBe(graph.V - 1)
	})

	test('Single Node', () => {
		graph = createGraph(1)
		randomEdges(graph)
		mst = callPrimsMST(graph)
		expect(mst.length).toBe(0)
	})

	test('Two Nodes', () => {
		graph = createGraph(2)
		addEdge(graph, 0, 1, 4)
		mst = callPrimsMST(graph)
		expect(mst.length).toBe(1)
		expect(mst[0].src).toBe(0)
		expect(mst[0].dest).toBe(1)
		expect(mst[0].weight).toBe(4)
	})

	test('Triangle Graph', () => {
		graph = createGraph(3)
		addEdge(graph, 0, 1, 4)
		addEdge(graph, 1, 2, 5)
		addEdge(graph, 0, 2, 6)
		mst = callPrimsMST(graph)

		// The two smallest edges should be in the MST
		expect(mst.length).toBe(2)
		expect(mst[0].src).toBe(0)
		expect(mst[0].dest).toBe(1)
		expect(mst[0].weight).toBe(4)
		expect(mst[1].src).toBe(1)
		expect(mst[1].dest).toBe(2)
		expect(mst[1].weight).toBe(5)
	})
})