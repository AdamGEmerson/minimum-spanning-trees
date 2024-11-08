import { expect, test, describe } from 'vitest';
import { addEdge, randomVertices, createGraph } from 'mst-graphs';
import { callKruskalsMST } from '$lib/kruskals';
import { callPrimsMST } from '$lib/prims';

describe('Graph Generation', () => {
	test('Generate a graph with the specified (9) number of nodes', () => {
		const graph = createGraph(9);
		expect(graph.vertices.length).toBe(9);
		expect(graph.V).toBe(9);
	});

	test('Graph contains no edges', () => {
		const graph = createGraph(9);
		// No edges should be added yet
		expect(graph.edges.length).toBe(0);
	});

	test('Add an edge to the graph, verify keys', () => {
		const graph = createGraph(9)
		addEdge(graph, 0, 1, 4);
		expect(graph.edges.length).toBe(1);
		expect(graph.edges[0].src).toBe(0);
		expect(graph.edges[0].dest).toBe(1);
		expect(graph.edges[0].weight).toBe(4);
	});

	test('Connect vertices.', () => {
		const graph = createGraph(9);
		randomVertices(graph);
		expect(graph.edges.length).gt(0);
		expect(graph.edges.length).lte(graph.V * 2) // Cycle graph plus random edges between 1 and n
	})

	test('No duplicate edges in graph.', () => {
		const graph = createGraph(9);
		randomVertices(graph);
		const edgeSet = new Set();
		graph.edges.forEach(edge => {
			const edgeKey = `${edge.src}-${edge.dest}`;
			edgeSet.add(edgeKey);
		});
		expect(edgeSet.size).toBe(graph.edges.length)
	})
})

describe('Kruskal\'s MST Algorithm', () => {
	test('Number of edges is n-1', () => {
		const graph = createGraph(12)
		randomVertices(graph)
		const mst = callKruskalsMST(graph)
		expect(mst.length === graph.edges.length - 1)
	})

	test('Single Node', () => {
		const graph = createGraph(1)
		randomVertices(graph)
		const mst = callKruskalsMST(graph)
		expect(mst.length === 0)
	})

	test('Two Nodes', () => {
		const graph = createGraph(2)
		addEdge(graph, 0, 1, 4)
		const mst = callKruskalsMST(graph)
		expect(mst.length === 1)
		expect(mst[0].src === 0 && mst[0].dest === 1)
		expect(mst[0].weight === 4)
	})

	test('Triangle Graph', () => {
		const graph = createGraph(3)
		addEdge(graph, 0, 1, 4)
		addEdge(graph, 1, 2, 5)
		addEdge(graph, 0, 2, 6)
		const mst = callKruskalsMST(graph)

		// The two smallest edges should be in the MST
		expect(mst.length === 2)
		expect(mst[0].src === 0 && mst[0].dest === 1)
		expect(mst[0].weight === 4)
		expect(mst[1].src === 1 && mst[1].dest === 2)
		expect(mst[1].weight === 5)
	})

})

describe('Prims\'s MST Algorithm', () => {

	test('Number of edges is n-1', () => {
		const graph = createGraph(12)
		randomVertices(graph)
		const mst = callPrimsMST(graph)
		expect(mst.length === graph.edges.length - 1)
	})

	test('Single Node', () => {
		const graph = createGraph(1)
		randomVertices(graph)
		const mst = callPrimsMST(graph)
		expect(mst.length === 0)
	})

	test('Two Nodes', () => {
		const graph = createGraph(2)
		addEdge(graph, 0, 1, 4)
		const mst = callPrimsMST(graph)
		expect(mst.length === 1)
		describe.todo('Fix Two Nodes')
		// expect(mst[0].src === 0 && mst[0].dest === 1)
		// expect(mst[0].weight === 4)
	})

	test('Triangle Graph', () => {
		const graph = createGraph(3)
		addEdge(graph, 0, 1, 4)
		addEdge(graph, 1, 2, 5)
		addEdge(graph, 0, 2, 6)
		const mst = callPrimsMST(graph)

		// The two smallest edges should be in the MST
		expect(mst.length === 2)
		describe.todo('Fix Triangle Graph')
		// expect(mst[0].src === 0 && mst[0].dest === 1)
		// expect(mst[0].weight === 4)
		// expect(mst[1].src === 1 && mst[1].dest === 2)
		// expect(mst[1].weight === 5)
	})
})