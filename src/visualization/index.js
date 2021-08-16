import { max, sum } from "d3-array";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { stack } from "d3-shape";

import { configuration, configurationDimension } from "../configuration.js";

/**
 * StackedBarChart is a hybrid visualization of a series of stacked bar charts with curved connection paths between related stacked values.
 * @param {array} data - objects where each represents a path in the hierarchy
 * @param {integer} height - artboard height
 * @param {integer} width - artboard width
 */
class StackedBarChart {
    constructor(data, width=configurationDimension.width, height=configurationDimension.height, includeValueInLabel=true) {

        // update self
        this.artboard = null;
        this.barWidth = null;
        this.dataSource = data;
        this.height = height;
        this.name = configuration.name;
        this.width = width;

        // using font size as the base unit of measure make responsiveness easier to manage across devices
        this.artboardUnit = typeof window === "undefined" ? 16 : parseFloat(getComputedStyle(document.body).fontSize);

    }

    /**
     * Condition data for visualization requirements.
     * @returns An object where keys are series' set label and corresponding values are a object where keys are series' labels and values are each series value.
     */
    get data() {
        return this.dataSource ? this.dataSource : {};
    }

    /**
     * Construct layout.
     * @returns A d3 stack layout function.
     */
    get layout() {

        // get series' labels
        let seriesLabels = [...new Set(Object.keys(this.data).map(k => Object.keys(this.data[k])).flat())];

        return stack()
            .keys(seriesLabels);
    }

    /**
     * Construct a scale to separate series' values.
     * @returns A d3 scale function.
     */
    get seriesScale() {

        // grab all series' values and flatten into 1D array
        let seriesMax = Object.keys(this.data).map(k => Object.keys(this.data[k]).map(key => this.data[k][key])).map(d => sum(d));

        return scaleLinear()
            .domain([0, max(seriesMax)])
            .range([0, this.width]);
    }

    /**
     * Construct scale to separate series' sets.
     * @returns A d3 scale function.
     */
    get seriesSetsScale() {
        return scaleBand()
            .domain(Object.keys(this.data))
            .rangeRound([0, this.height])
            .paddingInner(0.25);
    }

    /**
     * Position and minimally style bars in SVG dom element.
     */
    configureBars() {
        this.series
            .selectAll("rect")
            .data(d => this.layout([this.data[d]]))
            .enter()
            .append("rect")
            .attr("class", d => `lgv-bar ${d.key}`)
            .attr("x", d => this.seriesScale(d[0][0]))
            .attr("y", d => 0)
            .attr("width", d => this.seriesScale(d[0][1] - d[0][0]))
            .attr("height", this.seriesSetsScale.bandwidth());
    }

    /**
     * Generate SVG artboard in the HTML DOM.
     * @param {node} domNode - HTML node
     * @returns A d3.js selection.
     */
    generateArtboard(domNode) {
        return select(domNode)
            .append("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("class", this.name);
    }

    /**
     * Construct bar group in HTML DOM.
     * @param {node} domNode - HTML node
     * @returns A d3.js selection.
     */
    generateBars(domNode) {
        return domNode.selectAll("g")
            .data(Object.keys(this.data))
            .join("g")
            .attr("transform", d => `translate(0,${this.seriesSetsScale(d)})`);
    }

    /**
     * Render visualization.
     * @param {node} domNode - HTML node
     */
    render(domNode) {

        // generate svg artboard
        this.artboard = this.generateArtboard(domNode);

        // generate group for each series
        this.series = this.generateBars(this.artboard);

        // position/style nodes
        this.configureBars();

    }

};

export { StackedBarChart };
export default StackedBarChart;
