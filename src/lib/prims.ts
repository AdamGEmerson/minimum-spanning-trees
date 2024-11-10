import type { Graph, Vertex, Edge } from 'mst-graphs';

// Convert edge list to adjacency list for more efficient neighbor lookup
function createAdjacencyList(graph: Graph): Map<number, Edge[]> {
	const adjList = new Map<number, Edge[]>();

	// Initialize empty arrays for each vertex
	for (let i = 0; i < graph.V; i++) {
		adjList.set(i, []);
	}

	// Add edges to adjacency lists (undirected graph)
	for (const edge of graph.edges) {
		adjList.get(edge.src)!.push(edge);
		// Add reverse edge since the graph is undirected
		adjList.get(edge.dest)!.push({
			src: edge.dest,
			dest: edge.src,
			weight: edge.weight
		});
	}

	return adjList;
}

function prims(graph: Graph): Graph {
	const vertices: Vertex[] = new Array(graph.V).fill(null).map(() => ({
		parent: -1,
		key: Infinity,
		inMST: false
	}));

	const mstEdges: Edge[] = [];
	const adjList = createAdjacencyList(graph);

	// Start with vertex 0
	vertices[0].key = 0;
	let remainingVertices = graph.V;

	while (remainingVertices > 0) {
		// Find vertex with minimum key value
		let minKey = Infinity;
		let minIndex = -1;

		for (let v = 0; v < graph.V; v++) {
			if (!vertices[v].inMST && vertices[v].key! < minKey) {
				minKey = vertices[v].key!;
				minIndex = v;
			}
		}

		if (minIndex === -1) break;  // No more connected vertices

		// Add the picked vertex to the MST
		vertices[minIndex].inMST = true;
		remainingVertices--;

		// If this isn't the starting vertex, add the edge to MST
		if (vertices[minIndex].parent !== -1) {
			mstEdges.push({
				src: vertices[minIndex].parent!,
				dest: minIndex,
				weight: vertices[minIndex].key!
			});
		}

		// Update key values of adjacent vertices
		const adjacentEdges = adjList.get(minIndex)!;
		for (const edge of adjacentEdges) {
			const neighbor = edge.dest;
			if (!vertices[neighbor].inMST && edge.weight < vertices[neighbor].key!) {
				vertices[neighbor].parent = minIndex;
				vertices[neighbor].key = edge.weight;
			}
		}
	}

	return {
		vertices: vertices,
		edges: mstEdges,
		V: graph.V
	};
}

export function callPrimsMST(graph: Graph): Edge[] {
	let g = prims(graph);
	return g.edges;
}