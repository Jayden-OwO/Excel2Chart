// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import { getFormatDate_XLSX } from "@/utils/tools";
import { useEffect, useState } from "react";
import HeatMapChart from "./HeatMapChart";

interface Props {
  data: any;
}

const CountryProduct: React.FC<Props> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "各个国家产品趋势",
    },
    width: "95%",
    tooltip: {
      trigger: "axis",
    },
    // legend: {
    //   data: ["邮件数", "累计邮件数"],
    // },
    grid: {
      height: "70%",
      top: "10%",
      // bottom:""
    },

    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: "vertical",
      left: "1%",
      bottom: "10%",
    },
    dataZoom: [
      {
        type: "inside",
        start: 30,
        end: 100,
      },
      {
        // type: "inside",
        start: 30,
        end: 100,
      },
    ],
  });

  useEffect(() => {
    if (data && data.length) {
      let optionInfo: EChartsOption = JSON.parse(JSON.stringify(option));
      let country: any = []; // 找出数组中的国家
      let product: any = []; // 找出数组中的产品
      data.map((item: any) => {
        if (!country.includes(item["国家"])) {
          country.push(item["国家"]);
        }
        if (!product.includes(item["产品"])) {
          product.push(item["产品"]);
        }
      });
      let allData: any = [];
      country.forEach((item: any, index: number) => {
        // let [index,]
        product.forEach((res: any, resIndex: number) => {
          let list = [
            index,
            resIndex,
            data.filter(
              (dataRes: any) =>
                dataRes["国家"] === item && dataRes["产品"] === res
            ).length || "-",
          ];
          // data.filter()
          allData.push(list);
        });
      });
      // allData.map((item: any) => [item[1], item[0], item[2] || "-"]);
      console.log("====", allData);
      optionInfo.xAxis = {
        type: "category",
        data: country,
        splitArea: {
          show: true,
        },
        axisLabel: {
          interval: 0,
          rotate: 50,
        },
      };
      optionInfo.yAxis = {
        type: "category",
        data: product,
        splitArea: {
          show: true,
        },
      };
      optionInfo.series = [
        {
          // name: "1",
          type: "heatmap",
          data: allData,
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ];
      // optionInfo.xAxis = {
      //   ...optionInfo.xAxis,
      //   data: date,
      // };
      // optionInfo.series = [
      //   {
      //     name: "邮件数",
      //     type: "line",
      //     data: emailCount,
      //     stack: "Total",
      //     itemStyle: {
      //       normal: {
      //         label: {
      //           show: true, //开启显示
      //           position: "top", //在上方显示
      //           textStyle: {
      //             //数值样式
      //             color: "black",
      //             fontSize: 12,
      //           },
      //         },
      //       },
      //     },
      //   },
      //   {
      //     name: "累计邮件数",
      //     type: "line",
      //     data: allEmailCount,
      //     stack: "Total",
      //     itemStyle: {
      //       normal: {
      //         label: {
      //           show: true, //开启显示
      //           position: "top", //在上方显示
      //           textStyle: {
      //             //数值样式
      //             color: "black",
      //             fontSize: 12,
      //           },
      //         },
      //       },
      //     },
      //   },
      // ];
      setOption(optionInfo);
    }
  }, [data]);

  return (
    <div>
      <Chart option={option} id="country-product-chart" />
    </div>
  );
};

export default CountryProduct;
