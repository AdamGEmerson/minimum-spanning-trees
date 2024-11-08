<script>
	import { Chart } from 'flowbite-svelte';

	let options = {
		chart: {
			height: '100%',
			maxWidth: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#1C64F2',
				gradientToColors: ['#1C64F2']
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 6
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0
			}
		},
		series: [
			{
				name: 'Kruskal\'s',
				data: [0.0074, 0.0275, 0.4550, 2.3648, 5.4402],
				color: '#1A56DB'
			},
			{
				name: 'Prims\'s',
				data: [0.0030, 0.0031, 0.0047, 0.0148, 0.0267],
				color: '#F87171'
			}
		],
		xaxis: {
			categories: ['N=10', 'N=100', 'N=1,000', 'N=5,000', 'N=10,000', 'N=100,000'],
			labels: {
				show: true
			},
			axisBorder: {
				show: true
			},
			axisTicks: {
				show: true
			}
		},
		yaxis: {
			show: true,
		}
	};
</script>

<Chart {options} />
<!--<Card>-->
<!--	-->
<!--	<div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">-->
<!--		<div class="flex justify-between items-center pt-5">-->
<!--			<Button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">Last 7 days<ChevronDownOutline class="w-2.5 m-2.5 ms-1.5" /></Button>-->
<!--			<Dropdown class="w-40" offset="-6">-->
<!--				<DropdownItem>Yesterday</DropdownItem>-->
<!--				<DropdownItem>Today</DropdownItem>-->
<!--				<DropdownItem>Last 7 days</DropdownItem>-->
<!--				<DropdownItem>Last 30 days</DropdownItem>-->
<!--				<DropdownItem>Last 90 days</DropdownItem>-->
<!--			</Dropdown>-->
<!--			<A href="/" class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline">-->
<!--				Users Report-->
<!--				<ChevronRightOutline class="w-2.5 h-2.5 ms-1.5" />-->
<!--			</A>-->
<!--		</div>-->
<!--	</div>-->
<!--</Card>-->