// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import { compare, getFormatDate_XLSX } from "@/utils/tools";
import { useEffect, useState } from "react";

interface Props {
  data: any;
}

const ProductProportion: React.FC<Props> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "产品占比",
    },
    width: "100%",
    height: 700,
    tooltip: {
      trigger: "item",
    },
    legend: {
      // top: "5%",
      left: "10%",
      orient: "vertical",
      top: "center",
    },
    series: [
      {
        // hoverAnimation: false,
        name: "产品占比",
        type: "pie",
        roseType: "area",
        clockwise: true,
        radius: ["10%", "60%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          formatter: "{b} {d}%\n{c_set|{c}}",
          position: "outside",
          rich: {
            c_set: {
              color: "#808080",
              lineHeight: 20,
            },
          },
        },
        // label: {
        //   // show: false,
        //   // position: "center",
        //   normal: {
        //     show: true,
        //     // position: "outside",
        //     // formatter: '{d}%, {c} \n\n',
        //     //模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等。
        //     formatter: "{a_set|{b} {d}%}\n{c_set|{c}次}\n\n\n",
        //     // borderWidth: 20,
        //     // borderRadius: 4,
        //     // padding: [90, -50],
        //     rich: {
        //       a_set: {
        //         fontSize: 15,
        //         color: "#1a1a1a",
        //         lineHeight: 20,
        //         // align: "center",
        //       },
        //       c_set: {
        //         color: "#808080",
        //       },
        //     },
        //   },
        // },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        labelLine: {
          normal: {
            show: true,
            // smooth: true,
            length: 55, // 第一段线 长度
            length2: 20, // 第二段线 长度
            align: "right",
          },
        },
        // data: [
        //   { value: 1048, name: 'Search Engine' },
        //   { value: 735, name: 'Direct' },
        //   { value: 580, name: 'Email' },
        //   { value: 484, name: 'Union Ads' },
        //   { value: 300, name: 'Video Ads' }
        // ]
      },
    ],
  });

  useEffect(() => {
    if (data && data.length) {
      let optionInfo: EChartsOption = JSON.parse(JSON.stringify(option));
      let product: any = []; // 找出数组中的业务员
      data.map((item: any) => {
        if (!product.includes(item["产品"])) {
          product.push(item["产品"]);
        }
      });
      // 计算数量
      let handleProductCount: any[] = [];
      product.forEach((item: any) => {
        handleProductCount.push({
          name: item,
          value: data.filter((res: any) => res["产品"] === item).length,
        });
      });
      const newInfo = handleProductCount.sort(compare("value"));
      optionInfo.series[0].data = newInfo;
      setOption(optionInfo);
    }
  }, [data]);

  return (
    <div>
      <Chart option={option} id="product-proportion-chart" height={700} />
    </div>
  );
};

export default ProductProportion;
