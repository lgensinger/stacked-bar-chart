# Stacked Bar Chart

ES6 d3.js stacked bar chart visualization.

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
}
```

## Use Module

```bash
import { StackedBarChart } from "@lgv/stacked-bar-chart";

// have some data
let data = {
    "someKey": { "a": 445, "b": 4, "c": 10 },
    "someKey2": { "a": 300, "b": 200, "c": 5 }
};

// initialize
const sbc = new StackedBarChart(data);

// render visualization
sbc.render(document.body);
```

## Environment Variables

The following values can be set via environment or passed into the class.

| Name | Type | Description |
| :-- | :-- | :-- |
| `DIMENSION_HEIGHT` | integer | height of artboard |
| `DIMENSION_WIDTH` | integer | width of artboard |

## Style

Style is expected to be addressed via css. Any style not met by the visualization module is expected to be added by the importing component.

| Class | Element |
| :-- | :-- |
| `lgv-stacked-bar-chart` | top-level svg element |
| `lgv-bar` | bar chart bar |

## Actively Develop

```bash
# clone repository
git clone <repo_url>

# update directory context
cd stacked-bar-chart

# run docker container
docker run \
  --rm \
  -it  \
  -v $(pwd):/project \
  -w /project \
  -p 8080:8080 \
  node \
  bash

# FROM INSIDE RUNNING CONTAINER

# install module
npm install .

# run development server
npm run startdocker

# edit src/index.js
# add const sbc = new StackedBarChart(data);
# add sbc.render(document.body);
# replace `data` with whatever data you want to develop with

# view visualization in browser at http://localhost:8080
```
