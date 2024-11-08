declare module 'mst-graphs' {
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

	export function createGraph(numVertices: number): Graph;
	export function addEdge(graph: Graph, src: number, dest: number, weight: number): void;
	export function connectVertices(graph: Graph): void;
}