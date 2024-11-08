export type Edge = {
	src: number;
	dest: number;
	weight: number;
};

export type Vertex = {
	parent: number;
	rank?: number;
	key?: number;
	inMST?: boolean;
};

export type Graph = {
	vertices: Vertex[];
	edges: Edge[];
	V: number;
};

export function createGraph(numVertices: number): Graph {
	const vertices = Array(numVertices)
		.fill(null)
		.map(() => ({
			parent: -1,
			rank: 0,
			key: Infinity,
			inMST: false
		}));

	return {
		vertices,
		edges: [],
		V: numVertices
	};
}

export function addEdge(graph: Graph, src: number, dest: number, weight: number): void {
	graph.edges.push({ src, dest, weight });
}


// Fully connect a graph and then add a random number of edges
export function randomEdges(graph: Graph): void {

	if (graph.V <= 1) return;

	const existingEdges = new Set(graph.edges.map(edge => `${edge.src}-${edge.dest}`));

	// Connect all vertices
	for (let i = 0; i < graph.V - 1; i++) {
		const src = i;
		const dest = i + 1;
		const weight = Math.floor(Math.random() * 20) + 1; // Random weight between 1 and 20
		graph.edges.push({ src, dest, weight });
		existingEdges.add(`${src}-${dest}`);
	}

	// Add  edge from last vertex to first vertex
	const src = graph.V - 1;
	const dest = 0;
	const weight = Math.floor(Math.random() * 20) + 1; // Random weight between 1 and 20
	graph.edges.push({ src, dest, weight });
	existingEdges.add(`${src}-${dest}`);

	const numAdditionalEdges = Math.floor(Math.random() * (graph.V - 1)) + 1; // Random number of additional edges
	for (let i = 0; i < numAdditionalEdges; i++) {
		let src = Math.floor(Math.random() * graph.V);
		let dest = Math.floor(Math.random() * graph.V);
		while (src === dest || existingEdges.has(`${Math.min(src, dest)}-${Math.max(src, dest)}`)) {
			src = Math.floor(Math.random() * graph.V);
			dest = Math.floor(Math.random() * graph.V);
		}
		const weight = Math.floor(Math.random() * 20) + 1; // Random weight between 1 and 20
		graph.edges.push({ src, dest, weight });
		existingEdges.add(`${Math.min(src, dest)}-${Math.max(src, dest)}`);
	}
}