import { bench, describe, expect } from 'vitest';
import { randomEdges, createGraph, type Graph } from 'mst-graphs';
import { kruskalsMST, mergeSort } from '$lib/kruskals';
import { prims } from '$lib/prims';

let graph: Graph;

describe('Kruskal\'s MST Algorithm', () => {
	bench('n=10', () => {
		const mst = kruskalsMST(graph)
		expect(mst.length).toBe(graph.vertices.length - 1)
	}, {
		setup: () => {
			graph = createGraph(10)
			randomEdges(graph)
		}}
	)

	bench('n=100', () => {
			const mst = kruskalsMST(graph)
			expect(mst.length).toBe(graph.vertices.length - 1)
		}, {
			setup: () => {
				graph = createGraph(100)
				randomEdges(graph)
			}}
	)

	bench('n=1000', () => {
			const mst = kruskalsMST(graph)
			expect(mst.length).toBe(graph.vertices.length - 1)
		}, {
			setup: () => {
				graph = createGraph(1000)
				randomEdges(graph)
			}}
	)

	bench('n=5000', () => {
			const mst = kruskalsMST(graph)
			expect(mst.length).toBe(graph.vertices.length - 1)
		}, {
			iterations: 1000,
			setup: () => {
				graph = createGraph(5000)
				randomEdges(graph)
			}}
	)

	bench('n=10000', () => {
			const mst = kruskalsMST(graph)
			expect(mst.length).toBe(graph.vertices.length - 1)
		}, {
			iterations: 1000,
			setup: () => {
				graph = createGraph(10000)
				randomEdges(graph)
			}}
	)
})

describe('Prims\'s MST Algorithm', () => {
	bench('n=10', () => {
		const mst = prims(graph)
		expect(mst.length).toBe(graph.vertices.length - 1)
	}, {
		setup: () => {
			graph = createGraph(10)
			randomEdges(graph)
		}}
	)

	bench('n=100', () => {
			const mst = prims(graph)
			expect(mst.length).toBe(graph.vertices.length - 1)
		}, {
			setup: () => {
				graph = createGraph(100)
				randomEdges(graph)
			}}
	)

	bench('n=1000', () => {
			const mst = prims(graph)
			expect(mst.length).toBe(graph.vertices.length - 1)
		}, {
			setup: () => {
				graph = createGraph(1000)
				randomEdges(graph)
			}}
	)

	bench('n=5000', () => {
			const mst = prims(graph)
			expect(mst.length).toBe(graph.vertices.length - 1)
		}, {
			setup: () => {
				graph = createGraph(5000)
				randomEdges(graph)
			}}
	)

	bench('n=10000', () => {
			const mst = prims(graph)
			expect(mst.length).toBe(graph.vertices.length - 1)
		}, {
			setup: () => {
				graph = createGraph(10000)
				randomEdges(graph)
			}}
	)
})

describe('Merge Sort', () => {
	bench('n=10', () => {
		mergeSort(graph.edges)
	}, {
		setup: () => {
			graph = createGraph(10)
			randomEdges(graph)
		}
	})

	bench('n=100', () => {
		mergeSort(graph.edges)
	}, {
		setup: () => {
			graph = createGraph(100)
			randomEdges(graph)
		}
	})

	bench('n=1000', () => {
		mergeSort(graph.edges)
	}, {
		setup: () => {
			graph = createGraph(1000)
			randomEdges(graph)
		}
	})

	bench('n=5000', () => {
		mergeSort(graph.edges)
	}, {
		iterations: 1000,
		setup: () => {
			graph = createGraph(5000)
			randomEdges(graph)
		}
	})

	bench('n=10000', () => {
		mergeSort(graph.edges)
	}, {
		iterations: 1000,
		setup: () => {
			graph = createGraph(10000)
			randomEdges(graph)
		}
	})
})

