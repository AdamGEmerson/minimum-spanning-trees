import { bench, describe, expect } from 'vitest';
import { randomVertices, createGraph, type Graph } from 'mst-graphs';
import { callKruskalsMST, mergeSort } from '$lib/kruskals';
import { callPrimsMST } from '$lib/prims';

let graph: Graph;

describe('Kruskal\'s MST Algorithm', () => {
	bench('n=10', () => {
		const mst = callKruskalsMST(graph)
		expect(mst.length === graph.edges.length - 1)
	}, {
		setup: () => {
			graph = createGraph(10)
			randomVertices(graph)
		}}
	)

	bench('n=100', () => {
			const mst = callKruskalsMST(graph)
			expect(mst.length === graph.edges.length - 1)
		}, {
			setup: () => {
				graph = createGraph(100)
				randomVertices(graph)
			}}
	)

	bench('n=1000', () => {
			const mst = callKruskalsMST(graph)
			expect(mst.length === graph.edges.length - 1)
		}, {
			setup: () => {
				graph = createGraph(1000)
				randomVertices(graph)
			}}
	)

	bench('n=5000', () => {
			const mst = callKruskalsMST(graph)
			expect(mst.length === graph.edges.length - 1)
		}, {
			iterations: 1000,
			setup: () => {
				graph = createGraph(5000)
				randomVertices(graph)
			}}
	)

	bench('n=10000', () => {
			const mst = callKruskalsMST(graph)
			expect(mst.length === graph.edges.length - 1)
		}, {
			iterations: 1000,
			setup: () => {
				graph = createGraph(10000)
				randomVertices(graph)
			}}
	)
})

describe('Prims\'s MST Algorithm', () => {
	bench('n=10', () => {
		const mst = callPrimsMST(graph)
		expect(mst.length === graph.edges.length - 1)
	}, {
		setup: () => {
			graph = createGraph(10)
			randomVertices(graph)
		}}
	)

	bench('n=100', () => {
			const mst = callPrimsMST(graph)
			expect(mst.length === graph.edges.length - 1)
		}, {
			setup: () => {
				graph = createGraph(100)
				randomVertices(graph)
			}}
	)

	bench('n=1000', () => {
			const mst = callPrimsMST(graph)
			expect(mst.length === graph.edges.length - 1)
		}, {
			setup: () => {
				graph = createGraph(1000)
				randomVertices(graph)
			}}
	)

	bench('n=5000', () => {
			const mst = callPrimsMST(graph)
			expect(mst.length === graph.edges.length - 1)
		}, {
			iterations: 1000,
			setup: () => {
				graph = createGraph(5000)
				randomVertices(graph)
			}}
	)

	bench('n=10000', () => {
			const mst = callPrimsMST(graph)
			expect(mst.length === graph.edges.length - 1)
		}, {
			iterations: 1000,
			setup: () => {
				graph = createGraph(10000)
				randomVertices(graph)
			}}
	)
})

describe('Merge Sort', () => {
	bench('n=10', () => {
		mergeSort(graph.edges)
	}, {
		setup: () => {
			graph = createGraph(10)
			randomVertices(graph)
		}
	})

	bench('n=100', () => {
		mergeSort(graph.edges)
	}, {
		setup: () => {
			graph = createGraph(100)
			randomVertices(graph)
		}
	})

	bench('n=1000', () => {
		mergeSort(graph.edges)
	}, {
		setup: () => {
			graph = createGraph(1000)
			randomVertices(graph)
		}
	})

	bench('n=5000', () => {
		mergeSort(graph.edges)
	}, {
		iterations: 1000,
		setup: () => {
			graph = createGraph(5000)
			randomVertices(graph)
		}
	})

	bench('n=10000', () => {
		mergeSort(graph.edges)
	}, {
		iterations: 1000,
		setup: () => {
			graph = createGraph(10000)
			randomVertices(graph)
		}
	})
})

