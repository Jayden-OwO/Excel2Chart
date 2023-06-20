import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DataZoomComponent,
  VisualMapComponent,
  VisualMapComponentOption,
} from "echarts/components";
import {
  LineChart,
  LineSeriesOption,
  HeatmapChart,
  HeatmapSeriesOption,
} from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useImperativeHandle } from "react";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  VisualMapComponent,
  HeatmapChart,
]);

export type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | HeatmapSeriesOption
  | VisualMapComponentOption
>;

interface Props {
  option: EChartsOption;
  actionRef?: any;
  id: string;
}

const Chart: React.FC<Props> = ({ option, actionRef, id }) => {
  useEffect(() => {
    const chartDom = document.getElementById(id);
    const myChart = echarts.init(chartDom);
    if (option && chartDom) {
      myChart.setOption(option);
    }
  }, [option, id]);

  useImperativeHandle(actionRef, () => ({
    getInstance: () => {
      return echarts;
    },
  }));

  return <div id={id} key={id} style={{ width: "100%", height: 500 }}></div>;
};

export default Chart;
