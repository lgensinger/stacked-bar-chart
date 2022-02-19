import test from "ava";

import { configuration, configurationDimension } from "../src/configuration.js";
import { StackedBarChart } from "../src/index.js";

/******************** EMPTY VARIABLES ********************/

// initialize
let sbc = new StackedBarChart();

// TEST INIT //
test("init", t => {

    t.true(sbc.height === configurationDimension.height);
    t.true(sbc.width === configurationDimension.width);

});

// TEST get DATA //
test("get_data", t => {

    t.true(typeof(sbc.data) == "object");

});

// TEST get LAYOUT //
test("get_layout", t => {

    t.true(typeof(sbc.layout) == "function");

});

// TEST get SERIESSCALE //
test("get_seriesScale", t => {

    t.true(typeof(sbc.seriesScale) == "function");

});

// TEST get SERIESSETSCALE //
test("get_seriesSetsScale", t => {

    t.true(typeof(sbc.seriesScale) == "function");

});

// TEST RENDER //
test("render", t => {

    // clear document
    document.body.innerHTML = "";

    // render to dom
    sbc.render(document.body);

    // get generated element
    let artboard = document.querySelector(`.${configuration.name}`);

    t.true(artboard !== undefined);
    t.true(artboard.nodeName == "svg");
    t.true(artboard.getAttribute("viewBox").split(" ")[3] == configurationDimension.height);
    t.true(artboard.getAttribute("viewBox").split(" ")[2] == configurationDimension.width);

});

/******************** DECLARED PARAMS ********************/

let testWidth = 300;
let testHeight = 500;
let testData = {
    someKey: { "a": 445, "b": 4, "c": 10 },
    someKey2: { "a": 300, "b": 200, "c": 5 }
};

// initialize
let sbcp = new StackedBarChart(testData, testWidth, testHeight);

// TEST INIT //
test("init_params", t => {

    t.true(sbcp.height === testHeight);
    t.true(sbcp.width === testWidth);

});

// TEST get DATA //
test("get_data_params", t => {

    t.true(typeof(sbcp.data) == "object");

});

// TEST get LAYOUT //
test("get_layout_params", t => {

    t.true(typeof(sbcp.layout) == "function");

});

// TEST get SERIESSCALE //
test("get_seriesScale_params", t => {

    t.true(typeof(sbc.seriesScale) == "function");

});

// TEST get SERIESSETSCALE //
test("get_seriesSetsScale_params", t => {

    t.true(typeof(sbc.seriesScale) == "function");

});

// TEST RENDER //
test("render_params", t => {

    // clear document
    document.body.innerHTML = "";

    // render to dom
    sbcp.render(document.body);

    // get generated element
    let artboard = document.querySelector(`.${configuration.name}`);

    t.true(artboard !== undefined);
    t.true(artboard.nodeName == "svg");
    t.true(artboard.getAttribute("viewBox").split(" ")[3] == testHeight);
    t.true(artboard.getAttribute("viewBox").split(" ")[2] == testWidth);

});
