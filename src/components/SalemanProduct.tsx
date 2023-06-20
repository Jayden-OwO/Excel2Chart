// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import { getFormatDate_XLSX } from "@/utils/tools";
import { useEffect, useState } from "react";

interface Props {
  data: any;
}

const SaleManProduct: React.FC<Props> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "业务员产品趋势",
    },
    width: "95%",
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
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
    // xAxis: {
    //   type: "category",
    //   splitLine: {
    //     show: true,
    //   },
    //   data: [],
    // },
    // yAxis: {
    //   type: "value",
    //   splitLine: {
    //     show: true,
    //   },
    // },
    legend: {},
    tooltip: {},
    // dataset: {
    //   dimensions: ['product', '2015', '2016', '2017'],
    //   source: [
    //     { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
    //     { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
    //     { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
    //     { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
    //   ]
    // },
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        type: "bar",
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: "inside",
              textStyle: {
                //数值样式
                color: "white",
                fontSize: 14,
              },
            },
          },
        },
      },

      { type: "bar" },
      { type: "bar" },
      { type: "bar" },
      { type: "bar" },
      { type: "bar" },
      { type: "bar" },
    ],
  });

  useEffect(() => {
    if (data && data.length) {
      let optionInfo: EChartsOption = JSON.parse(JSON.stringify(option));
      let saleMan: any = []; // 找出数组中的业务员
      let product: any = []; // 找出数组中的产品
      data.map((item: any) => {
        if (!saleMan.includes(item["负责人"])) {
          saleMan.push(item["负责人"]);
        }
        if (!product.includes(item["产品"])) {
          product.push(item["产品"]);
        }
      });
      product.push("总数");
      let allData: any = [];
      saleMan.forEach((item: any, index: number) => {
        let list: any = {
          saleMan: item,
        };
        product.forEach((res: any, resIndex: number) => {
          if (res === "总数") {
            list["总数"] = data.filter(
              (dataRes: any) => dataRes["负责人"] === item
            ).length;
          } else {
            list[res] = data.filter(
              (dataRes: any) =>
                dataRes["负责人"] === item && dataRes["产品"] === res
            ).length;
          }
        });
        allData.push(list);
      });

      let series: any = [];
      for (let i = 0; i < product.length; i += 1) {
        series.push({
          type: "bar",
          barMinHeight: 1,
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: "inside",
                textStyle: {
                  //数值样式
                  color: "rgb(0, 0, 0,0.7)",
                  fontSize: 14,
                },
              },
            },
          },
        });
      }
      optionInfo.series = series;
      product.unshift("saleMan");
      console.log("product", product);
      console.log("allData", allData);
      optionInfo.dataset = {
        dimensions: product,
        source: allData,
      };
      setOption(optionInfo);
    }
  }, [data]);

  return (
    <div>
      <Chart option={option} id="saleMan-product-chart" />
    </div>
  );
};

export default SaleManProduct;
