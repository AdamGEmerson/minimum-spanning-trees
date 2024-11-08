import type { Graph, Vertex } from 'mst-graphs';

function prims(graph: Graph, start: Vertex): Vertex[] {
	const set: Vertex[] = [];
	const queue: Vertex[] = [];

	graph.vertices!.forEach((vertex) => {
		vertex.key = Infinity;
		vertex.parent = -1;
	})

	start.key = 0;
	queue.push(start);

	while (queue.length) {
		const u = queue.shift();
		if (!u) break;

		set.push(u);
		graph.vertices!.forEach((v) => {
			if (v !== u) {
				const weight = Infinity;
				if (weight < v.key! && u.key) {
					v.parent! = u.key;
					v.key = weight;
					queue.push(v);
				}
			}
		})
	}

	return set;
}

export function callPrimsMST(graph: Graph): Vertex[] {
	return prims(graph, graph.vertices![0]);
}