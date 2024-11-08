# MST Algorithms Visualizer

## Description

This is a web application that visualizes various Minimum Spanning Tree algorithms and their runtimes. The algorithms that are currently implemented are:
- Kruskal's
- Prim's

The application is built using SvelteKit and D3.js.

## Installation and Usage

The application has been tested on Node.js v22.11.0.  Other versions of node may work but have not been tested.

You can run the application locally by cloning this repo. Alternatively you can open it in GitHub Codespaces.

To install the dependencies, run: `npm install`

To start the development server, run:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Graph Generation

In order to run the algorithms, you need to generate a graph. 

Graph type definitions and the functions for generating graphs can be found in `types/mst-graphs.ts`.

Relevant functions for generating graphs are:

```typescript
  function createGraph(numVertices: number): Graph;
  function addEdge(graph: Graph, src: number, dest: number, weight: number): void;
  function randomEdges(graph: Graph): void;
```

## Algorithms

Each algorithm is implemented in its own file in the `src/lib` directory. Kruskal's can be found in `src/lib/kruskals.ts` and Prim's can be found in `src/lib/prims.ts`.

## Testing

The application has been tested with Vite. To run the tests, run `npm run test`.

The test suite is located in the `tests/graphGeneration.test.ts` directory.
Test cases include coverage for the graph generation functions and the algorithms.

## Benchmarks

Benchmarks have also been implemented using Vitest. To run the benchmarks, run `npm run bench`.

Benchmarks can be seen in `test/mstAlgorithms.bench.ts`.

Benchmarking is done for the following:
- Kruskal's
- Prim's
- Merge Sort (to sort the edges for Kruskal's)

With sample sizes of 10, 100, 1000, 5000, 10000, and 100000.

## UI
The UI is built using SvelteKit, D3.js, and Flowbite. The main components are in the `src/components` and `src/routes` directories.