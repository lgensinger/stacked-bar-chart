# Stacked Bar Chart

ES6 d3.js stacked bar chart visualization.


## Style

Style is expected to be addressed via css. The top-level svg is assigned a class `lgv-stacked-bar-chart`. Any style not met by the visualization module is expected to be added by the importing component.

## Environment Variables

The following values can be set via environment or passed into the class.

| Name | Type | Description |
| :-- | :-- | :-- |
| `DIMENSION_HEIGHT` | integer | height of artboard |
| `DIMENSION_WIDTH` | integer | width of artboard |

## Install

```bash
# install package
npm install @lgv/stacked-bar-chart
```

## Data Format

The following values are the expected input data structure.

```json
{
    "someKey": { "a": 445, "b": 4, "c": 10 },
    "someKey2": { "a": 300, "b": 200, "c": 5 }
};
```

## Use Module

```bash
import { StackedBarChart } from "@lgv/stacked-bar-chart";

// initialize
const sbc = new StackedBarChart(data);

// render visualization
sbc.render(document.body);
```
