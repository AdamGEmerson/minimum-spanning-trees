<script lang="ts">
	import { forceCollide, forceManyBody, forceLink, forceCenter } from 'd3-force';
	import { curveLinear } from 'd3-shape';
	import { scaleOrdinal } from 'd3-scale';
	import { schemeCategory10 } from 'd3-scale-chromatic';

	import { Chart, Circle, ForceSimulation, Link, Svg, Tooltip } from 'layerchart';
	import type { Edge, Graph } from 'mst-graphs';

	export let graph: Graph;
	export let mst: Edge[];
	// Initialize nodes and links based on graph
	$: nodes = Array.from({ length: graph.V }, (_, i) => ({
		id: i,
		group: i % 3,
		x: undefined,
		y: undefined
	}));

	$: links = graph.edges.map(({ src, dest, weight }) => ({
		source: src,
		target: dest,
		value: weight
	}));

	const colorScale = scaleOrdinal(schemeCategory10);

	let isStopped: boolean = false;
	let isStatic: boolean = false;

	let alpha = 1;

	let alphaTarget = 0;
	let running = false;

	let nodeRadius = 6;
	let nodeStrokeWidth = 0;
	let linkWidth = 3;
	let linkOpacity = 0.5;

	let hasLinkForce = true;
	let hasChargeForce = true;
	let hasCollideForce = true;
	let hasCenterForce = true;

	$: {
		graph;
		mst;
		reheatSimulation();
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// const linkForce = forceLink(links).id((d) => d.id);

	$: linkForce = forceLink(links)
		.id((d: any) => d.id)
		.distance(linkDistance);

	const chargeForce = forceManyBody();
	const collideForce = forceCollide();
	const centerForce = forceCenter(0, 0);

	let linkDistance = 30;
	$: {
		reheatSimulation();
		linkForce.distance(linkDistance);
	}

	let chargeDistanceMin = 1;
	let chargeDistanceMax = 1000;
	let chargeStrength = -30;
	$: {
		reheatSimulation();
		chargeForce
			.distanceMin(chargeDistanceMin)
			.distanceMax(chargeDistanceMax)
			.strength(chargeStrength);
	}

	let collideRadius = 3;
	let collideStrength = 1;
	$: {
		reheatSimulation();
		collideForce.radius(collideRadius).strength(collideStrength);
	}

	let centerStrength = 1.0;
	$: {
		reheatSimulation();
		centerForce.strength(centerStrength);
	}

	function handleStart() {
		running = true;
	}

	function handleEnd() {
		running = false;
	}

	function reheatSimulation() {
		alpha = 1.0;
	}


	// Update colors on MST change
	// const linkColors: string[] = [];

	// $: {
	// 	links.map((link, index) => {
	// 		if (mst.some((edge) => edge.src === link.source && edge.dest === link.target)) {
	// 			linkColors[index] = 'stroke-green-500';
	// 		} else {
	// 			linkColors[index] = 'stroke-black';
	// 		}
	// 	});
	// }
	$: linkColors = links.map(link => {
		return mst.some(edge =>
			(edge.src === link.source && edge.dest === link.target) ||
			(edge.src === link.target && edge.dest === link.source)
		) ? 'stroke-green-500' : 'stroke-black';
	});

</script>

<div class="h-[600px] w-[600px] p-4 border rounded overflow-hidden">
	<Chart data={nodes} let:width let:height let:tooltip>
		<Svg>
			<ForceSimulation
				forces={{
					...(hasLinkForce && { link: linkForce }),
					...(hasChargeForce && { charge: chargeForce }),
					...(hasCollideForce && { collide: collideForce }),
					...(hasCenterForce && { center: centerForce.x(width / 2).y(height / 2) }),
				}}
				bind:alpha
				bind:alphaTarget
				bind:stopped={isStopped}
				bind:static={isStatic}
				on:start={handleStart}
				on:end={handleEnd}
				let:nodes
			>
				{#key nodes}
					{#each links as link, index}
						<Link
							data={link}
							class="stroke-surface-content {linkColors[index]}"
							curve={curveLinear}
							stroke-width={linkWidth}
							opacity={linkOpacity}
						/>
					{/each}
				{/key}

				{#each nodes as node}
					<Circle
						cx={node.x}
						cy={node.y}
						r={nodeRadius}
						fill={colorScale(node.group)}
						stroke-width={nodeStrokeWidth}
						class="stroke-surface-content"
						on:pointermove={(e) => tooltip.show(e, node)}
						on:pointerleave={tooltip.hide}
					/>
				{/each}
			</ForceSimulation>
		</Svg>

		<Tooltip.Root let:data>
			{data.id}
		</Tooltip.Root>
	</Chart>
</div>
