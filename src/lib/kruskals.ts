import type { Edge, Graph, Vertex } from 'mst-graphs';

// Initialize each vertex to be its own parent
const makeSet = (i: number): Vertex => ({
	parent: i, rank: 0
})

// Find the root of the set that the vertex belongs to
const find = (sets: Vertex[], i: number): number => {

	// If the vertex is not the root, recursively find the root and update paths.
	if (sets[i].parent !== i) {
		sets[i].parent = find(sets, sets[i].parent); // Path compression
	}
	return sets[i].parent; // Else, parent is the root
}

// Merge two sets for union find
const union = (sets: Vertex[], u: number, v: number) => {
	const uRoot = find(sets, u);
	const vRoot = find(sets, v);

	if (uRoot === vRoot) {
		return; // This is already in the same set
	}

	// Confirm that the roots are valid
	if (sets[uRoot].rank === undefined || sets[vRoot].rank === undefined) {
		return;
	}

	// Merge the two sets, larger tree becomes the parent
	if (sets[uRoot].rank < sets[vRoot].rank) {
		sets[uRoot].parent = vRoot;
	} else if (sets[uRoot].rank > sets[vRoot].rank) {
		sets[vRoot].parent = uRoot;
	} else {
		// If the ranks are equal, then merge the two sets and increment the rank
		sets[vRoot].parent = uRoot;
		sets[uRoot].rank++;
	}
}

// Merge sort
export function mergeSort(arr: Edge[]): Edge[] {
	if (arr.length <= 1) {
		return arr;
	}
	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));
	return merge(left, right);
}

function merge(left: Edge[], right: Edge[]): Edge[] {
	const result = [];
	let i = 0;
	let j = 0;
	while (i < left.length && j < right.length) {
		if (left[i].weight < right[j].weight) {
			result.push(left[i]);
			i++;
		} else {
			result.push(right[j]);
			j++;
		}
	}
	return result.concat(left.slice(i)).concat(right.slice(j));
}

// Kruskal's algorithm
export function kruskalsMST(g: Graph): Edge[] {
	const mst: Edge[] = [];
	const sets: Vertex[] = [];

	// Initialize the sets for union find (to check for cycles)
	for (let i = 0; i < g.V!; i++) {
		sets.push(makeSet(i));
	}

	if (g.edges.length === 0) return [];

	// Sort edges in increasing order, by weight. (Merge sort)
	g.edges = mergeSort(g.edges);

	// Check for cycles
	for (let i = 0; i < g.edges.length; i++) {
		if (find(sets, g.edges[i].src) !== find(sets, g.edges[i].dest)) {
			// No cycle found, add to the MST and merge the sets
			mst.push(g.edges[i]);
			union(sets, g.edges[i].src, g.edges[i].dest);
		}
	}
	return mst;
}

